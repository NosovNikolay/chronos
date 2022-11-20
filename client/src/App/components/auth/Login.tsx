import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../styles/auth.scss';
import { useState } from 'react';

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [responseError, setResponceError] = useState('');
  const loginSchema = Yup.object({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required').min(8),
  });

  const { handleSubmit, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (data) => {
      // types errors
      const result = await login(data.email, data.password);
      // bad types + bad condition
      if (result.status === 201) {
        // mock token for now, then will receive it from api
        localStorage.setItem('auth', '123');
        navigate('/dashboard');
      } else {
        setResponceError(result.message);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Log In
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
                {touched.email ? <div className='errorInputLog'>{errors.email}</div> : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
                {touched.password ? <div className='errorInputLog'>{errors.password}</div> : null}
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Log In
            </Button>
            {responseError ? <div className='errorInputLog'>{responseError}</div> : null}
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='#' variant='body2'>
                  Forgot the password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
