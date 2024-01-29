import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post'; // 假设您有一个显示单个帖子的组件
import SortDropdown from './SortDropdown'; // 假设您有排序下拉组件

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [sortMethod, setSortMethod] = useState('popular'); // 默认排序方式

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`/api/posts?sort=${sortMethod}`);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [sortMethod]);

    return (
        <div>
            <SortDropdown onSortChange={setSortMethod} />
            {posts.map(post => (
                <Post key={post.id} {...post} />
            ))}
        </div>
    );
};

export default PostList;
