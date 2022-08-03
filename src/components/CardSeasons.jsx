import React, { useState } from "react";
import {Box, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
//import { useGetLeaguesSeasonsQuery } from "../service/serviceApi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const CardSeasons = ({}) => {
  // const [seasons, setSeasons] = React.useState("");
  //const params = useParams();
  const navigate = useNavigate();
  const [seasons, setSeasons]= useState ("");
 
  const handleChange = (event) => {
    setSeasons(event.target.value);
  };

  function getSeasons(e) {
    e.preventDefault();
    if (seasons) {
      navigate(`/leagues/standings/`,);
    }
  }
  return (
    <Box md={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Seasons</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={seasons}
          label="Seasons"
          onChange={handleChange}
        >   
            <MenuItem value="season=2019" onClick={getSeasons}>2019</MenuItem>
            <MenuItem value="season=2020" onClick={getSeasons}>2020</MenuItem>
            <MenuItem value="season=2021" onClick={getSeasons}>2021</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
export default CardSeasons;
