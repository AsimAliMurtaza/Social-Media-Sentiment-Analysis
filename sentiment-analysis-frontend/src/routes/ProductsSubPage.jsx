import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box, Grid } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import ProductInputForm from "../components/InputForm/InputFormProducts";

export default function ProductSubPage() {
  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex", marginLeft: "-5%", marginRight: "5%" }}>
          <SideNavbar />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomCard inputForm={<ProductInputForm />} />
              <CustomCard inputForm={<ProductInputForm />} />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
