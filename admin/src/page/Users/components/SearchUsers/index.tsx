import { useState } from "react";
import { User } from "../../../../interfaces/User";
import { TableUsers } from "..";
import { Divider, TextField } from "@mui/material";

interface Props {
  users: User[];
}

export const SearchUsers = ({ users }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredUsers = users.filter((users) =>
    Object.values(users).some(
      (value) =>
        typeof value === "string" &&
        value.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    )
  );

  return (
    <div style={{ backgroundColor: "white" }}>
      <div style={{ padding: "20px" }}>
        <TextField
          id="outlined-basic"
          label="Filtrar"
          variant="outlined"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Divider />
      <TableUsers users={filteredUsers} />
    </div>
  );
};
