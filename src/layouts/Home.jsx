import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRecipeQuery } from "../services/recipeAPI";

const Home = () => {
  const { data, error, isLoading } = useRecipeQuery();

  return (
    <>
      <Header />
      {error ? (
        <>Ada error disini</>
      ) : isLoading ? (
        <>Loading</>
      ) : (
        data.results.slice(0, 5).map((recipeItem) => {
          return (
            <Card sx={{ maxWidth: 345 }} key={recipeItem.id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={recipeItem.thumb}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recipeItem.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {recipeItem.times},{recipeItem.portion}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })
      )}
      <Footer />
    </>
  );
};

export default Home;
