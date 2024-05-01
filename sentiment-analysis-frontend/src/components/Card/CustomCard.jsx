import React, { useState, useEffect } from "react";
import { Box, Typography, CardActions, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "../../routes/Dashboard.css";

function CustomCard({ inputForm }) {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <Card sx={{ height: "60vh", overflow: "auto", padding: "10px" }}>
        <CardContent>{inputForm}</CardContent>
      </Card>
    </Box>
  );
}

export default CustomCard;
