import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar/Navbar.jsx";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { CardTravel, Settings } from "@mui/icons-material";
import "../routes/Dashboard.css";
import AccordionTransition from "../components/Accordian/Accordian";
import LineChart from "../components/Charts/LineChart";
import BarChart from "../components/Charts/BarChart.jsx";
import ScatterChart from "../components/Charts/ScatterChart.jsx";

export default function Analytics() {
  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <SideNavbar />
          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <Card
                    sx={{ maxWidth: "100%", height: 190 }}
                    className="card-container"
                  >
                    <CardContent>
                      <div>
                        <CardTravel sx={{ color: "black" }} />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "black" }}
                      >
                        Item 1 Title
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "black" }}
                      >
                        jo b show krwana idher show krwa do props pass kr k
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ maxWidth: "100%", height: 190 }}
                    className="card-container"
                  >
                    <CardContent>
                      <div>
                        <CardTravel sx={{ color: "black" }} />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "black" }}
                      >
                        Item 2 Title
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "black" }}
                      >
                        jo b show krwana idher show krwa do props pass kr k
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ color: "white", maxWidth: "100%", height: "100%" }}>
                  <CardContent style={{ padding: 0 }}>
                    {" "}
                    <ScatterChart />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box height={30} />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    <LineChart />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    <BarChart />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}
