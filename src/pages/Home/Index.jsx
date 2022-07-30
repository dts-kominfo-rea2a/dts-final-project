import { Box, Button, Container, Divider, Grid, Typography } from "@mui/material"
import CardComponent from "../../components/CardComponent"
import TypingAnimation from "../../components/typing-animation/TypingAnimation";

const HomeIndex = () => {
  return (
    <>
      <Box sx={{ minWidth: '100%', height: '60vh', display: 'flex', flexDirection: 'column', margin: '2em 0', alignItems: 'center', justifyContent: 'center' }}>
        <Container fluid>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Typography variant='h1'>write your own</Typography>
              <Box sx={{ padding: '20px' }} />
              <Button variant="contained" size="large" disableElevation> Get Started </Button>
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
            <Typography variant="h6" sx={{ padding: '12px 0'}} >New Articles</Typography>
            <CardComponent title={'Lizard alias kadal'} description={'Lizards are a widespread group of squamate reptiles, \n with over 6,000 species, ranging across all continents except Antarctica'} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Typography variant="h6" sx={{ padding: '12px 0'}} >Categories</Typography>
          </Box>
        </Grid>
      </Grid>
      </Container>
    </>
  )
}

export default HomeIndex;