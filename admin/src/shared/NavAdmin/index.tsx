import styled from "styled-components";
import { IconsInteractive, SearchAll } from "./components";

export const NavAdmin = () => {
  return (
    <Container>
      <Space>
        <SearchAll />
        <IconsInteractive />
      </Space>
    </Container>
  );
};

const Space = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  bottom: 10px;
  align-items: center;
`;

const Container = styled.div`
  position: absolute;
  left: 25.6%;
  margin-bottom: 2px;
  margin-top: 20px;
  width: 63.5%;
  padding: 20px;
  height: 20px;
  border-radius: 15px;
  background-color: white;
`;
