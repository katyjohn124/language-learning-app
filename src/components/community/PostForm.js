import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        console.log('User on mount:', user);
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('User state at form submission:', user);

        if (!user || !user.id) {
            console.error('No user id available');
            return;
        }

        const postPayload = {
            user_id: user.id,
            title: title,
            content: content,
        };

        try {
            const response = await fetch('http://localhost:3001/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postPayload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setTitle('');
            setContent('');
            navigate('/discussionboard');
        } catch (error) {
            console.error('Failed to submit post:', error);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="post-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="标题"
                required
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="内容"
                required
            />
            <button type="submit">发布</button>
        </form>
    );
};

export default PostForm;
