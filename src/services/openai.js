
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());


const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465, // SMTP SSL port
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_USERNAME, // Your QQ email address
        pass: process.env.EMAIL_PASSWORD // Your QQ authorization code
    }
});

app.post('/api/feedback', async (req, res) => {
    const { feedback, includeEmail, userEmail } = req.body;

    // Prepare the HTML content of the email
    const emailHtmlContent = `
        <p>You have received new feedback:</p>
        <p>${feedback}</p>
        ${includeEmail ? `<p>From: ${userEmail}</p>` : ''}
    `;

    // Configure the mail options
    const mailOptions = {
        from: process.env.EMAIL_USERNAME, // Your QQ email address
        to: process.env.EMAIL_USERNAME, // Where you want to receive the feedback
        subject: 'New Feedback Received', // Subject line
        text: feedback, // Plain text body
        html: emailHtmlContent, // HTML body
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Feedback sent successfully');
    } catch (error) {
        console.error('Error sending feedback email:', error);
        res.status(500).send('Error sending feedback');
    }
});


//调用chatgpt api
app.post('/api/openai', async (req, res) => {
    try {
        const { messages } = req.body;

        const response = await axios.post('https://oneapi.xty.app/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: messages
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        console.log('Custom API response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error sending message to custom API:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
            res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error(error.request);
            res.status(500).json({ message: 'No response received from API' });
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
            res.status(500).json({ message: error.message });
        }
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
