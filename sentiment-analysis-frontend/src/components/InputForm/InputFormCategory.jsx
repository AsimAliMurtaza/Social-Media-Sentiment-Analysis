import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";

function InputFormCategory() {
  const [productData, setProductData] = useState({
    category: "",
    customCategory: "", // Added state for custom category
  });
  const navigate = useNavigate();

  const [categories] = useState([
    "Dairy Cream",
    "Powdered Milk",
    "Nutritional Drinks",
    "Fruita Vitals Juice",
    "Nesfruita Juice",
    "Milo",
    "Cerelac",
    "Nido",
    "Nescafe",
    "Mineral Water",
    "Cereal",
  ]);

  const handleProductChange = (event) => {
    const { value } = event.target;
    if (value === "Other") {
      setProductData({ ...productData, category: value });
    } else {
      setProductData({ ...productData, category: value, customCategory: "" });
    }
  };

  const handleCustomCategoryChange = (event) => {
    const { value } = event.target;
    setProductData({ ...productData, customCategory: value });
  };

  const handleProductSubmit = (event) => {
    event.preventDefault();
    // Handle submission logic here
    console.log(productData);
    navigate("/"); // Redirect to home page
  };

  return (
    <div>
      <Box sx={{ maxWidth: 400, margin: "auto" }}>
        <form onSubmit={handleProductSubmit}>
          <div style={{ textAlign: "center" }}>
            <h1>Add Category</h1>
          </div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={productData.category}
              label="Category"
              onChange={handleProductChange}
              sx={{ marginBottom: 6 }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
              <MenuItem value="Other">Other</MenuItem>{" "}
              {/* Manual entry option */}
            </Select>
          </FormControl>
          {/* Text field for entering custom category */}
          {productData.category === "Other" && (
            <TextField
              id="custom-category"
              label="Enter Category"
              variant="outlined"
              value={productData.customCategory}
              onChange={handleCustomCategoryChange}
              sx={{ marginBottom: 4 }}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "rgb(22, 25, 18)",
              color: "#ffffff",
            }}
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default InputFormCategory;
