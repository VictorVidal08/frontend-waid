import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPost } from "../interfaces/IPost";
import { deletePost, getPosts } from "../services/Requests";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (posts.length > 0) {
            setLoading(false);
        }
    }, [posts]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const token = userData.token;
        const fetchPosts = async () => {
            const response = await getPosts(token);
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    const handleDelete = async (id: string, postId: number) => {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const { token, id: userId } = userData;
        if (Number(id) !== userId) {
            alert('Você não pode deletar este post');
            return
        }
        await deletePost(postId, token);
        window.location.reload();
    };

    const handleUpdate = (id: string, postId: number) => {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = userData.id;
        if (Number(id) !== userId) {
            alert('Você não pode editar este post');
            return
        }
        navigate(`/update-post/${postId}`)
    ;}

    return (
        <Container component="main">
            <CssBaseline />
            <Box>
                <Typography component="h1" variant="h5">Posts</Typography>
                <Button
                    type="button"
                    onClick={() => navigate('/create-post')}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >Criar Post</Button>
                {loading ?
                    <p>Loading...</p>
                    : posts.map((post: IPost) => (
                        <Box key={post.id}
                            sx={{
                                border: '1px gray solid',
                                borderRadius: '5px',
                                padding: '5px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '5px'
                            }}
                        >
                            <p>{post.user.userName}</p>
                            <p>{post.title}</p>
                            <p>{post.content}</p>
                            <Box
                                sx={{
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    gap: '10px'
                                }}
                            >
                                <Button
                                    type="button"
                                    onClick={() => handleUpdate(post.user.id, post.id)}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => handleDelete(post.user.id, post.id)}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Excluir
                                </Button>
                            </Box>
                        </Box>
                    ))
                }
            </Box>
        </Container>
    );
}