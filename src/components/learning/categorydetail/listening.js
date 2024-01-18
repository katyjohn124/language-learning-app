
import React from 'react';
import YouTubeListening from './YouTubeListening'; // 嵌入YouTube视频的组件
import BlogChannel from './BlogChannel'; // 博客频道组件
import AudioBookChannel from './AudioBookChannel'; // 有声书频道组件
// 确保为以上每个组件都创建相应的JSX和CSS文件

const Listening = () => {
    // 假设这里是一些数据，实际应用中可能会从API获取
    const youtubeVideos = ['dQw4w9WgXcQ', 'M7lc1UVf-VE'];
    const blogPosts = [{/* ...博客文章数据 */ }];
    const audioBooks = [{/* ...有声书数据 */ }];

    return (
        <div>
            <h1>听力练习</h1>

            <section>
                <h2>YouTube视频</h2>
                {youtubeVideos.map(videoId => (
                    <YouTubeListening key={videoId} videoId={videoId} />
                ))}
            </section>

            <section>
                <h2>博客频道</h2>
                {/* 渲染博客文章 */}
                <BlogChannel posts={blogPosts} />
            </section>

            <section>
                <h2>有声书频道</h2>
                {/* 渲染有声书 */}
                <AudioBookChannel books={audioBooks} />
            </section>

            {/* 其他听力素材... */}
        </div>
    );
};

export default Listening;
