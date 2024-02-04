const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../../db');
const router = express.Router();

// 注册路由
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        // 注意：这里的列名已经从 'password' 改为 'password_hash'
        pool.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hashedPassword], (error, results) => {
            if (error) {
                console.error('Database error during user registration:', error);
                res.status(500).send('用户已经注册过！');
            } else {
                res.status(201).send('User registered successfully');
            }
        });
    } catch (err) {
        console.error('Server error during registration:', err);
        res.status(500).send('Server error during registration');
    }
});



// 登录路由
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    pool.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.error('Database error during login:', error);
            res.status(500).send('Error during login');
            return;
        }

        if (results.length === 0) {
            res.status(401).send('No such user found');
            return;
        }

        // 现在使用正确的列名 'password_hash'
        const user = results[0];
        if (await bcrypt.compare(password, user.password_hash)) {
            console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);
            const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
            console.log('Generated token:', token);
            console.log(token); // 这里打印 token，确保它被正确生成

            res.status(200).json({ message: 'Login successful', token: token });
        } else {
            res.status(401).send('Password is incorrect');
        }
    });
});


module.exports = router;
