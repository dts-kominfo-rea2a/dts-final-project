import React from "react";
import { Box, Alert } from "@mui/material";

const ErrorComponent = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent:"center"
      }}
    >
      <Alert severity="error">{message}</Alert>
    </Box>
  );
};
export default ErrorComponent;