const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

// 获取所有帖子
router.get('/posts', communityController.getAllPosts);



// 添加评论
router.post('/posts/:postId/comments', communityController.addComment);

// 获取帖子的所有评论
router.get('/posts/:postId/comments', communityController.getAllCommentsForPost);


//点赞帖子数据
router.post('/posts/:id/like', communityController.likePost);

// 取消点赞路由
router.delete('/posts/:id/like', communityController.unlikePost);

// 点赞评论路由
router.post('/comments/:id/like', communityController.likeComment);

// 取消点赞评论路由
router.delete('/comments/:id/like', communityController.unlikeComment);




module.exports = router;
