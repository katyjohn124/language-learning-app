
import React from 'react';


const Ebook = ({ book }) => {
    return (
        <div className="card">
            <img src={book.cover} alt={book.title} />
            <div className="card-content">
                <h2 className="card-title">{book.title}</h2>
                <p className="card-body">{book.description}</p>
            </div>
        </div>
    );
};

export default Ebook;
