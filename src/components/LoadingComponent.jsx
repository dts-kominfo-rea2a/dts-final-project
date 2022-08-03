import { CircularProgress, Box } from "@mui/material";
import React from "react";

const LoadingComponent = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box height={"40px"}>
        <CircularProgress color="warning" />
      </Box>
    </Box>
  );
};

export default LoadingComponent;