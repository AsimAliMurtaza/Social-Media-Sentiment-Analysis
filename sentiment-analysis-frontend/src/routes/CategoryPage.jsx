import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import InputFormCategory from "../components/InputForm/InputFormCategory";

export default function ProductPage() {
  const features = [
    {
      heading: "Manage Categories",
      description: "Add, edit, and delete categories in the inventory.",
    },
  ];

  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex", marginLeft: "-5%" }}>
          <SideNavbar />
          <CustomCard features={features} inputForm={<InputFormCategory/>}/>
        </Box>
      </div>
    </>
  );
}
