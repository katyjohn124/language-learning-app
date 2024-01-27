const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const app = express()

const userRoutes = require('./src/routes/authRoutes')

app.use(cors())
//用于解析json请求体
app.use(express.json())
// 将用户相关的路由挂载到/api路径下
app.use('/api', userRoutes);

let users = [];
//注册
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {
            username: req.body.username,
            password: hashedPassword
        };
        users.push(user);
        res.status(201).send('用户注册成功！')
    } catch (error) {
        res.status(500).send('用户注册失败：' + error.message)
    }
})
//登录
app.post('/login', async (req, res) => {
    const user = users.find(u => u.username === req.body.username);
    if (!user) {
        return res.status(400).send('找不到该用户');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
            res.json({ accessToken });
        } else {
            res.send('Not Allowed');
        }
    } catch (error) {
        res.status(500).send('Error logging in' + error.message);
    }
})

//设置端口
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
