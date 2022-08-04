import React from "react";
import { Grid, Box } from "@mui/material";

import ErrorComponent from "../components/ErrorComponent";
import LoadingComponent from "../components/LoadingComponent";
import CardLeagues from "../components/CardLeagues";
import { useGetLeaguesQuery } from "../service/serviceApi";

const HomePage = () => {
  const { data: dataLeagues, isLoading, error } = useGetLeaguesQuery();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
      bgcolor="#bbdefb"
      
    >
      <Grid
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
          alignSelf: "center",
        }}
      >
        <Grid item md={6} sm={6} xs={6}>
          <></>
          <Grid
            
            sx={{
              justifyContent: "space-evenly",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            {error ? (
              <>
                <Grid
                  item
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <ErrorComponent message={"Opss, Something Wrongs"} />
                </Grid>
              </>
            ) : isLoading ? (
              <>
                <LoadingComponent />
              </>
            ) : (
              dataLeagues?.data?.map((data, i) => (
                <Grid
                  // spacing={2}
                  padding={1}
                  key={i}
                  item
                  xs={12}
                  sm={12}
                  md={12}
                 // lg={12}
                  sx={{ mx: 0.2, mb: 1 }}
                >
                  <CardLeagues key={i} data={data} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
