import React from 'react';

const ShadowingVideos = () => {
    // Videos data with just the video IDs
    const videos = [
        {
            id: 1,
            title: '跟读视频1',
            videoId: 'GVWFGIyNswI' // YouTube video ID
        },
        // ...更多视频
    ];

    return (
        <div className="shadowing-videos">
            {videos.map(video => (
                <div key={video.id} className="video">
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <p>{video.title}</p>
                </div>
            ))}
        </div>
    );
};

export default ShadowingVideos;
