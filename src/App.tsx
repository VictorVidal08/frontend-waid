import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SocialPosts from './pages/SocialPosts';
import UsersList from './components/usersList';
import Posts from './components/posts';
import CreatePost from './components/createPost';
import UpdatePost from './components/updatePost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/update-post/:id" element={<UpdatePost />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users-list" element={<UsersList />} />
        <Route path="/social-posts" element={<SocialPosts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
