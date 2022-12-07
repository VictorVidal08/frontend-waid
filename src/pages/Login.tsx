import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();
    return (
        <div>
        <h1>Login</h1>
        <form>
            <label>
                Email:
                <input
                placeholder="Email"
                type="text" 
                name="email"
                />
            </label>
            <label>
                Password:
                <input
                placeholder="******"
                type="password"
                name="password"
                />
            </label>
            <button
            type="button"
            onClick={ () => navigate('/social-posts')}
            >
                Login
            </button>
            <button
            type="button"
            onClick={ () => navigate('/register')}
            >
                Registrar
            </button>
        </form>
        </div>
    );
}