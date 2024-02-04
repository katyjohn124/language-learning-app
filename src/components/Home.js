import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom'; // 引入useNavigate

const Home = () => {
    const navigate = useNavigate(); // 使用useNavigate钩子

    // 跳转到注册界面的函数
    const navigateToRegister = () => {
        navigate('/register');
    };

    return (

        <div className={styles.HomePage}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <h1 className={styles.headline}>欢迎来到基于可理解性输入假说的语言学习网站</h1>
                <button className={styles.ctaButton} onClick={navigateToRegister}>立即尝试</button>
            </div>


        </div>
    );
}

export default Home;







