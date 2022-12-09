import React, { useState, useEffect } from "react";
import { getUsers } from '../services/Requests';
import { IUser } from "../interfaces/IUser";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (users.length > 0) {
            setLoading(false);
        }
    }, [users]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const token = userData.token;
        const fetchUsers = async () => {
            const response = await getUsers(token);
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    return (
        <Container component="main">
            <CssBaseline />
            <Box>
                <Typography component="h1" variant="h5">UsersList</Typography>
                {loading ?
                    <p>Loading...</p>
                    : users.map((user: IUser) => (
                        <Box key={user.id}
                            sx={{
                                border: '1px gray solid',
                                padding: '5px',
                                borderRadius: '5px',
                                margin: '5px'
                            }}
                        >
                            <p>{user.userName}</p>
                            <p>{user.email}</p>
                        </Box>
                    ))
                }
            </Box>
        </Container>
    );
}