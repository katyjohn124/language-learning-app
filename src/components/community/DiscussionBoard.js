
import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import './discussion.css'



const DiscussionBoard = () => {
    return (
        <div className="discussion-board">
            <h1 className="discussion-title">社区讨论板</h1>
            <PostForm />
            <PostList />
        </div>
    );
};

export default DiscussionBoard;
