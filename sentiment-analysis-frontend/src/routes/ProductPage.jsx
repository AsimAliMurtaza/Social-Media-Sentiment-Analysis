import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box, Grid } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import List from "../components/ListItem/ListItem";
import { useState } from "react";
import { useEffect } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          console.log("Products fetched successfully:", data);
        } else {
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex", marginLeft: "-5%", marginRight: "0%" }}>
          <SideNavbar />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomCard
                inputForm={<List items={products} title={"Manage Products"} />}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
