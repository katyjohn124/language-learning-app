// import React from 'react';
// import styles from './Home.module.css';
// import { useNavigate } from 'react-router-dom'; // 引入useNavigate

// const Home = () => {
//     const navigate = useNavigate(); // 使用useNavigate钩子

//     // 跳转到注册界面的函数
//     const navigateToRegister = () => {
//         navigate('/register');
//     };

//     return (

//         <div className={styles.HomePage}>
//             {/* Hero Section */}
//             <div className={styles.heroSection}>
//                 <h1 className={styles.headline}>欢迎来到基于可理解性输入假说的语言学习网站</h1>
//                 <button className={styles.ctaButton} onClick={navigateToRegister}>立即尝试</button>
//             </div>


//         </div>
//     );
// }

// export default Home;



import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import AI from '../assets/4b14e6a89167d2da2291a9357eca3dc.png'
import learn from '../assets/3a19f5b661d4ac68a005ebdb8d91356.png'
import share from '../assets/bb24cded9ffff7b6231a1bad06ac34b.png'

const Home = () => {
    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className={styles.HomePage}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <h1 className={styles.headline}>欢迎来到基于可理解性输入假说的语言学习网站</h1>
                <div className={styles.featuresBox}>
                    <div className={styles.feature}>
                        <img src={AI} alt="AI助手" />
                        <p>AI助手功能——结合了chatgpt 3.5-turbo来创建大语言模型，完全免费使用（而且不需要科学上网），后期还会考虑上线GPT4版本（免费）！</p>
                    </div>
                    <div className={styles.feature}>
                        <img src={share} alt="社区讨论" />
                        <p>社区讨论功能——在这里大家能分享自己的学习经验和讨论有趣的事！</p>
                    </div>
                    <div className={styles.feature}>
                        <img src={learn} alt="学习功能" />
                        <p>学习功能——这里列了听说读写四个功能，分别介绍如何用可理解性输入就假说去一一练习！</p>
                    </div>
                    <div className={styles.feature}>
                        <img src="path-to-search-feature-image" alt="搜索功能" />
                        <p>搜索功能</p>
                    </div>

                </div>
                <button className={styles.ctaButton} onClick={navigateToRegister}>立即尝试</button>
            </div>
        </div>
    );
}

export default Home;








