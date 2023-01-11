function attachEvents() {
    document.querySelector('#submit').addEventListener('click', onSendClick);
    document.querySelector('#refresh').addEventListener('click', getAllMessages);
}

async function onSendClick() {
    const nameElement = document.querySelector('input[name="author"]');
    const messageElement = document.querySelector('input[name="content"]');

    const author = nameElement.value;
    const content = messageElement.value;

    if (author !== '' && content !== '') {
        const body = {
            author,
            content
        };

        nameElement.value = '';
        messageElement.value = '';

        createMessage(body);
    }
}

async function createMessage(body) {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    getAllMessages();
}

async function getAllMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const response = await fetch(url);
    const data = await response.json();

    renderMessages(data);
}

function renderMessages(data) {
    const textarea = document.querySelector('#messages');

    const messages = Object.values(data)
        .map(({ author, content }) => `${author}: ${content}`)
        .join('\n');

    textarea.textContent = messages;
}

attachEvents();