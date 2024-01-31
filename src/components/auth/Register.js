import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    //初始化
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {

            const response = await axios.post('http://localhost:3001/api/register', { username, password });
            setMessage('注册成功！');
            setUsername('');
            setPassword('');
            // 注册成功后，跳转到登录页面
            navigate('/login');
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
                <p>
                    已经注册？ <Link to="/login">请登录</Link>
                </p>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
