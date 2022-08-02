import { Avatar, Box, Card, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom";

const CardDetailPosts = ({ title, description, images, href, username, publishDate }) => {
  return (
    <Card sx={{ padding: '2em 1em', margin: '0 auto', whiteSpace: 'pre-wrap', gap: '2em' }}>
      <Typography component="div" variant="h3" fontWeight={'medium'}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
        <Link to={'/profile/:id'} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row' }}>
          <Avatar sx={{ width: 24, height: 24, marginLeft: '2px', marginRight: '12px', }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Typography textTransform="none" color="gray" variant="subtitle1">{username}</Typography>
        </Link>

      </Box>
      <Typography color='gray' variant="caption">Published date {publishDate}</Typography>
      <CardMedia
        component="img"
        sx={{ width: '60%', height: '50%' }}
        image={process.env.REACT_APP_API_URL + images}
        alt={process.env.REACT_APP_API_URL + images}
      >
      </CardMedia>
      <Typography variant="body1">
        {description}
      </Typography>
    </Card>
  )
}

export default CardDetailPosts;