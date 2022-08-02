import { Box, Button, Container, Divider, Grid, Typography } from "@mui/material"
import { useEffect } from "react";
import CardComponent from "../../components/CardComponent"
import ChipComponent from "../../components/ChipComponent";
import TypingAnimation from "../../components/typing-animation/TypingAnimation";
import { useGetAllPostsQuery } from "../../services/postsService";


const HomeIndex = () => {
  const { data, error, isLoading, isSuccess } = useGetAllPostsQuery()

  useEffect(() => {
    document.title = "blogiseng -- welcome";
  }, []);

  return (
    <>
      <Box sx={{ minWidth: '100%', height: '60vh', display: 'flex', flexDirection: 'column', margin: '2em 0', alignItems: 'center', justifyContent: 'center' }}>
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Typography variant='h1' marginLeft={'18px'}>write your own</Typography>
              <Box sx={{ padding: '20px' }} />
              <Button sx={{ marginLeft: '18px' }} variant="contained" size="large" disableElevation> Get Started </Button>
            </Grid>
            <Grid item xs={4}>
              <TypingAnimation />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Divider />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={8} >
            <Box sx={{ gap: '10px' }}>
              <Typography variant="h6" sx={{ padding: '12px 0' }} >New Articles</Typography>
              {/* {
                posts.map((post) => (
                  <CardComponent
                    key={post.id}
                    username={post.author[0].username}
                    title={post.title}
                    description={post.content}
                    href={`/posts/${post.id}`}
                    images={post.postPicture.url}
                    publishDate={post.created_at}
                  />
                ))
              }  */}

              <div>
                {error && <p>an error occured</p>}
                {isLoading && <p>Loading...</p>}
              </div>
              {
                isSuccess && (
                  data.map((post) => (
                    <CardComponent
                      key={post.id}
                      username={post.author[0].username}
                      title={post.title}
                      description={post.content}
                      href={`/posts/${post.id}`}
                      images={post.postPicture.url}
                      publishDate={post.created_at}
                    />
                  ))
                )
              }
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Typography variant="h6" sx={{ padding: '12px 0' }} >Categories</Typography>
              <ChipComponent />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default HomeIndex;
