
const db = require('../../db');
const commentsService = require('../services/commentsService');

// 获取所有帖子
exports.getAllPosts = (req, res) => {
    const sql = 'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).send('Server error');
        }
        res.json({ posts: results });
    });
};



// 点赞帖子数据
exports.likePost = (req, res) => {
    const postId = req.params.id;
    // Use the callback-based query function
    db.query('UPDATE posts SET likes = likes + 1 WHERE id = ?', [postId], (error, results, fields) => {
        if (error) {
            console.error('Error liking the post:', error);
            return res.status(500).json({ success: false, message: 'Error liking the post' });
        }
        // Check if any rows were updated
        if (results.affectedRows > 0) {
            res.json({ success: true, message: 'Post liked successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Post not found' });
        }
    });
};

// 取消点赞帖子
exports.unlikePost = (req, res) => {
    const postId = req.params.id;
    db.query('UPDATE posts SET likes = CASE WHEN likes > 0 THEN likes - 1 ELSE 0 END WHERE id = ?', [postId], (error, results) => {
        if (error) {
            console.error('Error unliking the post:', error);
            return res.status(500).json({ success: false, message: 'Error unliking the post' });
        }
        if (results.affectedRows > 0) {
            res.json({ success: true, message: 'Post unliked successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Post not found' });
        }
    });
};





// exports.addComment = (req, res) => {
//     console.log('Request parameters:', req.params);
//     console.log('Request body:', req.body);
//     const { postId } = req.params;
//     const { userId, content } = req.body;

//     //确保传递给 insertComment 的 postId 不是 undefined 或 null
//     if (!postId) {
//         return res.status(400).send('Post ID is required');
//     }

//     commentsService.insertComment(postId, userId, content, (error, results) => {
//         if (error) {
//             console.error('Error submitting comment:', error);
//             return res.status(500).send('Error submitting comment');
//         }
//         const newCommentId = results.insertId;
//         res.status(201).json({ id: newCommentId, content, userId, postId });
//     });
// };




// exports.getAllCommentsForPost = (req, res) => {
//     const { postId } = req.params;

//     commentsService.fetchCommentsByPostId(postId, (error, results) => {
//         if (error) {
//             console.error('Error retrieving comments:', error);
//             return res.status(500).send('Error retrieving comments');
//         }
//         res.json({ comments: results });
//     });
// };

exports.addComment = (req, res) => {
    console.log('Request parameters:', req.params);
    console.log('Request body:', req.body);
    const { postId } = req.params;
    const { userId, content } = req.body;

    if (!postId) {
        return res.status(400).send('Post ID is required');
    }

    // Create a comment data object
    const commentData = { postId, userId, content };

    commentsService.insertComment(commentData, (error, comment) => {
        if (error) {
            console.error('Error submitting comment:', error);
            return res.status(500).send('Error submitting comment');
        }
        // If no error, the comment object includes all necessary data
        res.status(201).json(comment);
    });
};



exports.getAllCommentsForPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await commentsService.fetchCommentsByPostId(postId);
        res.json({ comments });
    } catch (error) {
        res.status(500).send('Error retrieving comments');
    }
};


// 点赞评论
exports.likeComment = async (req, res) => {
    try {
        const { id: commentId } = req.params;
        const userId = req.user.id; // Assuming you extract user id from the token

        const likeCount = await CommentService.addLikeToComment(commentId, userId);

        res.status(200).json({
            success: true,
            liked: true,
            likeCount: likeCount
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 取消点赞评论
exports.unlikeComment = async (req, res) => {
    try {
        const { id: commentId } = req.params;
        const userId = req.user.id; // Assuming you extract user id from the token

        const likeCount = await CommentService.removeLikeFromComment(commentId, userId);

        res.status(200).json({
            success: true,
            liked: false,
            likeCount: likeCount
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};












// 创建新帖子
// exports.createPost = (req, res) => {
//     const { user_id, title, content } = req.body;
//     if (!title || !content) {
//         return res.status(400).send('Title and content are required');
//     }
//     const sql = 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)';
//     db.query(sql, [user_id, title, content], (error, results) => {
//         if (error) {
//             return res.status(500).send('Server error');
//         }
//         res.status(201).json({ postId: results.insertId });
//     });
// };

// // 获取特定帖子的所有评论
// exports.getCommentsForPost = (req, res) => {
//     const { postId } = req.params;
//     const sql = 'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC';
//     db.query(sql, [postId], (error, results) => {
//         if (error) {
//             return res.status(500).send('Server error');
//         }
//         res.json({ comments: results });
//     });
// };

// // 创建评论
// exports.createComment = (req, res) => {
//     const { postId } = req.params;
//     const { user_id, content } = req.body;
//     if (!content) {
//         return res.status(400).send('Content is required');
//     }
//     const sql = 'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)';
//     db.query(sql, [postId, user_id, content], (error, results) => {
//         if (error) {
//             return res.status(500).send('Server error');
//         }
//         res.status(201).json({ commentId: results.insertId });
//     });
// };