import { React } from "react";
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
} from "@mui/material";
//import CardSeasons from "./CardSeasons";
import { useGetLeaguesStandingsQuery } from "../service/serviceApi";
import { useParams } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";

const DetailLeagues = () => {
  const params = useParams();
  console.log(params);
  const { data, isLoading, error } = useGetLeaguesStandingsQuery(params.id);

  return (
    <>
    <Card background="blue">
        {/* <CardSeasons /> */}
        <Grid container wrap="nowrap" spacing={5}>
          <Grid item>
          
          </Grid>
          <Grid item>
            
          </Grid>
        </Grid>
      </Card>
      
      <Card direction="row" elevation={2} sx={{ p: "3em", minHeight: "100%",}}>
      <Typography
              // margin={0}
              align="center"
              //justify="center"
              variant="h4"
            >
              {data?.data?.name}
            </Typography>
        <Box>
          <TableContainer sx={{background:"windows"}}>
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
                  <LoadingComponent align="center"/>
                </>
              ) : (
                <TableBody>
                  {data?.data?.standings.map((club, id) => (
                    <TableRow>
                      <TableCell align="center">
                        <Avatar
                          src={club?.team?.logos[0]?.href}
                          variant="square"
                          sx={{ width: 20, height: 20 }}
                        />
                      </TableCell>
                      <TableCell align="left">{club?.team?.name}</TableCell>
                      {club?.stats.map((stat, i) => (
                        <TableCell align="center">{stat?.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </>
  );
};

export default DetailLeagues;
