import React, { useState, useEffect } from "react";
import { Box, Typography, CardActions, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "../../routes/Dashboard.css";

function CustomCard({ features, inputForm}) {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={0}>
        {features.map((feature, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ height: "100vh" }}>
              <CardContent>
                {inputForm}
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Click here
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CustomCard;
