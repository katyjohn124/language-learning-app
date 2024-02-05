import React from 'react';
import styles from './speaking.module.css';

const ShadowingVideos = () => {

    const videos = [
        {
            id: 1,
            title: '影子跟读教学',
            videoId: 'GVWFGIyNswI' // YouTube video ID
        },
        {
            id: 2,
            title: '6分钟BBC learning English',
            videoId: 's1HxJVusR2w' // YouTube video ID
        },

    ];

    return (
        <div className={styles.videoSection}>
            {/* Render only the first video initially */}
            {videos.slice(0, 1).map((video) => (
                <iframe
                    key={video.id}
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title="YouTube video player"
                    allowFullScreen
                    className={styles.video} // Apply your video styling
                ></iframe>
            ))}
        </div>
    );
};

export default ShadowingVideos;
