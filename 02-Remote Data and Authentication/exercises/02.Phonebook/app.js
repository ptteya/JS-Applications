function attachEvents() {
    document.querySelector('#btnLoad').addEventListener('click', onLoadClick);
    document.querySelector('#btnCreate').addEventListener('click', onCreateClick);
}

async function onLoadClick() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const response = await fetch(url);
    const data = await response.json();

    return renderPhonebook(data);
}

function renderPhonebook(data) {
    const phonebook = document.querySelector('#phonebook');
    phonebook.replaceChildren();

    Object.values(data).forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.person}: ${entry.phone}`;
        li.setAttribute('data-id', entry._id);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', onDeleteClick);

        li.appendChild(deleteBtn);
        phonebook.appendChild(li);
    });
}

function onCreateClick() {
    const personElement = document.querySelector('#person');
    const phoneElement = document.querySelector('#phone');

    const body = {
        person: personElement.value,
        phone: phoneElement.value
    }

    createContact(body);
    personElement.value = '';
    phoneElement.value = '';
}

async function createContact(body) {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const headers = getHeader('POST', body);
    const response = await fetch(url, headers);
    const data = await response.json();

    onLoadClick();
    return data;
}

function onDeleteClick(event) {
    const li = event.target.parentElement;
    const id = li.getAttribute('data-id');

    deleteContact(id);
    li.remove();
}

async function deleteContact(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/${id}`;

    const headers = getHeader('DELETE', null);
    const response = await fetch(url, headers);
    const data = await response.json();

    return data;
}

function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

attachEvents();