import React from 'react';

const Post = ({ id, user_id, title, content, likes, comments, shares }) => {


    return (
        <div className="post">
            <h3>{title}</h3>
            <p>{content.substring(0, 100)}...</p>
            <div className="post-interactions">
                <span>Likes: {likes}</span>
                <span>Comments: {comments}</span>
                <span>Shares: {shares}</span>
            </div>
        </div>
    );
};

export default Post;
