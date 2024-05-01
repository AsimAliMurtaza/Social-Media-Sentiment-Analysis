import React from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

const categories = [
  "Electronics",
  "Clothing",
  "Books",
    "Home Goods",
  // Add more categories as needed
];

const InputForm = () => {
  return (
    <Box sx={{ maxWidth: 400, margin: "auto" }}>
      <form>
        <div style={{ textAlign: "center" }}>
          <h1>Add Product</h1>
        </div>
        <TextField
          fullWidth
          id="product-name"
          label="Product Name"
          variant="outlined"
          margin="normal"
        />
        <TextField
          select
          fullWidth
          id="category"
          label="Category"
          variant="outlined"
          margin="normal"
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default InputForm;
