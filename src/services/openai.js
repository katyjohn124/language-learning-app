
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const nodemailer = require('nodemailer');
const db = require('../../db');

const app = express();

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
