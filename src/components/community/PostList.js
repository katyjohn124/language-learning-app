import React, { useState, useEffect } from 'react';
import Post from './Post';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        // TODO: Fetch posts from the API
        // Mock fetch call
        fetchPosts().then(data => {
            console.log(data);
            setPosts(data.posts);  // Update the state with the fetched posts
        }).catch(error => {
            console.error("Failed to fetch posts:", error);
            // Handle the error appropriately, maybe set some error state
        });
    }, []);


    const fetchPosts = async () => {
        try {
            // 确保URL匹配你的后端API端点
            const response = await fetch('/api/community/posts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            return data; // 确保这里的数据格式与你的后端返回的格式匹配
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    };

    return (
        <div className="post-list">
            {posts.map((post) => (
                <Post key={post.id} username={post.username} {...post} />
            ))}
        </div>
    );
};

export default PostList;
