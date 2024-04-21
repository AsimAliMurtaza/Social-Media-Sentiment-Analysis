import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Navbar from "../components/Navbar/Navbar";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

export default function InputForm() {
  const [formData, setFormData] = React.useState({
    company: "",
    product: "",
    category: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Data sent successfully");
      } else {
        console.error("Failed to send data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={70} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            height: "calc(100vh - 70px)", // Adjust height to fit screen
          }}
        >
          <SideNavbar />
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="company"
                  label="Company"
                  variant="outlined"
                  value={formData.company}
                  onChange={handleChange}
                />
                <TextField
                  id="product"
                  label="Product"
                  variant="outlined"
                  value={formData.product}
                  onChange={handleChange}
                />
                <TextField
                  id="category"
                  label="Category"
                  variant="outlined"
                  value={formData.category}
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
}
