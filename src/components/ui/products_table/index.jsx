import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { CustomizedTables } from "@ui";
import { getProduct } from "../../service/products";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getProduct(); // Получаем список продуктов
      if (response.status === 200) {
        setProducts(response.data); // Устанавливаем полученные данные в состояние
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Products List
      </Typography>
      <Button
        variant="contained"
        onClick={fetchData} // Обновление данных при нажатии кнопки
        sx={{ backgroundColor: "#FACC15", color: "#fff", marginBottom: "10px" }}
      >
        Refresh
      </Button>
      <CustomizedTables data={products} />{" "}
      {/* Передаем данные продуктов в компонент CustomizedTables */}
    </>
  );
};

export default ProductsList;
