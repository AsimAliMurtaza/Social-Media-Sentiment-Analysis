import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { CardTravel, Settings } from "@mui/icons-material";
import "../routes/Dashboard.css";
import AccordionTransition from "../components/Accordian/Accordian";

export default function Home() {
  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <SideNavbar />
          <Box component="main" sx={{ flexGrow: 1, p: 2}}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Stack direction="row" spacing={2}>
                  <Card
                    sx={{ minWidth: 49 + "%", height: 165 }}
                    className="gradient"
                  >
                    <CardContent>
                      <div>
                        <CardTravel sx={{ color: "white" }} />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "white" }}
                      >
                        Item 1 Title
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "whitesmoke" }}
                      >
                    jo b show krwana idher show krwa do props pass kr k
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ minWidth: 49 + "%", height: 165 }}
                    className="gradient-light"
                  >
                    <CardContent>
                      <div>
                        <CardTravel sx={{ color: "white" }} />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "white" }}
                      >
                        Item 2 Title
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "whitesmoke" }}
                      >
                        jo b show krwana idher show krwa do props pass kr k
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card className="card-container">
                    <Stack direction="row" spacing={2}>
                      <div className="icon-container">
                        <Settings />
                      </div>
                      <div className="padding-container">
                        <span className="item-title">Insert Item 1 here okay? </span>
                        <br />
                        <span className="item-description">
                          Insert Description here okay?
                        </span>
                      </div>
                    </Stack>
                  </Card>
                  <Card className="card-container">
                    <Stack direction="row" spacing={2}>
                      <div className="icon-container">
                        <Settings />
                      </div>
                      <div className="padding-container">
                        <span className="item-title">Insert Item 2 here</span>
                        <br />
                        <span className="item-description">
                          Insert Description 2 here okay? good
                        </span>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={30} />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent></CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    <AccordionTransition />
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
