import styled from "styled-components";

export const PayMethod = () => {
  return (
    <Container>
      <div
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}
      >
        Confirmacion de pago
      </div>
    </Container>
  );
};

export const Container = styled.div`
  width: 50%;
  background-color: white;
  margin-left: 20px;
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
`;
