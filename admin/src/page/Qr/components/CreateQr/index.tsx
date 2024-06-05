import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, FormEvent, useState } from "react";
import { db, storage } from "../../../../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Container, Form, VisuallyHiddenInput } from "./styled";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface Image {
  image: File | null;
  imageURL: "";
}

export const CreateQr = () => {
  const [data, setData] = useState<Image>({
    image: null,
    imageURL: "",
  });

  const navigate = useNavigate();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData({
        ...data,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!data.image) {
        throw new Error("Debe seleccionar una imagen");
      }

      // Subir imagen al Firebase Storage
      const storageRef = ref(storage, `qr/${data.image.name}`);
      await uploadBytes(storageRef, data.image);

      // Obtener la URL de descarga de la imagen
      const imageURL = await getDownloadURL(storageRef);

      // Guardar los datos en Firestore
      const docRef = await addDoc(collection(db, "Transferencias"), {
        imageURL, // La URL de descarga de la imagen
        createdAt: serverTimestamp(),
      });

      console.log("Producto creado exitosamente:", docRef.id);
      setData({
        image: null,
        imageURL: "",
      });
      navigate("/Qr");
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <Container>
      <h1>Formulario</h1>
      <div style={{ backgroundColor: "white" }}>
        <Form onSubmit={handleSubmit}>
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
          </div>

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
