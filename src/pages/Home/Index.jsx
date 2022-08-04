import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CardComponent from "../../components/CardComponent"
// import ChipComponent from "../../components/ChipComponent";
import TypingAnimation from "../../components/typing-animation/TypingAnimation";
import { useGetAllPostsQuery } from "../../services/postsService";


const HomeIndex = () => {
  const { data, error, isLoading, isSuccess } = useGetAllPostsQuery()

  const token = localStorage.getItem('access_token')

  useEffect(() => {
    document.title = "blogiseng -- welcome";
  }, []);

  return (
    <>
      {
        !token && (
          <Box sx={{ minWidth: '100%', height: '60vh', display: 'flex', flexDirection: 'column', margin: '2em 0', alignItems: 'center', justifyContent: 'center' }}>
            <Container>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Typography variant='h1' marginLeft={'18px'}>write your own</Typography>
                  <Box sx={{ padding: '20px' }} />
                  <Link to={'/auth/signin'} style={{ textDecoration: 'none'}}>
                    <Button
                      sx={{ marginLeft: '18px', color: 'white' }}
                      variant="contained"
                      size="large"
                      disableElevation>
                      Get Started
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <TypingAnimation />
                </Grid>
              </Grid>
            </Container>
          </Box>
          // <Divider />

        )
      }
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <Box sx={{ gap: '10px' }}>
              <Typography variant="h6" sx={{ padding: '3em 0', marginTop: '0.5em' }} >New Articles</Typography>
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
          {/* <Grid item xs={2}>
            <Box>
              <Typography variant="h6" sx={{ padding: '12px 0', marginTop: '1rem' }} >Categories</Typography>
              <ChipComponent />
            </Box>
          </Grid> */}
        </Grid>
      </Container>
    </>
  )
}

export default HomeIndex;
