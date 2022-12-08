import React from "react";

export default function SocialPosts() {

    const genericImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    const {email, userName, image } = JSON.parse(localStorage.getItem('user') || '{}');
    let userImage = image;
    if (!image || image.length < 6) {
        userImage = genericImage;
    }

    return (
        <div>
            <h1>SocialPosts</h1>
            Olá {userName}!! bem vindo ao SocialPosts!!
            Você está logado com o email: {email}
            <img src={userImage} alt={userName} />
        </div>
    );
}