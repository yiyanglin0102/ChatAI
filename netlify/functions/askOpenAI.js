const axios = require('axios');

exports.handler = async function (event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const payload = JSON.parse(event.body);
    const question = payload.question;

    const endpoint = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
    };
    const data = {
        model: 'gpt-4',
        messages: [{ role: 'user', content: question }],
        max_tokens: 100  // limit the response to 100 tokens, for instance
    };

    try {
        const response = await axios.post(endpoint, data, { headers: headers, timeout: 8000 });
        return {
            statusCode: 200,
            body: JSON.stringify({ answer: response.data.choices[0].message.content.trim() }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: "Failed to fetch response from OpenAI",
        };
    }
};
