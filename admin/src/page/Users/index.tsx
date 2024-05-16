import styled from "styled-components";
import { useFetchUsers } from "../../hook/useFetchUsers";
import { SearchUsers } from "./components";

export const Users = () => {
  const users = useFetchUsers();

  return (
    <Container>
      <SearchUsers users={users} />
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
