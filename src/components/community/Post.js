import React from 'react';

const Post = ({ id, title, summary, likes, comments, shares }) => {
    return (
        <div className="post">
            <h3>{title}</h3>
            <p>{summary}</p>
            {/* 这里您可以添加点赞、评论、转发的图标和数量 */}
            <span>Likes: {likes}</span>
            <span>Comments: {comments}</span>
            <span>Shares: {shares}</span>
            {/* 详情按钮或链接 */}
        </div>
    );
};

export default Post;
