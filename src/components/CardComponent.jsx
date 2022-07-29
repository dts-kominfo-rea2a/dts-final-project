import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const CardComponent = ({ title, description, images }) => {
  return (
    <Card elevation={0} sx={{ borderRadius: '12px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', whiteSpace: 'pre-line' }}>
            <Typography variant="h5">
              {title}
            </Typography>
            <Typography variant="body1">
              {description}
            </Typography>
          </Box>
          <div style={{border: '0.5px solid #EDEDED'}}>
            {
              images !== undefined ? (
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={images}
                  alt="Live from space album cover"
                />
              ) : (
                <p>NO IMAGE :(</p>
              )
            }
          </div>

        </Box>
      </CardContent>

    </Card>
  )
}

export default CardComponent;