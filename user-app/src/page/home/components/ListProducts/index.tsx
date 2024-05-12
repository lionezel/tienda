import { Product } from "../../../../interfaces/Products";
import { CardProduct } from "../CardProduct";
import styled from "styled-components/native";

interface Props {
  products: Product[];
}

export const ListProducts = ({ products }: Props) => {
  return (
    <Container>
      {products.map((product) => (
        <CardProduct product={product} />
      ))}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
`;
