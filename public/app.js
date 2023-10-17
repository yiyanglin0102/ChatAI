const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const askButton = document.getElementById('askButton');

askButton.addEventListener('click', async () => {
    const question = questionElement.value;

    const response = await fetch('/.netlify/functions/askOpenAI', {
        method: 'POST',
        body: JSON.stringify({ question }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    answerElement.innerText = data.answer;
});
