import { Box, Button, Container, Grid, Typography } from "@mui/material"
import CardComponent from "../../components/CardComponent"

const HomeIndex = () => {
  return (
    <>
      <Box sx={{ minWidth: '100%', height: '60vh', display: 'flex', flexDirection: 'column', marginBottom: '2em', alignItems: 'center', justifyContent: 'center' }}>
        <Container>
          <Typography variant='h1'>write your own</Typography>
          <Box sx={{padding: '20px'}} />
          <Button variant="contained" size="large" disableElevation> Get Started </Button>
        </Container>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8} >
          <Box sx={{ gap: '20px' }}>
            <Typography variant="h6" >New Articles</Typography>
            <CardComponent title={'Lizard alias kadal'} description={'Lizards are a widespread group of squamate reptiles, \n with over 6,000 species, ranging across all continents except Antarctica'} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>xs=4</Box>
        </Grid>
      </Grid>
    </>
  )
}

export default HomeIndex;