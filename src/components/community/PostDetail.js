import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment'
import styles from './postdetail.module.css'
import '../community/iconfont.css'
import { useAuth } from '../../contexts/AuthContext';

const PostDetail = () => {
    const { id } = useParams();
    const { user } = useAuth(); // 使用 useAuth hook 获取当前登录用户
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                // Fetch post details
                const postResponse = await fetch(`/api/community/posts/${id}`);
                if (!postResponse.ok) {
                    throw new Error('Post not found');
                }
                const postData = await postResponse.json();
                setPost(postData.post); // 修改这里，确保只设置post对象

                // Fetch comments for the post
                const commentsResponse = await fetch(`/api/community/posts/${id}/comments`);
                if (!commentsResponse.ok) {
                    throw new Error('Comments not found');
                }
                const commentsData = await commentsResponse.json();
                setComments(commentsData.comments); // 这里假设comments是数组
            } catch (error) {
                console.error('Failed to fetch post or comments:', error);
            }
        };

        if (id) {
            fetchPostAndComments();
        }
    }, [id]);

    // 添加一个处理输入变化的函数
    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    // 添加一个处理评论提交的函数
    const submitComment = async () => {
        if (!commentText.trim()) {
            // 如果评论是空的，或者只包含空格，不做任何操作
            return;
        }

        // 从 localStorage 获取 token
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            // 发送POST请求到后端，提交新评论
            const response = await fetch(`http://localhost:3001/api/community/posts/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // 添加Bearer token认证
                },
                body: JSON.stringify({
                    userId: user.id, // 从上下文获取用户ID
                    content: commentText // 评论文本
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }

            const newComment = await response.json();

            // 将新评论添加到评论列表的状态中
            setComments(prevComments => [{
                ...newComment,
                username: user.username, // assuming 'user' has the username
                like_count: 0, // Initialize like count for the new comment
                created_at: formatDate(newComment.created_at), // Format the date for display
            }, ...prevComments]);


            setCommentText(''); // 清空输入框
        } catch (error) {
            console.error('Failed to submit comment:', error);
        }



    };


    return (
        <div className={styles.container}> {/* 使用模块化样式 */}
            {post && (
                <div className={styles.postContent}> {/* 修改这里，使用模块化样式 */}
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <div className={styles.commentsHeader}> {/* 修改这里，使用模块化样式 */}
                        <span className={styles.commentIcon}>
                            <i className="iconfont icon-pinglun" />
                            Comments: {post.comments_count}
                        </span>
                        <span className={styles.shareIcon}>
                            <i className="iconfont icon-fenxiang" />
                            Shares: {post.shares}
                        </span>
                    </div>
                </div>
            )}

            <div className={styles.commentBox}> {/* 修改这里，使用模块化样式 */}
                <textarea
                    className={styles.textarea}
                    placeholder="What are your thoughts?"
                    value={commentText}
                    onChange={handleCommentChange} // 绑定处理函数
                />
                <button onClick={submitComment}>Comment</button>
            </div>

            <div className={styles.commentList}> {/* 修改这里，使用模块化样式 */}
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default PostDetail;
