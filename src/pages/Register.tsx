import React from "react";

export default function Register() {

    return (
        <div>
        <h1>Register</h1>
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
                placeholder="Password"
                type="password"
                name="password"
                />
            </label>
            <button
            type="button"
            >
                Register
            </button>
        </form>
        </div>
    );
}