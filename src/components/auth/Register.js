
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    //初始化
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            // 注意 URL 已经改为 '/api/register' 以匹配后端路由
            const response = await axios.post('http://localhost:3001/api/register', { username, password });
            setMessage('注册成功！');
            setUsername('');
            setPassword('');
        } catch (error) {
            // 确保这里能够正确显示错误信息
            setMessage(`注册失败: ${error.response.data}`);
        }
    }


    return (
        <div>
            <h2>注册</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    用户名:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </label>
                <label>
                    密码:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button type="submit">注册</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
