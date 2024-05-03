import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Add, Person } from "@mui/icons-material";

function UserForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gender: "male", // Default gender value
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform form submission logic, like sending the data to a server
    console.log(formData);
  };

  return (
    <div>
      <Box sx={{ maxWidth: 600, margin: "auto" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <h1>Create Account</h1>
          </div>
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            value={formData.username}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 4 }}
            required
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            value={formData.email}
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
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              label="Gender"
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            style={{ marginLeft: "89%" ,backgroundColor: "rgb(255,255,255)", color: "#000000" }}
            
          >
            <Person />
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default UserForm;
