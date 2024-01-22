import React from 'react';

const AudioBook = ({ books }) => {
    return (
        <div>
            {books.map((book, index) => (
                <div key={index}>
                    <h3>{book.title}</h3>
                    <audio controls>
                        <source src={book.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            ))}
        </div>
    );
};

export default AudioBook;
