
import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm'; // 假设您有一个提交新帖子的表单组件

const DiscussionBoard = () => {
    return (
        <div>
            <h1>社区讨论板</h1>
            <PostForm />
            <PostList />
        </div>
    );
};

export default DiscussionBoard;
