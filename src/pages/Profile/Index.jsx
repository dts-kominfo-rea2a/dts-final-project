import { Box, Card, Container, Typography } from "@mui/material"
import { useEffect } from "react"
import { useGetMeQuery } from "../../services/authService"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const ProfileIndex = () => {

  const { data, isSuccess, isLoading, error } = useGetMeQuery()

  useEffect(() => {
    window.document.title = ' -- Profile'
  }, [])

  return (
    <Container>
      <Box>
        <Card>
          <div>
            {error && <p>an error occured</p>}
            {isLoading && <p>Loading...</p>}
          </div>
          {
            isSuccess && (
              <Box sx={{ padding: '1em 3em' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2em' }}>
                  <Stack>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 86, height: 86 }}
                    />
                  </Stack>
                  <Box>
                  <Typography variant="h4">
                    {data.username}
                  </Typography>
                  <Typography>
                    {data.email}
                  </Typography>

                  </Box>
                </Box>

                <Typography>
                  {data.username}
                </Typography>
              </Box>
            )
          }
        </Card>
      </Box>
    </Container>
  )
}
export default ProfileIndex