import React from "react";

import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ErrorIcon from "@mui/icons-material/Error";

const useStyles = makeStyles((theme: Theme) => ({
  errorContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    width: "100%",
  },
}));

const Error = () => {
  const classes = useStyles();
  return (
    <div className={classes.errorContainer}>
      <Box
        component="div"
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          p: 2,
        }}
      >
        <ErrorIcon color="warning" />
        <Typography color="text.secondary" variant="h4">
          Error
        </Typography>
      </Box>
      <Box component="div">
        <Typography color="text.secondary" variant="h4">
          Oops, something went wrong. Please try again later.
        </Typography>
      </Box>
    </div>
  );
};

export default Error;
