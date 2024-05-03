import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box, Grid } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import InputFormCategory from "../components/InputForm/InputFormCategory";
import ListUsers from "../components/ListItem/ListUser";
import { useState } from "react";
import ProductInputForm from "../components/InputForm/InputFormProducts";
import { ViewCarousel } from "@mui/icons-material";

export default function ViewUsers() {


  const [users, setUsers] = useState([
    { id: 1, name: "User 1", email: "johndoe@example.com", gender: "Male" },
    { id: 1, name: "User 1", email: "johndoe@example.com", gender: "Male" },
    { id: 1, name: "User 1", email: "johndoe@example.com", gender: "Male" },
    { id: 1, name: "User 1", email: "johndoe@example.com", gender: "Male" },
    { id: 1, name: "User 1", email: "johndoe@example.com", gender: "Male" },
    { id: 1, name: "User 1", email: "johndoe@example.com", gender: "Male" },
    { id: 1, name: "User 1", email: "johndoe@example.com", gender: "Male" },
    { id: 1, name: "User 1", email: "johndoe@example.com", gender: "Male" },


  ]);

  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex", marginLeft: "-5%", marginRight: "0%" }}>
          <SideNavbar />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomCard inputForm={<ListUsers items={users} title={"View Users"} />} />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}