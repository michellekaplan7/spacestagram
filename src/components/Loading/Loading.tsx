import React from "react";

import { CircularProgress, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  loadingContainer: {
    alignItems: "center",
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    width: "100%",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loadingContainer}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
