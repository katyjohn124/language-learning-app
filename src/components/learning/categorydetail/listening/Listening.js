import React from 'react'
import Youtube from './Youtube'
import Blog from './Blog'
import AudioBook from './AudioBook'
import './Listening.css'


const listening = () => {
    const YoutubeVideos = ['dQw4w9WgXcQ'];
    const audioBooks = [
        {
            id: 1,
            title: "有声书标题1",
            author: "作者1",
            cover: "cover-url-1.jpg", // 封面图片链接
            audioUrl: "audio-url-1.mp3", // 音频文件链接
            description: "有声书简介1..."
        },
        {
            id: 2,
            title: "有声书标题2",
            author: "作者2",
            cover: "cover-url-2.jpg", // 封面图片链接
            audioUrl: "audio-url-2.mp3", // 音频文件链接
            description: "有声书简介2..."
        },
        // ...更多有声书
    ];

    const blogPosts = [
        {
            id: 1,
            title: "博客文章标题1",
            excerpt: "这是关于文章1的摘要，它提供了文章概览...",
            cover: "blog-cover-url-1.jpg", // 文章封面图片链接
            content: "博客文章1的全文内容...",
            publishedDate: "发布日期1",
            author: "作者1"
        },
        {
            id: 2,
            title: "博客文章标题2",
            excerpt: "这是关于文章2的摘要，它提供了文章概览...",
            cover: "blog-cover-url-2.jpg", // 文章封面图片链接
            content: "博客文章2的全文内容...",
            publishedDate: "发布日期2",
            author: "作者2"
        },
        // ...更多博客文章
    ];

    return (
        <div className='listening-container'>
            <h1>听力练习</h1>
            <section className='youtube-section'>
                <h2>Youtube视频</h2>
                {YoutubeVideos.map((videoId) => (
                    <Youtube key={videoId} videoId={videoId} />
                ))}

            </section>
            <section className='audiobook-section'>
                <h2>有声书频道</h2>
                <AudioBook books={audioBooks} />
            </section>
            <section className='blog-section'>
                <h2>博客频道</h2>
                <Blog posts={blogPosts} />
            </section>
        </div>
    )
}

export default listening

