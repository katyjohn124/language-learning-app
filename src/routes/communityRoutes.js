const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

// 获取所有帖子
router.get('/posts', communityController.getAllPosts);

// 创建新帖子
// router.post('/posts', communityController.createPost);

// 获取特定帖子的评论
router.get('/posts/:postId/comments', communityController.getCommentsForPost);

// 创建评论
router.post('/posts/:postId/comments', communityController.createComment);

module.exports = router;
