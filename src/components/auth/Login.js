import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            //本地存储存token
            localStorage.setItem('token', response.data.accessToken);
            setMessage('Login successful');
            // Redirect to a new page or reset the state as needed
        } catch (error) {
            setMessage('Login failed', error.message);
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
