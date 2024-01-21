import React from 'react'
import Youtube from './Youtube'
import Blog from './Blog'
import AudioBook from './AudioBook'


const listening = () => {
    const YoutubeVideos = ['dQw4w9WgXcQ', 'M7lc1UVf-VE'];
    const audioBooks = [{}];
    const blogPosts = [{}];
    return (
        <div>
            <h1>听力练习</h1>
            <section>
                <h2>Youtube视频</h2>
                {YoutubeVideos.map((videoId) => (
                    <Youtube key={videoId} videoId={videoId} />
                ))}

            </section>
            <section>
                <h2>播客频道</h2>
                <AudioBook books={audioBooks} />
            </section>
            <section>
                <h2>有声书频道</h2>
                <Blog posts={blogPosts} />
            </section>
        </div>
    )
}

export default listening

