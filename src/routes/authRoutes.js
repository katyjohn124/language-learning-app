const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../../db');
const router = express.Router();

//注册路由
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (error, results) => {
            if (error) {
                res.status(500).send('Error during user registration');
            } else {
                res.status(201).send('User registered successfully');
            }
        });
    } catch {
        res.status(500).send('Server error');
    }
});


// 登录路由

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    pool.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
        if (error || results.length === 0) {
            res.status(401).send('No such user found');
        } else {
            if (await bcrypt.compare(password, results[0].password)) {
                //生成token并发送
                res.status(200).send({ message: 'Login successful', token: 'YourGeneratedToken' });
            } else {
                res.status(401).send('Password is incorrect');
            }
        }
    });
});

module.exports = router;