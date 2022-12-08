import React, { useState } from "react";
import { ICreate } from "../interfaces/ICreate";
import { createPost } from "../services/Requests";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const handleCreate = async() => {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('USERDATA', userData);
        const token = userData.token;
        const userId = userData.id;
        const createData: ICreate = { title, content, userId, token }
        await createPost(createData);
        navigate('/social-posts');
    };

  return (
    <div>
      <h1>Create Post</h1>
      <form>
        <label>
            Title:
            <input 
            type="text"
            name="title"
            placeholder="New Title"
            value={ title }
            onChange={e => setTitle(e.target.value)}
            />
        </label>
        <label>
            Content:
            <input
            type="text"
            name="content"
            placeholder="New Content"
            value={ content }
            onChange={e => setContent(e.target.value)}
            />
        </label>
        <button
        type="button"
        onClick={ handleCreate }
        >
            OK
        </button>
        <button
        type="button"
        onClick={ () => navigate('/social-posts') }
        >
          Voltar
        </button>
      </form>
    </div>
  );
}