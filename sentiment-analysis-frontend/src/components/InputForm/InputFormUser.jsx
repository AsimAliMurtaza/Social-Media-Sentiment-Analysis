import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Person } from "@mui/icons-material";

function UserForm() {
  const [formData, setFormData] = useState({
    UserName: "",
    Email: "",
    Gender: "male", // Default gender value
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("User created successfully");
        // Optionally, you can redirect the user to another page or show a success message
      } else {
        console.error("Failed to create user:", response.statusText);
        // Optionally, you can handle the error by showing an error message to the user
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // Optionally, you can handle the error by showing an error message to the user
    }
  };

  return (
    <div>
      <Box sx={{ maxWidth: 600, margin: "auto" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <h1>Add an Engager</h1>
          </div>
          <TextField
            id="username"
            name="UserName"
            label="Username"
            variant="outlined"
            value={formData.UserName}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 4 }}
            required
          />
          <TextField
            id="email"
            name="Email"
            label="Email"
            variant="outlined"
            type="email"
            value={formData.Email}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 4 }}
            required
          />
          <FormControl fullWidth sx={{ marginBottom: 4 }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="Gender"
              value={formData.Gender}
              onChange={handleInputChange}
              label="Gender"
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="NotSpecified">Prefer not to say</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            style={{
              marginLeft: "89%",
              backgroundColor: "rgb(255,255,255)",
              color: "#000000",
            }}
          >
            <Person />
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default UserForm;
