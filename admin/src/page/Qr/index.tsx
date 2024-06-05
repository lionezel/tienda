import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GLOBAL_COLOR } from "../../Global/GLOBAL_COLOR";
import AddIcon from "@mui/icons-material/Add";
import { useFetchTranference } from "../../hook/useFetchTranference";

export const Qr = () => {
  const image = useFetchTranference();

  console.log(image)

  return (
    <Container>
      <div>Qr</div>

    {
      image.map((image) => (
        <div key={image.id}>
        <img src={image.imageURL} alt="image" />
        </div>
      ))
    }

      <Link to={`/CreateQr`}>
        <Button
          variant="contained"
          style={{ backgroundColor: GLOBAL_COLOR, color: "black" }}
        >
          <AddIcon />
          anadir producto
        </Button>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 100px;
  margin-left: 15%;
  width: 85%;
  height: 100vh;
  padding-left: 200px;
  padding-right: 200px;
  overflow-y: auto;
`;
