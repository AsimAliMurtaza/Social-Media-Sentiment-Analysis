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

const EditPostsForm = ({ open, onClose, product }) => {
  const [formData, setFormData] = useState({ ...product });
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/editposts", {
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
          PostID: "",
          PostContent: "",
        });
        setError("");
      } else {
        const responseData = await response.json();
        setError(responseData.error || "Error updating post");
      }
    } catch (error) {
      setError("Error sending data");
      console.error("Error sending data:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Post Content"
          name="PostContent"
          value={formData.PostContent}
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

export default EditPostsForm;
