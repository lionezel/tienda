/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Menu, MenuItem, IconButton } from '@mui/material';
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

export interface Column {
  header: string;
  accessor: string;
  align?: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  // Add Cell property
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Cell?: (props: { value: any; row: { original: any } }) => JSX.Element;
}

export interface Data {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface MenuItem {
  label: string;
  path: string;
}

const useCustomTable = (props: { data: Data[], columns: Column[], menuItems: MenuItem[] }) => {
  const { data, columns, menuItems } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPath(null);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (path: string) => {
    setCurrentPath(path);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer style={{ backgroundColor: "white", borderRadius: 15 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} align={column.align}>
                {column.header}
              </TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} align={column.align}>
                  {column.accessor !== "products"
                    ? row[column.accessor]
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    : row[column.accessor].map((item: any, index: number) => (
                        <div key={index}>
                          {item.name} - {item.quantity}
                        </div>
                      ))}
                </TableCell>
              ))}
              <TableCell>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={() => handleMenuItemClick(item.path)}>
                      <Link to={`/Orders/${row.id}`}>{item.label}</Link>
                    </MenuItem>
                  ))}
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default useCustomTable;
