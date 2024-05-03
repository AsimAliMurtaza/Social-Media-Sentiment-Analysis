import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";

export default function ProductInputForm() {
  const [productData, setProductData] = useState({
    productName: "",
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
      <form onSubmit={handleProductSubmit}>
        <div style={{ textAlign: "Left", marginBottom: "1rem" }}>
          <h1>Enter Product</h1>
        </div>
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <TextField
            id="product-name"
            label="Product Name"
            variant="outlined"
            value={productData.productName}
            onChange={(e) =>
              setProductData({ ...productData, productName: e.target.value })
            }
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productData.category}
            label="Category"
            onChange={handleProductChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        {/* Text field for entering custom category */}
        {productData.category === "Other" && (
          <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
            <TextField
              id="custom-category"
              label="Enter Category"
              variant="outlined"
              value={productData.customCategory}
              onChange={handleCustomCategoryChange}
              fullWidth
            />
          </FormControl>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ backgroundColor: "rgb(22, 25, 18)", color: "#ffffff" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
