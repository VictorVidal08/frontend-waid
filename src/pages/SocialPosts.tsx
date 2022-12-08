import React from "react";
import Posts from "../components/posts";
import UsersList from "../components/usersList";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function SocialPosts() {

    const genericImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    const { email, userName, image } = JSON.parse(localStorage.getItem('user') || '{}');
    let userImage = image;
    if (!image || image.length < 6) {
        userImage = genericImage;
    }

    return (
        <Container component="main">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: 'green',
                }}>
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'red',
                    }}
                >
                    <Typography component="h1" variant="h2">SocialPosts</Typography>
                    Olá {userName}!! bem vindo ao SocialPosts!!
                    Você está logado com o email: {email}
                    <img
                        style={{ width: '100px', height: '100px' }}
                        src={userImage} alt={userName} />
                </Box>
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            backgroundColor: 'grey',
                        }}
                    >
                        <UsersList />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            backgroundColor: 'blue',
                        }}
                    >
                        <Posts />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}