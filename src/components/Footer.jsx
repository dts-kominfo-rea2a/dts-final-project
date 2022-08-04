import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "primary.dark",
        textAlign: "center",
        color: "white",
        height: "48px",
      }}
    >
      <Typography variant="body1">
        (152235865100-795) Ida Bagus Made Lingga Pradirta
      </Typography>
    </Box>
  );
}
