import React, { useState } from "react";
import { ICreate } from "../interfaces/ICreate";
import { createPost } from "../services/Requests";
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleCreate = async () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const token = userData.token;
    const userId = userData.id;
    const createData: ICreate = { title, content, userId, token }
    await createPost(createData);
    navigate('/social-posts');
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{ maxWidth: 450, margin: 'auto', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography component="h1" variant="h2">Create Post</Typography>
        <Box component="form"
          noValidate sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="Title"
            label="Title:"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={content}
            onChange={e => setContent(e.target.value)}
            autoComplete="content"
            autoFocus
            margin="normal"
            required
            fullWidth
            id="Content"
            label="Content:"
          />
          <Box
            sx={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <Button
              type="button"
              onClick={handleCreate}
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '100px' }}
            >
              OK
            </Button>
            <Button
              type="button"
              onClick={() => navigate('/social-posts')}
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '100px' }}
            >
              Voltar
            </Button>
          </Box>

        </Box>
      </Box>
    </Container>
  );
}