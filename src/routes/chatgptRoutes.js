const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/ask', async (req, res) => {

    const { question } = req.body;
    console.log("Received question:", req.body.question);

    if (!question) {
        return res.status(400).json({ message: 'Question is required' });
    }

    try {
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: question,
                max_tokens: 150
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const answer = openaiResponse.data.choices[0].text.trim();
        res.json({ answer });
    } catch (error) {
        console.error('Error with OpenAI API:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error fetching response from OpenAI' });
    }
});

module.exports = router;
