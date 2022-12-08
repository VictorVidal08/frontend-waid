import React, { useEffect, useState } from "react";
import { register } from "../services/Requests";
import { IRegister } from "../interfaces/IRegister";
import { useNavigate } from "react-router-dom";

export default function Register() {

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
        const userData = {email, password, userName, image}
        const user = await register(userData as IRegister);
        const { token } = user.data;
        const userRegister = {email, userName, image, token}
        console.log('REGISTRO', userRegister);
        localStorage.setItem('user', JSON.stringify(userRegister));
        navigate('/social-posts');
    };

    return (
        <div>
        <h1>Register</h1>
        <form
            onSubmit={ (e) => handleSubmit(e) }
        >
            <label>
                Email:
                <input
                placeholder="Email"
                type="text" 
                name="email"
                value={ email }
                onChange={ ({ target }) => setEmail(target.value) }
                />
            </label>
            <label>
                Name:
                <input
                type="text"
                name="name"
                placeholder="userName"
                value={ userName }
                onChange={ ({ target }) => setName(target.value) }
                />
            </label>
            <label>
                Profile Image (optional):
                <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={ image }
                onChange={ ({ target }) => setImage(target.value) }
                />
            </label>
            <label>
                Password:
                <input
                placeholder="Password"
                type="password"
                name="password"
                value={ password }
                onChange={ ({ target }) => setPassword(target.value) }
                />
            </label>
            <button
            type="submit"
            disabled={ enable }
            >
                Register
            </button>
        </form>
        </div>
    );
}