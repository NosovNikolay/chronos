import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { env } from '../../config/env';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const loginSchema = Yup.object({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required').min(8),
    repeatPassword: Yup.string().required('Required').min(8),
    login: Yup.string().required('Required'),
  });

  const { handleSubmit, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
      login: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (data) => {
      if (data.password !== data.repeatPassword) {
        toast.error('Password should match');
        return;
      }

      axios
        .post(`${env.VITE_APP_API}/sign-up`, {
          email: data.email,
          password: data.password,
          username: data.login,
        })
        .then(() => {
          navigate('/login');
          toast.success('Account succsessfully created');
        })
        .catch(() => {
          toast.error('Oops sometheng went wrong');
        });
    },
  });
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

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
            Sign up
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='given-name'
                  name='login'
                  required
                  fullWidth
                  id='firstName'
                  label='Login'
                  autoFocus
                />
                {touched.login ? <div className='errorInputLog'>{errors.email}</div> : null}
              </Grid>
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  name='repeatPassword'
                  label='Repeat password'
                  type='password'
                  id='reapeat-password'
                  autoComplete='new-password'
                />
                {touched.email ? <div className='errorInputLog'>{errors.email}</div> : null}
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
