import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import workers from "../../../service/workers";
import { WorkersModal } from "@modal";
import { useState } from "react";

const colors = {
  header: "#FE8A2F",
  white: "#FFFFFF",
  hover: "#FFE7D4",
  black: "#000000",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.header,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: colors.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledButton = styled("button")(({ theme }) => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  color: colors.black,
  "&:hover": {
    color: colors.header,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
}));

const CustomizedTables = ({ data }) => {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
  };

  const deleteItem = async (id) => {
    try {
      const response = await workers.delete(id);
      if (response.status === 200 || response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <WorkersModal
        item={edit}
        open={open}
        handleClose={() => setOpen(false)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.first_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.last_name}
                </StyledTableCell>
                <StyledTableCell align="center">{item.gender}</StyledTableCell>
                <StyledTableCell align="center">{item.age}</StyledTableCell>
                <StyledTableCell align="center">
                  <StyledButton onClick={() => deleteItem(item.id)}>
                    <DeleteIcon />
                  </StyledButton>
                  <StyledButton onClick={() => editItem(item)}>
                    <EditIcon />
                  </StyledButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomizedTables;
