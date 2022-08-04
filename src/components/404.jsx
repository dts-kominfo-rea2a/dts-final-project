import { Box, Button, Container, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <Container>
      <Box sx={{ padding: '12em 3em', textAlign: 'center'}}>
        <Typography variant="h2" color={'gray'}>Page not Found</Typography>
        <Link to="/">
        <Button variant="outlined">Back to home</Button>
        </Link>
      </Box>
    </Container>
  )
}

export default NotFound

