import { Button } from "@mui/material";
import { CategoryModal } from "@modal";
import { CategoryTable } from "@ui";
import { useEffect, useState } from "react";
import { category } from "../../service";

const themeColors = {
  primary: "#FE8A2F",
  textWhite: "#FFFFFF",
  backgroundGray: "#F0F0F0",
};

const CategoryIndex = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await category.get();
      if (response.status === 200 && response?.data?.categories) {
        setCategories(response?.data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <CategoryModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button
            variant="contained"
            onClick={() => setIsModalOpen(true)}
            sx={{
              backgroundColor: themeColors.primary,
              color: themeColors.textWhite,
              "&:hover": {
                backgroundColor: themeColors.primary,
              },
            }}
          >
            Add Category
          </Button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <CategoryTable data={categories} />
        </div>
      </div>
    </>
  );
};

export default CategoryIndex;
