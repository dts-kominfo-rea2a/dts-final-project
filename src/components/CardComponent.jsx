import { Avatar, Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const CardComponent = ({ title, description, images }) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 10px'}}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Typography variant="body1">Remy Sharp</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', whiteSpace: 'pre-line',padding: '0 12px'}}>
            <Typography variant="h5">
              {title}
            </Typography>
            <Typography variant="body1">
              {description}
            </Typography>
          </Box>
          <div style={{border: '0.5px solid #EDEDED', display: 'flex', alignItems: 'center'}}>
            {
              images !== undefined ? (
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={images}
                  alt="Live from space album cover"
                />
              ) : (
                <p style={{ padding: '2px'}}>NO IMAGE</p>
              )
            }
          </div>

        </Box>
      </CardContent>

    </Card>
  )
}

export default CardComponent;