import React from 'react';

const Blog = ({ posts }) => {
    return (
        <div>
            {posts.map((post, index) => (
                <div key={index}>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    {/* 此处可以添加链接到博客文章的逻辑 */}
                </div>
            ))}
        </div>
    );
};

export default Blog;
