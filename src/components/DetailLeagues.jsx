import { React, useState } from "react";
import {
  Grid,
  Card,
  Box,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Table,
  Avatar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// import CardSeasons from "./CardSeasons";
import { useGetLeaguesStandingsQuery } from "../service/serviceApi";
import { useParams } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";

const DetailLeagues = () => {
  const params = useParams();
  const [year, setYear] = useState(2022);
  const { data, isLoading, error } = useGetLeaguesStandingsQuery({
    id: params.id,
    year: year,
  });

  return (
    <>
      {/* <Card background="blue">
        
      </Card> */}

      <Card direction="row" elevation={2} sx={{ p: "3em", minHeight: "100%" }}>
      <Grid container wrap="nowrap" spacing={5}>
          <Grid item>
          <Typography
          align="center"
          variant="h4"
        >
          {data?.data?.name}
        </Typography>
          </Grid>
          <Grid item>
          <Box md={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Seasons</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={year}
                  label="Seasons"
                  onChange={(event) => {
                    setYear(event.target.value);
                  }}
                >
                  <MenuItem value="2015">2015</MenuItem>
                  <MenuItem value="2016">2016</MenuItem>
                  <MenuItem value="2017">2017</MenuItem>
                  <MenuItem value="2018">2018</MenuItem>
                  <MenuItem value="2019">2019</MenuItem>
                  <MenuItem value="2020">2020</MenuItem>
                  <MenuItem value="2021">2021</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Box>
          {" "}
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
              <Grid
                item
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <LoadingComponent align="center" />
              </Grid>
            </>
          ) : (
            <TableContainer sx={{ background: "windows" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ background: "#e91e63" }}>
                  <TableRow align="center">
                    <TableCell align="center">Team </TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">W</TableCell>
                    <TableCell align="center">L </TableCell>
                    <TableCell align="center">D </TableCell>
                    <TableCell align="center">GP</TableCell>
                    <TableCell align="center">F </TableCell>
                    <TableCell align="center">A </TableCell>
                    <TableCell align="center">Pts </TableCell>
                    <TableCell align="center">Rank Change </TableCell>
                    <TableCell align="center">Rank </TableCell>
                    <TableCell align="center">GD </TableCell>
                    <TableCell align="center">Deducation </TableCell>
                    <TableCell align="center">PPG</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data?.data?.standings.map((club, id) => (
                    <TableRow key={id}>
                      <TableCell align="center">
                        { (typeof  club?.team?.logos !== "undefined") ? (
                          <Avatar
                            src={club?.team?.logos[0].href}
                            variant="square"
                            sx={{ width: 20, height: 20 }}
                          />
                        ):(<></>)}
                      </TableCell>
                      <TableCell align="left">{club?.team?.name}</TableCell>
                      {club?.stats.map((stat, i) => (
                        <TableCell key={i} align="center">
                          {stat?.value}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Card>
    </>
  );
};

export default DetailLeagues;
