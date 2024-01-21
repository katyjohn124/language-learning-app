import React from 'react';

const Youtube = ({ videoId }) => {
    const embedUrl = `https://www.youtube.com`;

    return (
        <iframe
            width="560"
            height="315"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
};

export default Youtube;
