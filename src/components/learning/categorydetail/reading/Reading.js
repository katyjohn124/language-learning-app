import React from 'react'
import Ebook from './Ebook'
import News from './News'
import './reading.css'

const Reading = () => {
    const ebooks = [
        {
            id: 1,
            title: "电子书标题1",
            author: "作者1",
            cover: "cover-url-1.jpg", // 封面图片链接
            description: "电子书简介1..."
        },
    ]
    const newsArticles = [
        {
            id: 1,
            title: "新闻标题1",
            excerpt: "新闻摘要1...",
            image: "news-image-url-1.jpg", // 新闻图片链接
            content: "新闻全文内容1...",
            publishedDate: "发布日期1",
            author: "作者1"
        },
    ]
    return (
        <div className='reading-container'>
            <h1>阅读练习</h1>
            <section className='ebook-section'>
                <h2>电子书</h2>
                {ebooks.map((book) => (
                    <Ebook key={book.id} book={book} />
                ))}

            </section>
            <section className='news-section'>
                <h2>新闻文章</h2>
                {newsArticles.map((article) => (
                    <News key={article.id} article={article} />
                ))}

            </section>
        </div>
    )
}

export default Reading