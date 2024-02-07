import React from 'react';
import styles from './PersonalProgressStory.module.css';

const PersonalProgressStory = ({ story }) => {
    return (
        <section className={styles.personalProgress}>
            <h2>我的口语进步故事</h2>
            <p>{story}</p>
        </section>
    );
};

export default PersonalProgressStory;
