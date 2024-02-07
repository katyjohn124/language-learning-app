import React from 'react';
import styles from './Listening.module.css'
import ListeningPracticeTips from './ListeningPracticeTips';
import YouTubeLearningGuide from './YouTubeLearningGuide';
import ListeningPracticePlan from './ListeningPracticePlan';

const Listening = () => {
    return (
        <div className={styles.listeningContainer}>
            <h1>听力练习指南</h1>
            <ListeningPracticeTips />
            <YouTubeLearningGuide />
            <ListeningPracticePlan />
        </div>
    );
};

export default Listening;
