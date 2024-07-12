import React, { useState } from "react";
import { Button } from "@mui/material";
import ProductForm from "../../components/modal/products";

const Products = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Products Page</h1>
      <Button variant="contained" onClick={handleOpen}>
        Add Product
      </Button>
      <ProductForm open={open} handleClose={handleClose} />
    </div>
  );
};

export default Products;
