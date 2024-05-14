import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/material";

export const SearchAll = () => {
  const ariaLabel = { "aria-label": "description" };
  return (
    <div>
      <SearchIcon
        sx={{ position: "relative", top: "5px", marginRight: "20px" }}
      />
      <Input defaultValue="Hello world" inputProps={ariaLabel} />
    </div>
  );
};
