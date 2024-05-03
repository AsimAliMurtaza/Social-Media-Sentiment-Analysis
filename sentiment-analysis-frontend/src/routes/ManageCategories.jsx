import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box, Grid } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import InputFormCategory from "../components/InputForm/InputFormCategory";
import List from "../components/ListItem/ListItem";
import { useState } from "react";
import ProductInputForm from "../components/InputForm/InputFormProducts";
import { Description } from "@mui/icons-material";
import Slide from "@mui/material/Slide";

export default function Categories() {
  const [categories, setcategories] = useState([
    { id: 1, name: "Category 1", description: "Content 1" },
    { id: 2, name: "Category 2", description: "Content 2" },
    { id: 3, name: "Category 3", description: "Content 3" },
    { id: 4, name: "Category 4", description: "Content 4" },
    { id: 5, name: "Category 5", description: "Content 5" },
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
              <Slide direction="down">
                <CustomCard
                  inputForm={
                    <List items={categories} title={"Manage Categories"} />
                  }
                />
              </Slide>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
