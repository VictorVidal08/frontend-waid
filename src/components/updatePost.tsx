import React, { useState, useEffect } from "react";
import { IPost } from "../interfaces/IPost";
import { useNavigate } from "react-router-dom";
import { getPosts, updatePost } from "../services/Requests";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function UpdatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const postId = Number(window.location.pathname.split('/')[2]);

  useEffect(() => {
    const getPostById = async () => {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const token = userData.token
      const allPosts = await getPosts(token);
      const toUpdatePost = allPosts.data.find((post: IPost) => post.id === postId);
      setTitle(toUpdatePost.title);
      setContent(toUpdatePost.content);
    };
    getPostById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const token = userData.token
    const updateData = { postId, title, content, token };
    await updatePost(updateData);
    navigate('/social-posts');
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{ maxWidth: 450, margin: 'auto', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography component="h1" variant="h2">Update Post</Typography>
        <Box component="form"
          noValidate sx={{ mt: 1 }}
        >
          <TextField
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoComplete="title"
            autoFocus
            margin="normal"
            required
            fullWidth
            id="Title"
            label="Title:"
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
              onClick={handleUpdate}
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
    </Container >
  );
}