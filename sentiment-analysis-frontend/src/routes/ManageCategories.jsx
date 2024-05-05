import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box, Grid } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import { useState } from "react";
import ListCategories from "../components/ListItem/ListCategory";
import Slide from "@mui/material/Slide";
import { useEffect } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/viewcategories"
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          console.log("Categories fetched successfully:", data);
        } else {
        }
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    }
    fetchCategory();
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
              <Slide direction="down">
                <CustomCard
                  inputForm={
                    <ListCategories
                      items={categories}
                      title={"Manage Categories"}
                    />
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
