import * as React from "react";
import { Grid } from "@mui/material";

import Bookmark from "../components/Bookmark";
import Feed from "../components/Feed";
import Nav from "../components/Nav";

function HomePage() {
  return (
    <React.Fragment>
      <Nav page="home" id="" refer={null}></Nav>
      <Grid container spacing={5} sx={{ mt: 0.1 }}>
        <Feed />
        <Bookmark />
      </Grid>
    </React.Fragment>
  );
}

export default HomePage;
