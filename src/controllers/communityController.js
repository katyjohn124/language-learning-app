// 这应该是您的数据库连接模块
const db = require('../../db');

// 获取所有帖子
exports.getAllPosts = (req, res) => {
    const sql = 'SELECT * FROM posts ORDER BY created_at DESC';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).send('Server error');
        }
        res.json({ posts: results });
    });
};

// 创建新帖子
exports.createPost = (req, res) => {
    const { user_id, title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send('Title and content are required');
    }
    const sql = 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)';
    db.query(sql, [user_id, title, content], (error, results) => {
        if (error) {
            return res.status(500).send('Server error');
        }
        res.status(201).json({ postId: results.insertId });
    });
};

// 获取特定帖子的所有评论
exports.getCommentsForPost = (req, res) => {
    const { postId } = req.params;
    const sql = 'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC';
    db.query(sql, [postId], (error, results) => {
        if (error) {
            return res.status(500).send('Server error');
        }
        res.json({ comments: results });
    });
};

// 创建评论
exports.createComment = (req, res) => {
    const { postId } = req.params;
    const { user_id, content } = req.body;
    if (!content) {
        return res.status(400).send('Content is required');
    }
    const sql = 'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)';
    db.query(sql, [postId, user_id, content], (error, results) => {
        if (error) {
            return res.status(500).send('Server error');
        }
        res.status(201).json({ commentId: results.insertId });
    });
};
