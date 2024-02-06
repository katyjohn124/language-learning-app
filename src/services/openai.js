
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const nodemailer = require('nodemailer');
const db = require('../../db');
const authenticateToken = require('../controllers/authenticateToken');

const app = express();

// const corsOptions = {
//     origin: 'http://localhost:3000', // or your specific client origin
//     credentials: true, // to allow cookies to be sent with the request
// };

// app.use(cors(corsOptions));

//引入身份验证、社区路由
const authRoutes = require('../routes/authRoutes');
const communityRoutes = require('../routes/communityRoutes');

app.use(cors());
app.use(express.json());
// 将用户相关的路由挂载到/api路径下
app.use('/api', authRoutes);
app.use('/api/community', communityRoutes);


const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465, // SMTP SSL port
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_USERNAME, // Your QQ email address
        pass: process.env.EMAIL_PASSWORD // Your QQ authorization code
    }
});

// 获取帖子详情及其评论的API端点
app.get('/api/community/posts/:id', (req, res) => {
    const postId = req.params.id;

    // 查询帖子详情
    const postQuery = 'SELECT * FROM posts WHERE id = ?';
    db.query(postQuery, [postId], (postError, postResults) => {
        if (postError) {
            return res.status(500).json({ success: false, message: 'Error querying the post' });
        }

        if (postResults.length === 0) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // 查询帖子的评论
        const commentsQuery = 'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC';
        db.query(commentsQuery, [postId], (commentsError, commentsResults) => {
            if (commentsError) {
                return res.status(500).json({ success: false, message: 'Error querying the comments' });
            }

            // 返回帖子详情和评论
            res.json({
                success: true,
                post: postResults[0], // 帖子详情
                comments: commentsResults // 帖子的评论
            });
        });
    });
});

//邮箱反馈
app.post('/api/feedback', async (req, res) => {
    const { feedback, includeEmail, userEmail } = req.body;

    // Prepare the HTML content of the email
    const emailHtmlContent = `
        <p>You have received new feedback:</p>
        <p>${feedback}</p>
        ${includeEmail ? `<p>From: ${userEmail}</p>` : ''}
    `;

    // Configure the mail options
    const mailOptions = {
        from: process.env.EMAIL_USERNAME, // Your QQ email address
        to: process.env.EMAIL_USERNAME, // Where you want to receive the feedback
        subject: 'New Feedback Received', // Subject line
        text: feedback, // Plain text body
        html: emailHtmlContent, // HTML body
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Feedback sent successfully');
    } catch (error) {
        console.error('Error sending feedback email:', error);
        res.status(500).send('Error sending feedback');
    }
});

//创建新帖子
app.post('/api/posts', (req, res) => {
    const { user_id, title, content } = req.body;
    console.log(req.body);

    if (!user_id || !title || !content) {
        return res.status(400).send('User ID, title, and content are required');
    }

    const sql = 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)';
    db.query(sql, [user_id, title, content], (error, results) => {
        if (error) {
            console.error(error); // Log the error for debugging
            return res.status(500).send('Error creating new post');
        }
        res.status(201).json({ postId: results.insertId, message: 'New post created' });
    });
});


// // 获取帖子列表的路由
// app.get('/api/community/posts', async (req, res) => {
//     try {
//         // 使用MySQL查询
//         const [results] = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
//         res.json(results); // 直接返回查询结果，MySQL不需要像PostgreSQL那样访问 `.rows`
//     } catch (error) {
//         console.error('Error fetching posts:', error);
//         res.status(500).send('Server error');
//     }
// });



//调用chatgpt api
app.post('/api/openai', async (req, res) => {
    try {
        const { messages } = req.body;

        const response = await axios.post('https://oneapi.xty.app/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: messages
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        console.log('Custom API response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error sending message to custom API:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
            res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error(error.request);
            res.status(500).json({ message: 'No response received from API' });
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
            res.status(500).json({ message: error.message });
        }
    }
});


// Route to handle liking a comment
app.post('/api/comments/:id/like', authenticateToken, (req, res) => {
    console.log(req.params);
    console.log(req.user);
    const commentId = req.params.id;
    const userId = req.user.id;
    console.log(req.params);
    console.log(req.user);

    // First, check if the user has already liked the comment
    const checkLikeQuery = 'SELECT * FROM comment_likes WHERE comment_id = ? AND user_id = ?';
    db.query(checkLikeQuery, [commentId, userId], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error checking existing likes:', checkErr);
            return res.status(500).json({ message: 'Error checking existing likes' });
        }

        if (checkResults.length > 0) {
            // The user has already liked the comment
            return res.status(409).json({ message: 'User has already liked this comment' });
        }

        // The user has not liked the comment yet, proceed to insert like
        const insertLikeQuery = 'INSERT INTO comment_likes (comment_id, user_id) VALUES (?, ?)';
        db.query(insertLikeQuery, [commentId, userId], (insertErr, insertResults) => {
            if (insertErr) {
                console.error('Error inserting like:', insertErr);
                return res.status(500).json({ message: 'Error inserting like' });
            }

            // After inserting like, count the new total likes for the comment
            const countLikesQuery = 'SELECT COUNT(*) AS totalLikes FROM comment_likes WHERE comment_id = ?';
            db.query(countLikesQuery, [commentId], (countErr, countResults) => {
                if (countErr) {
                    console.error('Error counting likes:', countErr);
                    return res.status(500).json({ message: 'Error counting likes' });
                }

                // Send back the new total likes count
                res.status(200).json({ message: 'Comment liked successfully', totalLikes: countResults[0].totalLikes });
            });
        });
    });
});

// Route to handle unliking a comment
app.delete('/api/comments/:id/like', (req, res) => {
    const commentId = req.params.id;
    const userId = req.user.id; // The ID of the user unliking the comment

    // First, check if the user has liked the comment
    const checkLikeQuery = 'SELECT * FROM comment_likes WHERE comment_id = ? AND user_id = ?';
    db.query(checkLikeQuery, [commentId, userId], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error checking existing likes:', checkErr);
            return res.status(500).json({ message: 'Error checking existing likes' });
        }

        if (checkResults.length === 0) {
            // The user has not liked the comment
            return res.status(409).json({ message: 'User has not liked this comment' });
        }

        // The user has liked the comment, proceed to delete like
        const deleteLikeQuery = 'DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?';
        db.query(deleteLikeQuery, [commentId, userId], (deleteErr, deleteResults) => {
            if (deleteErr) {
                console.error('Error deleting like:', deleteErr);
                return res.status(500).json({ message: 'Error deleting like' });
            }

            // After deleting like, count the remaining total likes for the comment
            const countLikesQuery = 'SELECT COUNT(*) AS totalLikes FROM comment_likes WHERE comment_id = ?';
            db.query(countLikesQuery, [commentId], (countErr, countResults) => {
                if (countErr) {
                    console.error('Error counting likes:', countErr);
                    return res.status(500).json({ message: 'Error counting likes' });
                }

                // Send back the remaining total likes count
                res.status(200).json({ message: 'Comment unliked successfully', totalLikes: countResults[0].totalLikes });
            });
        });
    });
});





const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
