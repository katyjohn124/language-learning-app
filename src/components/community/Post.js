import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../community/iconfont.css'

const Post = ({ id, username, title, content, likes, comments_count, shares, image }) => {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(likes);

    useEffect(() => {
        // TODO: Check if the post is already liked by the user
        // This might involve calling an API to check if the user has liked this post already
        // For now, we're setting it to false by default
        setLiked(false);
    }, [id]);

    useEffect(() => {
        console.log('Image prop:', image); // This will log the image URL every time it changes
    }, [image]);


    const likePost = async (e) => {
        e.preventDefault(); // 防止事件冒泡
        const method = liked ? 'DELETE' : 'POST'; // 如果已经点赞了，就发送取消点赞的请求

        try {
            const response = await fetch(`http://localhost:3001/api/community/posts/${id}/like`, {
                method: method,
                // Other headers and body if needed
            });
            if (response.ok) {
                console.log('Post liked successfully');
                // Toggle the liked state and update the likes count
                setLiked(!liked);
                setLikesCount(likesCount => liked ? likesCount - 1 : likesCount + 1);
            } else {
                throw new Error('Failed to like the post');
            }
        } catch (error) {
            console.error('Error in liking the post:', error);
        }
    };

    const sharePost = () => {
        // For simplicity, let's just log a message
        console.log('Post shared');
        // Here you would handle the actual sharing logic
    };

    const goToPostDetail = () => {
        navigate(`/posts/${id}/post-detail`);
    };

    return (
        <div className="post" onClick={goToPostDetail}>
            <h3>{title} <span>by {username}</span></h3>

            {/* <img src="http://localhost:3001/images/your-test-image.jpg" alt="Test" /> */}
            <p>{content.substring(0, 100)}...</p>
            {image && <img src={image} alt="Post" className="post-image" />}

            <div className="post-interactions" onClick={e => e.stopPropagation()}>
                <span onClick={likePost}>
                    <i className={`iconfont icon-aixin ${liked ? 'liked' : ''}`} />
                    Likes: {likesCount}
                </span>
                <span>
                    <i className="iconfont icon-pinglun" />
                    Comments: {comments_count}
                </span>
                <span onClick={sharePost}>
                    <i className="iconfont icon-fenxiang" />
                    Shares: {shares}
                </span>
            </div>
        </div>
    );
};

export default Post;
