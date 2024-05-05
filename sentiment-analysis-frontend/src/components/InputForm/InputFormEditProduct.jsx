import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useEffect } from "react";

const EditProductForm = ({ open, onClose, product }) => {
  const [formData, setFormData] = useState({ ...product });
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleSave = async (event) => {
    event.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
    }));

    try {
      const response = await fetch("http://localhost:5000/api/editproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data sent successfully");
        onClose();
        setFormData({
          ProductID: "",
          ProductName: "",
          ProductCategory: "",
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
          setError("This Product already exists!");
        }
      }
    } catch (error) {
      setError("Error sending data");
      console.error("Error sending data:", error);
    }
  };
  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/viewcategories"
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          console.log("Products fetched successfully:", data);
        } else {
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchCategory();
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Product Name"
          name="ProductName"
          value={formData.ProductName}
          onChange={handleChange}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.ProductCategory}
            onChange={handleChange}
            name="category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.CategoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductForm;
