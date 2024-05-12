import React, { useState, ChangeEvent, FormEvent } from "react";
import { db, storage } from "../../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import { Column, Container, Form, VisuallyHiddenInput } from "./styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

interface Product {
  name: string;
  price: number;
  description: string;
  image: File | null;
  imageURL: string;
  type: string;
  stock: boolean;
}

export const CreateProduct: React.FC = () => {
  const [data, setData] = useState<Product>({
    name: "",
    price: 0,
    description: "",
    image: null,
    imageURL: "",
    type: "",
    stock: false,
  });
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };
  

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData({
        ...data,
        image: e.target.files[0],
      });
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setData((prevProduct) => ({
      ...(prevProduct as Product),
      [name]: value,
    }));
  };
  if (!data) return <div>Cargando...</div>;

  const handleStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      stock: e.target.checked,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!data.image) {
        throw new Error("Debe seleccionar una imagen");
      }

      // Subir imagen al Firebase Storage
      const storageRef = ref(storage, `images/${data.image.name}`);
      await uploadBytes(storageRef, data.image);

      // Obtener la URL de descarga de la imagen
      const imageURL = await getDownloadURL(storageRef);

      // Guardar los datos en Firestore
      const docRef = await addDoc(collection(db, "products"), {
        name: data.name,
        price: data.price,
        description: data.description,
        imageURL, // La URL de descarga de la imagen
        createdAt: serverTimestamp(),
      });

      console.log("Producto creado exitosamente:", docRef.id);
      setData({
        name: "",
        price: 0,
        description: "",
        image: null,
        imageURL: "",
        type: "",
        stock: false,
      });
      navigate("/Products");
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <Container>
      <h1>Formulario</h1>
      <div style={{ backgroundColor: "white" }}>
        <Form onSubmit={handleSubmit}>
          <Column>
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <TextField
                id="name"
                label="Nombre"
                variant="outlined"
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "20px" }}
                required
              />

              <TextField
                id="outlined-basic"
                label="Precio"
                variant="outlined"
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  marginRight: "10px",
                }}
              />

              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="type"
                value={data.type}
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
                type="text"
                name="description"
                value={data.description}
                onChange={handleChange}
                required
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
                  required
                  name="image"
                />
                Subir Imagen
                <VisuallyHiddenInput />
              </Button>
              <div style={{ display: "flex" }}>
                {data.imageURL && (
                  <div style={{ width: "50%" }}>
                    <h3>Imagen</h3>
                    <img
                      src={data.imageURL}
                      alt="Producto"
                      style={{ width: "50%" }}
                    />
                  </div>
                )}
                {data.image && (
                  <div style={{ width: "50%" }}>
                    <h3>Nueva Imagen</h3>
                    <img
                      src={URL.createObjectURL(data.image)}
                      alt="nuevo producto"
                      style={{ width: "50%" }}
                    />
                  </div>
                )}
              </div>
              <Switch
                {...{ inputProps: { "aria-label": "Switch demo" } }}
                checked={data.stock}
                onChange={handleStockChange}
              />
              Disponible
            </div>
          </Column>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Crear Producto
          </Button>
        </Form>
      </div>
    </Container>
  );
};
