import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    let navigate = useNavigate();

    const navigateToPostForm = () => {
        navigate('/create-post'); // Replace with your actual route
    };

    return (
        <button onClick={navigateToPostForm} className="create-post-button">
            创建帖子
        </button>
    );
};

export default CreatePost;
