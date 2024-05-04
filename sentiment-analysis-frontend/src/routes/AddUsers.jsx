import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import PostForm from "../components/InputForm/PostForm";
import UserForm from "../components/InputForm/InputFormUser";
import { ViewComfyAltOutlined } from "@mui/icons-material";

export default function AddUsers() {


  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex", marginLeft: "-5%" }}>
          <SideNavbar />
          <CustomCard inputForm={<UserForm />} />
        </Box>
      </div>
    </>
  );
}
