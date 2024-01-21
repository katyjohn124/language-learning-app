import React from 'react';

const AudioBook = ({ books }) => {
    return (
        <div>
            {books.map((book, index) => (
                <div key={index}>
                    <h3>{book.title}</h3>
                    {/* 此处可以添加播放有声书的逻辑 */}
                </div>
            ))}
        </div>
    );
};

export default AudioBook;
