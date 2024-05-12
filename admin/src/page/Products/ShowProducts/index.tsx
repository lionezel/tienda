import { SearchProduct } from "./components";
import styled from "styled-components";
import { useFetchProducts } from "../../../hook/useFetchProducts";

export const ShowProducts = () => {
  const products = useFetchProducts()

  return (
    <Container>
      <h1>Productos</h1>
      <SearchProduct  products={products} />
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
`;
