// Speaking.js
import React from 'react';
import AItools from './AItools';
import ShadowVideos from './ShadowVideos';
import TutorialPlatform from './TutorialPlatform';
import styles from './speaking.module.css'; // Ensure this is the correct path

const Speaking = () => {
    return (
        <div className={styles.container}>
            {/* Each section should snap into place as you scroll */}
            <div className={styles.section}>
                <ShadowVideos />
            </div>
            <div className={styles.section}>
                <AItools />
            </div>
            <div className={styles.section}>
                <TutorialPlatform />
            </div>
        </div>
    );
};

export default Speaking;
