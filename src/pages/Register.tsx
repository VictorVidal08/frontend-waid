import React, { useEffect, useState } from "react";
import { register } from "../services/Requests";
import { IRegister } from "../interfaces/IRegister";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Register() {

  const theme = createTheme();
  const navigate = useNavigate();

  const [userName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [enable, setEnable] = useState(true);

  useEffect(() => {
    const MIN_NAME_LENGTH = 3;
    const MIN_PASSWORD_LENGTH = 6;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (
      userName.length >= MIN_NAME_LENGTH
      && email.match(regex)
      && password.length >= MIN_PASSWORD_LENGTH
    ) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [userName, email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { email, password, userName, image }
    const user = await register(userData as IRegister);
    const { token } = user.data;
    const userRegister = { email, userName, image, token }
    console.log('REGISTRO', userRegister);
    localStorage.setItem('user', JSON.stringify(userRegister));
    navigate('/social-posts');
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
          <Typography component="h1" variant="h2">Register</Typography>
          <Box component="form"
            noValidate sx={{ mt: 1 }}
            onSubmit={(e) => handleSubmit(e)}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={userName}
              onChange={({ target }) => setName(target.value)}
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
              autoComplete="name"
            />
            <TextField
              value={image}
              onChange={({ target }) => setImage(target.value)}
              margin="normal"
              fullWidth
              name="image"
              label="Image URL (optional)"
              type="text"
              id="image"
              autoComplete="image"
            />
            <TextField
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password (min 6 characters)"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              disabled={enable}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}