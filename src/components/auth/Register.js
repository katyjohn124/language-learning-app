import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css'

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
        <div className={styles.formContainer}>
            <h2>注册</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    用户名:
                    <input className={styles.input} type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </label>
                <label className={styles.label}>
                    密码:
                    <input className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button className={styles.button} type="submit">注册</button>
                <p className={styles.message}>
                    已经注册？ <Link to="/login">请登录</Link>
                </p>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
