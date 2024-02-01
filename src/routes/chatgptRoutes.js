const express = require('express');
const { callChatGPTApi } = require('../services/openaiService');
const router = express.Router();

router.post('/generate-text', async (req, res) => {
    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ message: 'Question is required' });
    }

    try {
        const answer = await callChatGPTApi(question);
        res.json({ answer });
    } catch (error) {
        res.status(500).json({ message: 'Unable to fetch the answer' });
    }
});

module.exports = router;
