import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

function InputFormCategory() {
  const [customCategory, setCustomCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/createcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customCategory }), // Sending only customCategory to the backend
      });
      if (response.ok) {
        console.log("Data sent successfully");
        setCustomCategory(""); // Clear the text field after successful submission
        setError(""); // Clear any previous error message
      } else {
        const responseData = await response.json();
        if (
          responseData.error &&
          responseData.error.includes("duplicate key")
        ) {
          setError("This Category already exists!");
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
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit}>
        <h2>Add Category</h2>
        {/* Text field for entering category */}
        <TextField
          id="category"
          label="Category"
          variant="outlined"
          fullWidth
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)} // Update customCategory state
          error={Boolean(error)}
          helperText={error}
          sx={{ marginBottom: 4 }}
        />
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
  );
}

export default InputFormCategory;
