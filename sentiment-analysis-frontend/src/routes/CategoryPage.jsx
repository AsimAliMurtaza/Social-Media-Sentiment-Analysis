import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import InputFormCategory from "../components/InputForm/InputFormCategory";

export default function ProductPage() {
  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex", marginLeft: "-5%" }}>
          <SideNavbar />
          <CustomCard inputForm={<InputFormCategory />} />
        </Box>
      </div>
    </>
  );
}
