import { Button, TextField } from "@mui/material";
import { GLOBAL_COLOR } from "../../../../../Global/GLOBAL_COLOR";
import AddIcon from "@mui/icons-material/Add";
import { Container } from "./styled";
import { ListCard } from "..";
import { Products } from "../../../../../interfaces/Product";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ListProps {
  products: Products[];
}

export const SearchProduct = ({ products }: ListProps) => {
  const [searchProduct, setSearchProduct] = useState<string>("");

  const filteredProducts = products.filter((product) =>
    Object.values(product).some(
      (value) =>
        typeof value === "string" &&
        value.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase())
    )
  );

  return (
    <div>
      <Container>
        <TextField
          label="Buscar Producto..."
          type="text"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
        <Link to={`/createProduct`}>
          <Button
            variant="contained"
            style={{ backgroundColor: GLOBAL_COLOR, color: "black" }}
          >
            <AddIcon />
            anadir producto
          </Button>
        </Link>
      </Container>
      <ListCard products={filteredProducts} />
    </div>
  );
};
