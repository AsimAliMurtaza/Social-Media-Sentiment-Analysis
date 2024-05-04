import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router";

export default function ProductInputForm() {
  const [productData, setProductData] = useState({
    productName: "",
    category: "",
    customCategory: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/viewcategories"
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          console.log("Categories fetched successfully:", data);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

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

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (response.ok) {
        console.log("Data sent successfully");
        setProductData({
          productName: "",
          category: "",
          customCategory: "",
        });
        setError("");
      } else {
        const responseData = await response.json();
        if (
          responseData.error &&
          responseData.error.includes("duplicate key")
        ) {
          setError("This Product already exists!");
        } else {
          setError("Error sending data");
        }
      }
    } catch (error) {
      setError("Error sending data");
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productData.ProductCategory}
            onChange={handleProductChange}
            name="category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.CategoryName}
              </MenuItem>
            ))}
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
