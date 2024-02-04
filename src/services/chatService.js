
const db = require('../../db');

exports.getAllMessages = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM messages', (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.saveMessage = async (message) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO messages (text, isBot) VALUES (?, ?)';
        db.query(query, [message.text, message.isBot], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};
