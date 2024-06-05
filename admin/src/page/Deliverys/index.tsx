import styled from "styled-components";
import { ShowData, TableDelivery } from "./components";

export const Deliverys = () => {
  return (
    <Container>
      <ShowData />
      <TableDelivery />
    </Container>
  )
}


export const Container = styled.div`
  margin-top: 20px;
  margin-left: 15%; 
  width: 85%; 
  height: 100vh;
  padding-left: 200px;
  padding-right: 200px;
  overflow-y: auto; 
   margin-top: 100px;
`