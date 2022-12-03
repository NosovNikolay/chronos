import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant='h1'>404</Typography>
            <Typography variant='h6'>The page you’re looking for doesn’t exist.</Typography>
            <Link to='/calendar'>
              <Button variant='contained'>Back to Dashboard</Button>
            </Link>
          </Grid>
          <Grid xs={6}>
            <img
              src='https://cdn.pixabay.com/photo/2020/12/30/01/45/smile-5872116_1280.png'
              alt=''
              width={250}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
