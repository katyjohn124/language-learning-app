import React from 'react';
import styles from './AIToolsAndTutoringPlatforms.module.css'; // CSS模块文件

const AIToolsAndTutoringPlatforms = ({ description, tools, platforms }) => {
    return (
        <section className={styles.aiTools}>
            <h2>AI工具和口语外教平台推荐</h2>
            <p>{description}</p>
            <h3>推荐工具：</h3>
            <ul>
                {tools.map((tool, index) => (
                    <li key={index}>{tool}</li>
                ))}
            </ul>
            <h3>推荐平台：</h3>
            <ul>
                {platforms.map((platform, index) => (
                    <li key={index}>{platform}</li>
                ))}
            </ul>
        </section>
    );
};

export default AIToolsAndTutoringPlatforms;
