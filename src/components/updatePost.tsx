import React, { useState, useEffect } from "react";
import { IPost } from "../interfaces/IPost";
import { useNavigate } from "react-router-dom";
import { getPosts, updatePost } from "../services/Requests";

export default function UpdatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const postId = Number(window.location.pathname.split('/')[2]);

  useEffect(() => {
    const getPostById = async() => {
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

  const handleUpdate = async() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const token = userData.token
    const updateData = { postId, title, content, token };
    await updatePost(updateData);
    navigate('/social-posts');
  };

  return (
    <div>
      <h1>Update Post</h1>
      <form>
        <label>
            Title:
            <input
            type="text"
            name="title"
            placeholder="Edit Title"
            value={ title }
            onChange={e => setTitle(e.target.value)}
            />
        </label>
        <label>
            Content:
            <input
            type="text"
            name="content"
            placeholder="Edit Content"
            value={ content }
            onChange={e => setContent(e.target.value)}
            />
        </label>
        <button
        type="button"
        onClick={ handleUpdate }
        >
            OK
        </button>
        <button
        type="button"
        >
          Voltar
        </button>
      </form>
    </div>
  );
}