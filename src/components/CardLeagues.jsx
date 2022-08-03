import React from "react";
import {
  Grid,
  Typography,
  Avatar,
  Box,
  Card,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardLeagues = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Card direction="row" elevation={10} sx={{ p: "1em", minHeight: "100%" }}>
      <Button >
        <Box
          container
          justifyContent="center"
          justifyItems="center"
          sx={{
            width: "100%",
            height: { lg: "75px", md: "75px", sm: "75px", xs: "75px" },
          }}

          onClick={() => navigate(`/detail/${data.id}`)}
        >
          <Grid container wrap="nowrap" spacing={5} justifyContent="center">
            <Grid item>
              <Avatar
                src={`${data.logos.light}`}
                variant="square"
                sx={{ width: 70, height: 70, mr: 2 }}
              />
            </Grid>
            <Grid item>
              <Typography
              sx={{ mt: 2, mb: 2 }} variant="h6" component="div"
                // margin={0}
                align="center"
                //justify="center"
              >
                {data.name}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Button>
    </Card>
  );
};
export default CardLeagues;
