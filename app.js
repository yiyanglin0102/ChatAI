async function sendQuestion() {
    const questionText = document.getElementById('question').value;
    const response = await fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionText })
    });

    const data = await response.json();
    document.getElementById('answer').innerText = data.answer;
}
