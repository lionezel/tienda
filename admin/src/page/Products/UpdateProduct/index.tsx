import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import styled from "styled-components";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type Product = {
  name: string;
  price: number;
  type: string;
  stock: boolean;
  imageURL: string;
  description: string;
  createdAt: string;
};

export const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct(productSnap.data() as Product);
        } else {
          console.log("No existe ese documento!");
        }
      } catch (error) {
        console.error("Error obteniendo el documento: ", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id || !product) return;

      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        setProduct((prevProduct) => ({
          ...(prevProduct as Product),
          imageURL: downloadURL,
        }));
      }

      const productRef = doc(db, "products", id);
      await updateDoc(productRef, product);
      console.log("¡Documento actualizado exitosamente!");
      navigate("/Products");
    } catch (error) {
      console.error("Error actualizando el documento: ", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean | number = value;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      newValue = parseFloat(value);
    }

    setProduct((prevProduct: Product | null) => ({
      ...(prevProduct as Product),
      [name]: newValue,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...(prevProduct as Product),
      [name]: value,
    }));
  };
  if (!product) return <div>Cargando...</div>;

  return (
    <Container>
      <h2>Actualizar Producto</h2>
      <form onSubmit={handleUpdate}>
        <Column>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              id="outlined-basic"
              label="Precio"
              variant="outlined"
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              style={{
                width: "40%",
                marginBottom: "20px",
                marginRight: "10px",
              }}
            />
            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="type"
              value={product.type}
              label="type"
              onChange={handleSelectChange}
              style={{ width: "100%", marginBottom: "20px" }}
            >
              <MenuItem value="Hamburguesa">Hamburguesa</MenuItem>
              <MenuItem value="Salchipapas">Salchipapas</MenuItem>
              <MenuItem value="Bebidas">Bebidas</MenuItem>
            </Select>
            <TextField
              id="outlined-multiline-static"
              label="Descripción"
              multiline
              rows={4}
              defaultValue="Valor por defecto"
              name="description"
              value={product.description}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                name="imageURL"
              />
              Subir Imagen
              <VisuallyHiddenInput />
            </Button>
            <div style={{ display: "flex" }}>
              {product.imageURL && (
                <div style={{ width: "50%" }}>
                  <h3>Imagen</h3>
                  <img
                    src={product.imageURL}
                    alt="Producto"
                    style={{ width: "50%" }}
                  />
                </div>
              )}
              {image && (
                <div style={{ width: "50%" }}>
                  <h3>Nueva Imagen</h3>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="nuevo producto"
                    style={{ width: "50%" }}
                  />
                </div>
              )}
            </div>
            <Switch
              {...{ inputProps: { "aria-label": "Switch demo" } }}
              checked={product.stock}
              onChange={handleChange}
            />
            Disponible
          </div>
        </Column>
        <button type="submit">Actualizar</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  margin-left: 15%;
  width: 85%;
  height: 100vh;
  padding-left: 200px;
  padding-right: 200px;
  overflow-y: auto;
   margin-top: 100px;
`;

const Column = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
