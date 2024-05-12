import bebidas from "./assets/Category/bebidas-sin-alcohol.png";
import hamburger from "./assets/Category/hamburguesa.png";
import potato from "./assets/Category/papas-fritas.png";

const category = [
  {
    image: potato,
    name: "Salchipapas",
    color: "#f5b10d",
    backGround: "#f3e3bb",
  },
  {
    image: hamburger,
    name: "Hamburguesa",
    color: "#f55c1b",
    backGround: "#f8d2c2",
  },
  {
    image: bebidas,
    name: "Bebidas",
    color: "#b83913",
    backGround: "#f5f2e0",
  },
];

export const GetCategoryStyle = (type: string) => {
  const filteredCategory = category.filter((cat) => cat.name === type);

  if (filteredCategory.length > 0) {
    return filteredCategory.map((cat) => (
      <div key={cat.name} style={{ position: "relative", right: "80px"}}>
        <img
          src={cat.image}
          alt={cat.name}
          style={{ height: "30px", marginRight: "10px" }}
        />
        <span
          style={{
            color: cat.color,
            backgroundColor: cat.backGround,
            textAlign: "center",
            borderRadius: "5px",
            width: "100%",
            height: "25px",
            padding: "10px",
          }}
        >
          {cat.name}
        </span>
      </div>
    ));
  } else {
    return <div style={{ position: "relative", right: "80px" }}>Not found</div>;
  }
};
