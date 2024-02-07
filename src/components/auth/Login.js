import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css'
import { Link } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', { username, password });
            // console.log(response.data);  // 确保这里正确打印响应数据

            // 将 'accessToken' 更改为 'token'
            localStorage.setItem('token', response.data.token);  // 更正后的代码
            setMessage('Login successful');

            // 登录成功后，跳转到个人主页
            navigate('/userprofiles');
        } catch (error) {
            console.error('Login error:', error);  // 使用 console.error 更合适
            setMessage('Login failed');
        }
    }


    return (
        <div className={styles.formContainer}>
            <h2>登录</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    用户名:
                    <input className={styles.input} type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </label>
                <label className={styles.label}>
                    密码:
                    <input className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button className={styles.button} type="submit">登录</button>
                <p className={styles.message}>
                    尚未注册？ <Link to="/register">请注册</Link>
                </p>
            </form>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
}

export default Login;
