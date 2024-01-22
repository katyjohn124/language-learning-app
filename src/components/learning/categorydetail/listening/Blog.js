import React from 'react'

const Blog = ({ posts }) => {
    return (
        <div>
            {posts.map((post, index) => (
                <div key={index}>
                    <h5>{post.title}</h5>
                    <p>{post.excerpt}</p>
                </div>
            ))}

        </div>
    )
}

export default Blog
