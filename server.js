const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/ask', async (req, res) => {
    try {
        const question = req.body.question;
        const response = await askOpenAI(question);
        res.json({ answer: response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
});

async function askOpenAI(question) {
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json',
    };
    const data = {
        model: 'gpt-4',
        messages: [{ role: 'user', content: question }],
    };

    const response = await axios.post(endpoint, data, { headers: headers });
    return response.data.choices[0].message.content.trim();
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
