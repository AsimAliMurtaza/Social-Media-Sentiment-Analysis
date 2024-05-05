import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Slide from "@mui/material/Slide"; // Import Slide component for animation
import "../../routes/Dashboard.css";

function CustomCard({ inputForm, isFormVisible }) {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <Card sx={{ height: "89vh", overflow: "auto", padding: "10px" }}>
        <CardContent>
          {/* Wrap inputForm with Slide component */}
          <Slide direction="down" in={isFormVisible} timeout={500}>
            {inputForm}
          </Slide>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CustomCard;
