import React from 'react';
import CreatePost from './CreatePost';
import PostList from './PostList';
import './discussion.css';


const DiscussionBoard = () => {
    return (
        <div className="discussion-board">
            <h1 className="discussion-title">社区讨论板</h1>
            <div className="create-post-button">
                <CreatePost />
            </div>
            <PostList />
        </div>
    );
};

export default DiscussionBoard;

