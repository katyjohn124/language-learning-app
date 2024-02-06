const db = require('../../db');

// exports.insertComment = (postId, userId, content, callback) => {
//     const sql = 'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)';
//     db.query(sql, [postId, userId, content], callback);
// };

exports.insertComment = (commentData, callback) => {
    const { postId, userId, content } = commentData;
    const sql = 'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)';
    db.query(sql, [postId, userId, content], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        const newCommentId = results.insertId;
        // Now, retrieve the username and other needed information to return
        const userSql = 'SELECT username FROM users WHERE id = ?';
        db.query(userSql, [userId], (userError, userResults) => {
            if (userError) {
                return callback(userError, null);
            }
            // Assuming the username is retrieved successfully
            const username = userResults[0].username;
            // Construct the comment object to return
            const comment = {
                id: newCommentId,
                content,
                userId,
                postId,
                username,
                like_count: 0, // Assuming you will add this field
                created_at: new Date().toISOString()
            };
            callback(null, comment);
        });
    });
};

// exports.fetchCommentsByPostId = (postId, callback) => {
//     const sql = 'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC';
//     db.query(sql, [postId], callback);
// };

exports.fetchCommentsByPostId = (postId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT comments.*, users.username, 
                     DATE_FORMAT(comments.created_at, '%Y-%m-%d %H:%i:%s') as formatted_date 
                     FROM comments 
                     JOIN users ON comments.user_id = users.id 
                     WHERE post_id = ? 
                     ORDER BY created_at DESC`;
        db.query(sql, [postId], (error, results) => {
            if (error) {
                return reject(error);
            }
            // Assume a like_count column exists or default to 0
            const formattedComments = results.map(comment => ({
                ...comment,
                like_count: comment.like_count || 0
            }));
            resolve(formattedComments);
        });
    });
};
