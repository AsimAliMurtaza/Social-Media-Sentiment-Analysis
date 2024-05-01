import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";

export default function ProductPage() {
  const features = [
    {
      heading: "Manage Users",
      description: "Add, edit, and delete users in the database.",
    },
  ];

  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex", marginLeft: "-5%" }}>
          <SideNavbar />
          <CustomCard features={features}/>
        </Box>
      </div>
    </>
  );
}
