import React, { useState, useEffect } from 'react';
import SortDropdown from './SortDropdown'
import Post from './Post';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [sortOrder, setSortOrder] = useState('new');


    useEffect(() => {
        fetchSortedPosts();
    }, [sortOrder]);


    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/community/posts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const fetchSortedPosts = async () => {
        const data = await fetchPosts();
        if (data && data.posts) {
            setPosts(sortPosts(data.posts, sortOrder));
        }
    };

    const sortPosts = (posts, sortOrder) => {
        if (sortOrder === 'hot') {
            return posts
                .filter(post => post.likes > 5)
                .sort((a, b) => (b.likes + b.comments_count) - (a.likes + a.comments_count));
        } else {
            return [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
    };


    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };


    return (
        <div>
            <SortDropdown onSortChange={handleSortChange} />
            <div className="post-list">
                {posts.map((post) => (
                    <Post key={post.id} username={post.username} {...post} />
                ))}
            </div>
        </div>
    );
};

export default PostList;
