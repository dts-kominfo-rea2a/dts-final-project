import { Box } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import CardDetailPosts from "../../components/CardDetailPost"
import { useGetPostsByIDQuery } from "../../services/postsService"

const DetailPosts = () => {
  const { id } = useParams()
  const { data, error, isLoading } = useGetPostsByIDQuery(id)
  useEffect(() => {
    window.document.title = data?.title
  })


  if (isLoading) {
    return <Container sx={{ padding: '3em 4em'}}>Loading...</Container>;
  }
  if (error) {
    return <Container sx={{ padding: '3em 4em'}}>Oops, an error occured</Container>;
  }

  return (
    <Container >
      <Box sx={{
        padding: '3em 2em'
      }}>

        <CardDetailPosts
          title={data.title}
          publishDate={data.created_at}
          images={data.postPicture?.url}
          description={data.content}
          username={data.author[0].username}
        />
      </Box>
    </Container>
  )
}

export default DetailPosts;