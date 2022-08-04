import { Avatar, Box, Card, CardContent, CardMedia, Typography, } from "@mui/material";
import { Link } from "react-router-dom";

const CardComponent = ({ title, description, images, href, username, publishDate }) => {

  const formatDate = (value) => {
    const full = new Date(value)
    const date = full.getDate()
    const month = full.getMonth()
    const year = full.getFullYear()

    return date + '/' + month + '/' + year
  }

  return (
    <Card sx={{ margin: '1em 0' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to={'/profile/:id'} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row' }}>
            <Avatar sx={{ width: 24, height: 24, marginLeft: '12px', marginRight: '12px', }} alt={username.slice(0, 2)} src="/static/images/avatar/1.jpg" />
            <Typography textTransform="none" color="gray" variant="button">{username}</Typography>
          </Link>

        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', whiteSpace: 'pre-line', padding: '3px 12px' }}>
            <Typography component="p" variant="subtitle1" fontWeight={'medium'}>
              {title}
            </Typography>
            <Typography variant="caption">
              {description.substring(0, 220)} ... <Link style={{ textDecoration: 'none' }} to={href}>read post</Link>
            </Typography>
            <Typography marginTop='0.5em' color='gray' variant="caption">Published date {formatDate(publishDate)}</Typography>
          </Box>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {
              images !== undefined ? (
                <CardMedia
                  component="img"
                  sx={{ width: '16em', height: '8em' }}
                  image={process.env.REACT_APP_API_URL + images}
                  alt={process.env.REACT_APP_API_URL + images}
                />
              ) : (
                <p style={{ padding: '3px' }}>NO IMAGE</p>
              )
            }
          </div>

        </Box>
      </CardContent>

    </Card>
  )
}

export default CardComponent;