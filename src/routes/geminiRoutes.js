
const express = require('express');
const { generateContent } = require('../services/geminiService');

const router = express.Router();

router.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;

    try {
        const responseText = await generateContent(prompt);
        res.json({ text: responseText });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).send('An error occurred.');
    }
});

module.exports = router;
