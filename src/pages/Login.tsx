import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ILogin } from "../interfaces/ILogin";
import { login } from '../services/Requests';

export default function Login() {
    const [formLogin, setFormLogin] = useState({ email:'', password:'' });
    const [enable, setEnable] = useState(true);

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
        <div>
        <h1>Login</h1>
        <form>
            <label>
                Email:
                <input
                placeholder="Email"
                type="email" 
                name="email"
                value={ formLogin.email }
                onChange={ ({ target }) => setFormLogin({ ...formLogin, email: target.value }) }
                />
            </label>
            <label>
                Password:
                <input
                placeholder="******"
                type="password"
                name="password"
                value={ formLogin.password }
                onChange={ ({ target }) => setFormLogin({ ...formLogin, password: target.value }) }
                />
            </label>
            <button
            disabled={ enable }
            type="button"
            onClick={ handleLogin }
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