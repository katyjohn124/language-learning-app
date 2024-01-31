import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', { username, password });
            console.log(response.data);  // 确保这里正确打印响应数据

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
        <div>
            <h2>登录</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    用户名:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </label>
                <label>
                    密码:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button type="submit">登录</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
