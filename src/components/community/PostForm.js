
import React, { useState } from 'react';

const PostForm = ({ onNewPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // TODO: Submit the new post to the backend API
        // onNewPost(newPost);
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">提交帖子</button>
        </form>
    );
};

export default PostForm;
