const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatForm = document.getElementById('chat-form');

async function sendMessage() {
    const question = userInput.value;
    if (!question.trim()) return; // Prevent sending empty messages
    userInput.value = '';
    chatBox.innerHTML += `<div class="user-message">${question}</div>`;

    const response = await fetch('/.netlify/functions/askOpenAI', {
        method: 'POST',
        body: JSON.stringify({ question: question }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    chatBox.innerHTML += `<div class="assistant-message">${data.answer}</div>`;
}

sendButton.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent form submission when button clicked
    sendMessage();
});

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission on enter
    sendMessage();
});
