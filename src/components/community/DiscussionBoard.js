import React from 'react';
import CreatePost from './CreatePost';
import PostList from './PostList';
import SortDropdown from './SortDropdown';
import './discussion.css';


const DiscussionBoard = () => {
    return (
        <div className="discussion-board">
            <h1 className="discussion-title">社区讨论板</h1>
            <CreatePost />
            <SortDropdown />
            <PostList />
        </div>
    );
};

export default DiscussionBoard;

