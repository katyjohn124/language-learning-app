
const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

async function generateContent(prompt) {
    try {
        const response = await model.generateContent(prompt);
        return await response.text();
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
}

module.exports = {
    generateContent
};
