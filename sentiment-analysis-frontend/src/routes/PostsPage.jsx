import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import PostForm from "../components/InputForm/InputFormPost";
import { useEffect, useState } from "react";
export default function PostsPage() {


  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex", marginLeft: "-5%" }}>
          <SideNavbar />
          <CustomCard inputForm={<PostForm />} />
        </Box>
      </div>
    </>
  );
}
