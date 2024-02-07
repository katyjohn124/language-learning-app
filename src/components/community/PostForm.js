import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        console.log('User on mount:', user);
    }, [user]);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('file', image);

        const response = await fetch('http://localhost:3001/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image.');
        }

        const data = await response.json();
        return data.imageUrl; // Assuming the response contains the image URL in this field
    };



    const detectLinks = (text) => {
        // Use regex to detect URLs in the text and replace them with anchor tags
        // This is a simplistic example and might not cover all URL patterns
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('User state at form submission:', user);

        if (!user || !user.id) {
            console.error('No user id available');
            return;
        }

        let imageUrl = '';
        if (image) {
            imageUrl = await uploadImage(); // You need to implement this function
        }


        const postPayload = {
            user_id: user.id,
            title: title,
            content: content,
            image: imageUrl, // Add the image URL to your payload
            content: detectLinks(content), // Process content for link detection
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
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {imagePreview && (
                <img src={imagePreview} alt="Preview" className="image-preview" />
            )}
            <button type="submit">发布</button>
        </form>
    );
};

export default PostForm;
