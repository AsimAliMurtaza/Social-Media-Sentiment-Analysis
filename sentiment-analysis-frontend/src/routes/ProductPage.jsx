import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import InputForm from "../components/InputForm/InputForm";

export default function ProductPage() {
  const features = [
    {
      heading: "Manage Products",
      description: "Add, edit, and delete products in the inventory.",
    },
  ];

  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex", marginLeft: "-5%" }}>
          <SideNavbar />
          <CustomCard features={features} inputForm={<InputForm/>}/>
        </Box>
      </div>
    </>
  );
}
