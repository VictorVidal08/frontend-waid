import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPost } from "../interfaces/IPost";
import { getPosts } from "../services/Requests";

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
        const token = userData.token
        const fetchPosts = async () => {
            const response = await getPosts(token);
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            <button
            type="button"
            onClick={ () => navigate('/create-post') }
            >Criar Post</button>

            { loading ?
                <p>Loading...</p>
                : posts.map((post: IPost) => (
                    <div key={post.id}>
                        <p>{post.user.userName}</p>
                        <p>{post.title}</p>
                        <p>{post.content}</p>
                        <button
                        type="button"
                        onClick={ () => navigate(`/update-post/${post.id}`) }
                        >
                            Editar
                        </button>
                        <button
                        type="button"
                        >
                            Excluir
                        </button>
                    </div>
                ))
            }
        </div>
    );
}