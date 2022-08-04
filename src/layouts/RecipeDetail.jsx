import {
  Typography,
  Container,
  Card,
  Box,
  CardMedia,
  CardContent,
} from "@mui/material";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRecipeByIdQuery } from "../services/recipeAPI";
import { useParams } from "react-router-dom";

const Home = () => {
  //   const navigate = useNavigate();
  let params = useParams();
  const { data, error, isLoading } = useRecipeByIdQuery(params.id);

  //   const recipeHandler = (id) => {
  //     navigate(`/recipe/${id}`);
  //     // console.log(id);
  //   };

  return (
    <>
      <div style={{ backgroundColor: "#e7ebf0" }}>
        <Header />
        <Container sx={{ marginBlock: "2.5em" }}>
          <Typography variant="h4" component="div" sx={{ marginBottom: "1em" }}>
            Detail Resep
          </Typography>
          {error ? (
            <>Ada error disini</>
          ) : isLoading ? (
            <>Loading</>
          ) : (
            // data.results.map((recipeItem, index) => {
            //   return (
            //     <>
            //     {}
            //     </>
            //   );
            // })
            <>
              <Typography
                variant="h5"
                component="div"
                sx={{ marginBottom: "1em" }}
              >
                {data.results.title}
              </Typography>
              <Card sx={{ display: "flex", padding: "2em" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 400 }}
                  image={data.results.thumb}
                  alt={data.results.title}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="subtitle1">
                      Waktu Pembuatan: {data.results.times}
                    </Typography>
                    <Typography component="div" variant="subtitle1">
                      Jumlah Porsi: {data.results.portion}
                    </Typography>
                    <Typography component="div" variant="subtitle1">
                      Tingkat Kesulitan: {data.results.dificulty}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
              <Card
                sx={{
                  padding: "0 2em 2em 2em ",
                  textAlign: "justify",
                  textJustify: "inter-word",
                }}
              >
                <Box>
                  <Typography component="div" variant="subtitle1">
                    {data.results.desc}
                  </Typography>
                </Box>
              </Card>
              <Card
                sx={{
                  padding: "0 2em 2em 2em ",
                  textAlign: "justify",
                  textJustify: "inter-word",
                }}
              >
                <Box>
                  <Typography component="div" variant="subtitle1">
                    Bahan:
                  </Typography>
                  {data.results.ingredient.map((ingredients, index) => {
                    return (
                      <>
                        <span component="div" variant="subtitle1">
                          {ingredients}
                        </span>
                        {ingredients.length > index + 1 ? ", " : ""}
                      </>
                    );
                  })}
                </Box>
              </Card>
              <Card sx={{ padding: "0 2em 2em 2em " }}>
                <Box>
                  <Typography component="div" variant="subtitle1">
                    Langkah Pembuatan:
                  </Typography>
                  {data.results.step.map((steps) => {
                    return (
                      <>
                        <Typography component="div" variant="subtitle1">
                          {steps}
                        </Typography>
                      </>
                    );
                  })}
                </Box>
              </Card>
            </>
          )}
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Home;
