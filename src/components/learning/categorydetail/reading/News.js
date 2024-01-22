
import React from 'react';


const News = ({ article }) => {
    return (
        <div className="card">
            <img src={article.image} alt={article.title} />
            <div className="card-content">
                <h2 className="card-title">{article.title}</h2>
                <p className="card-body">{article.excerpt}</p>
            </div>
        </div>
    );
};

export default News;
