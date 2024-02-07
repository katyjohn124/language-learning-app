import React from 'react';
import styles from './ShadowReadingWithYouTube.module.css'; // CSS模块文件

const ShadowReadingWithYouTube = ({ intro, videoId }) => {
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <section className={styles.shadowReading}>
            <h2>YouTube影子跟读法介绍</h2>
            <p>{intro}</p>
            <iframe
                width="560"
                height="315"
                src={youtubeEmbedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </section>
    );
};

export default ShadowReadingWithYouTube;
