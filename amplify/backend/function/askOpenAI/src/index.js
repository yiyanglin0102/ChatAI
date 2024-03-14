const axios = require('axios');

exports.handler = async (event) => {
    // CORS preflight request handling
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Adjust according to your needs
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Methods": "OPTIONS, POST",
            },
            body: "",
        };
    }

    // Only process POST requests for the main functionality
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    // Parse the incoming request body
    const payload = JSON.parse(event.body);
    const question = payload.question;

    // Define the OpenAI API endpoint and request headers
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
    };
    
    // Set up the data payload for the OpenAI API
    const data = {
        model: 'gpt-4',
        messages: [{ role: 'user', content: question }],
    };

    try {
        // Make the request to the OpenAI API
        const response = await axios.post(endpoint, data, { headers: headers });
        // Return the response from OpenAI API
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*", // Ensure CORS is handled
            },
            body: JSON.stringify({ answer: response.data.choices[0].message.content.trim() }),
        };
    } catch (error) {
        // Handle any errors that occur during the API request
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*", // Ensure CORS is handled
            },
            body: JSON.stringify({ message: "Failed to fetch response from OpenAI" }),
        };
    }
};
