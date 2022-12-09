import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ILogin } from "../interfaces/ILogin";
import { login } from '../services/Requests';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Login() {
  const [formLogin, setFormLogin] = useState({ email: '', password: '' });
  const [enable, setEnable] = useState(true);

  const theme = createTheme();

  const navigate = useNavigate();

  useEffect(() => {
    const MIN_PASSWORD_LENGTH = 5;
    const regexEmail = /\S+@\S+\.\S+/;
    const validateEmail = regexEmail.test(formLogin.email);
    if (formLogin.password.length >= MIN_PASSWORD_LENGTH && validateEmail) {
      setEnable(false);
    }
    if (formLogin.password.length <= MIN_PASSWORD_LENGTH || !validateEmail) {
      setEnable(true);
    }
  }, [formLogin]);

  const handleLogin = async () => {
    try {
      const user = await login(formLogin as ILogin);
      console.log(user);
      const userData = user.data;
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/social-posts')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h2">Login</Typography>
          <Box component="form"
            noValidate sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              value={formLogin.email}
              onChange={({ target }) => setFormLogin({ ...formLogin, email: target.value })}
            />
            <TextField
              value={formLogin.password}
              onChange={({ target }) => setFormLogin({ ...formLogin, password: target.value })}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password (min 6 characters)"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Box
              sx={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
              <Button
                disabled={enable}
                type="button"
                onClick={handleLogin}
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '100px' }}
              >
                Login
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/register')}
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '100px' }}
              >
                Registrar
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}