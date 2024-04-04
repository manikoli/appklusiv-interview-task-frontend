import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

function Home(): React.ReactElement {
  const user: any = JSON.parse(localStorage.getItem('user') ?? '{}')
  const userExists = user.name !== undefined

  return (
    <Container sx={styles.container}>
      {userExists && <Typography variant='h2'>Hello, {user.name}!</Typography>}
      {!userExists && (
        <Typography variant='h2'>
          Hello, you need to <Link to={'/'}>log in</Link>.
        </Typography>
      )}
    </Container>
  )
}

const styles = {
  container: {
    marginTop: '100px',
    marginLeft: '20px',
  },
}

export default Home
