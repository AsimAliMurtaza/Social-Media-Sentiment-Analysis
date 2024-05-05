import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const EditCategoryForm = ({ open, onClose, product }) => {
  const [formData, setFormData] = useState({ ...product });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };
  
  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/editcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      {
        console.log(formData);
      }

      if (response.ok) {
        console.log("Data sent successfully");
        onClose();
        setFormData({
          CategoryID: "",
          CategoryName: "",
        });
        setError("");
      } else {
        const responseData = await response.json();
        setError(responseData.error || "Error updating category");
      }
    } catch (error) {
      setError("Error sending data");
      console.error("Error sending data:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Category Name"
          name="CategoryName"
          value={formData.CategoryName}
          onChange={handleChange}
          margin="normal"
        />
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

export default EditCategoryForm;
