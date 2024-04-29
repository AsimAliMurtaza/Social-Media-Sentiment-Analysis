import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Navbar from "../components/Navbar/Navbar";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { useNavigate } from "react-router";

export default function ProductCategoryForm() {
  const [productData, setProductData] = useState({
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
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <div className="">
          <Box height={0} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh)",
            }}
          >
            <Card
              sx={{ minWidth: 400, marginTop: 10, marginLeft: 50, height: "83vh" }}
            >
              <CardContent>
                <form onSubmit={handleProductSubmit}>
                  <div style={{ textAlign: "center" }}>
                    <h1>Select Category</h1>
                  </div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={productData.category}
                      label="Category"
                      onChange={handleProductChange}
                      sx={{ marginBottom: 6 }}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                      <MenuItem value="Other">Other</MenuItem>{" "}
                      {/* Manual entry option */}
                    </Select>
                  </FormControl>
                  {/* Text field for entering custom category */}
                  {productData.category === "Other" && (
                    <TextField
                      id="custom-category"
                      label="Enter Category"
                      variant="outlined"
                      value={productData.customCategory}
                      onChange={handleCustomCategoryChange}
                      fullWidth
                      sx={{ marginBottom: 4 }}
                    />
                  )}
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
              </CardContent>
            </Card>
          </Box>
        </div>
      </Box>
    </>
  );
}
