import React, { useState, useEffect } from "react";
import { getUsers } from '../services/Requests';
import { IUser } from "../interfaces/IUser";

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
        console.log(token);
        const fetchUsers = async () => {
        const response = await getUsers(token);
        setUsers(response.data);
        };
        fetchUsers();
    }, []);

    return (
        <div>
        <h1>UsersList</h1>
        { loading ?
            <p>Loading...</p>
            : users.map((user: IUser) => (
                <div key={user.id}>
                    <p>{user.userName}</p>
                    <p>{user.email}</p>
                </div>
            ))
        }
        </div>
    );
}