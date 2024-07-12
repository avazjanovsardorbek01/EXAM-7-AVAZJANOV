import { Search } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { ProductsModal } from "@modal";
import productsApi from "../../service/products";
import { ProductsTable } from "@ui";

const customColors = {
  primary: "#FE8A2F",
  white: "#FFFFFF",
  lightGray: "#F0F0F0",
};

function ProductIndex() {
  const [modalOpen, setModalOpen] = useState(false);
  const [productData, setProductData] = useState([]);

  const fetchProductData = async () => {
    try {
      const response = await productsApi.get();
      if (response.status === 200 && response?.data?.products) {
        setProductData(response?.data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <>
      <ProductsModal open={modalOpen} handleClose={() => setModalOpen(false)} />
      <div className="flex justify-between items-center my-5">
        <div className="relative w-[400px]">
          <TextField
            variant="outlined"
            placeholder="Search.."
            fullWidth
            InputProps={{
              startAdornment: <Search className="h-5 w-5 text-gray-400" />,
              disableUnderline: true,
              style: {
                padding: "4px 36px 4px 12px",
                fontSize: "12px",
                height: "35px",
              },
            }}
            sx={{
              backgroundColor: customColors.white,
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: customColors.lightGray,
                },
                "&:hover fieldset": {
                  borderColor: customColors.primary,
                },
                "&.Mui-focused fieldset": {
                  borderColor: customColors.primary,
                },
              },
            }}
          />
        </div>
        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          sx={{
            backgroundColor: customColors.primary,
            color: customColors.white,
            "&:hover": {
              backgroundColor: "#FE8A2F",
            },
          }}
        >
          Add Products
        </Button>
      </div>
      <ProductsTable data={productData} />
    </>
  );
}

export default ProductIndex;
