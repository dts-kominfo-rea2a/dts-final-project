import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRecipeQuery } from "../services/recipeAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, error, isLoading } = useRecipeQuery();

  const navigate = useNavigate();

  const recipeHandler = (id) => {
    navigate(`/recipe/${id}`);
    // console.log(id);
  };

  return (
    <>
      <div style={{ backgroundColor: "#e7ebf0" }}>
        <Header />
        <Container
          maxWidth="false"
          sx={{ marginBlock: "2em", maxWidth: "95%", height: "75.3vh" }}
        >
          <Typography variant="h4" component="h4" sx={{ marginBottom: "1em" }}>
            New Recipe
          </Typography>
          <Swiper
            spaceBetween={50}
            slidesPerView={5}
            loop={true}
            navigation={false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {error ? (
              <>Ada error disini</>
            ) : isLoading ? (
              <>Loading</>
            ) : (
              data.results.map((recipeItem, index) => {
                return (
                  <SwiperSlide>
                    <Card
                      sx={{
                        maxWidth: "345px",
                        marginBlock: "10px",
                        minWidth: "100",
                      }}
                      key={recipeItem.key}
                    >
                      <CardActionArea
                        onClick={() => recipeHandler(recipeItem.key)}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={recipeItem.thumb}
                          alt={recipeItem.thumb}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {recipeItem.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {recipeItem.times},{recipeItem.portion}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Home;
