const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatForm = document.getElementById('chat-form');

async function sendMessage() {
    const question = userInput.value;
    if (!question.trim()) return; // Prevent sending empty messages
    userInput.value = '';

    // Sanitize user input to prevent XSS
    const sanitizedQuestion = question.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    chatBox.innerHTML += `<div class="user-message">${sanitizedQuestion}</div>`;

    const API_ENDPOINT = 'https://pi42egvpi5.execute-api.us-east-1.amazonaws.com/dev/askOpenAI';

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: sanitizedQuestion }),
        });
        const data = await response.json();
        chatBox.innerHTML += `<div class="assistant-message">${data.answer}</div>`;
    } catch (error) {
        console.error('Error:', error);
        chatBox.innerHTML += `<div class="assistant-message">Sorry, there was an error processing your request.</div>`;
    }

    // Auto-scroll chatBox to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendButton.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent form submission
    await sendMessage();
});

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission
    await sendMessage();
});