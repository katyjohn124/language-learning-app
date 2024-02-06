import React, { useState, useEffect } from 'react';
import styles from './Comment.module.css';

const Comment = ({ comment, user }) => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(comment.likes);

    useEffect(() => {
        // Ensure that `userLikes` is an array before calling `includes`
        const hasLiked = Array.isArray(comment.userLikes) && comment.userLikes.includes(user.id);
        setLiked(hasLiked);
    }, [comment, user]);

    const toggleLike = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        const method = liked ? 'DELETE' : 'POST';
        try {
            const response = await fetch(`http://localhost:3001/api/comments/${comment.id}/like`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to toggle like');
            }

            const result = await response.json();
            if (result.liked !== undefined) { // Ensure 'liked' is actually returned from the server
                setLiked(result.liked);
            } else {
                console.error('Liked status is undefined in the response');
            }
            setLikesCount(result.totalLikes);
            // Additional logging to help with debugging
            console.log('Like status:', result.liked);
            console.log('Total likes:', result.totalLikes);
        } catch (error) {
            console.error('Error toggling like on comment:', error);
        }
    };



    // 格式化评论时间
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <div className={styles.comment}>
            <div className={styles.commentHeader}>
                <span className={styles.username}>by{comment.username}</span>
                <span className={styles.timestamp}>{formatDate(comment.created_at)}</span>
            </div>
            <p className={styles.content}>{comment.content}</p>
            <div className={styles.commentFooter}>
                <button className={styles.likeButton} onClick={toggleLike}>
                    <i className={`iconfont icon-dianzan ${liked ? styles.liked : ''}`} />
                    {likesCount}
                </button>
            </div>
        </div>
    );
};


export default Comment