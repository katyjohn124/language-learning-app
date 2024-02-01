const axios = require('axios');
require('dotenv').config(); // 确保能够加载 .env 文件中的变量

const callChatGPTApi = async (prompt) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].text;
    } catch (error) {
        console.error('调用 ChatGPT API 时发生错误:', error);
        throw error;
    }
};

module.exports = {
    callChatGPTApi
};
