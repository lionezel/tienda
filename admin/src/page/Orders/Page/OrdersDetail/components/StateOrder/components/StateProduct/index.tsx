import notes from "../../assets/notas-adhesivas.png";

export const StateProduct = [
    {
      state: "pendiente",
      image: { notes },
      nameButton: "Aceptar pedido",
    },
    {
      state: "preparando",
      image: { notes },
      nameButton: "Producto Listo",
    },
    {
      state: "listo",
      image: { notes },
      nameButton: "Completado",
    },
  ];