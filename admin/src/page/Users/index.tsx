import styled from "styled-components";
import { useFetchUsers } from "../../hook/useFetchUsers";
import { SearchUsers } from "./components";

export const Users = () => {
  const users = useFetchUsers();

  return (
    <Conatiner>
      <SearchUsers users={users} />
    </Conatiner>
  );
};

const Conatiner = styled.div`
  margin-top: 20px;
  margin-left: 15%;
  width: 85%;
  height: 100vh;
  padding-left: 200px;
  padding-right: 200px;
  overflow-y: auto;
`;
