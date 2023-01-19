import { html, render } from './node_modules/lit-html/lit-html.js';
import { get, post } from './api.js'

const menu = document.querySelector('#menu');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

const dropDownTemplate = (item) => html`<option value="${item._id}">${item.text}</option>`;

getData();

async function getData() {
    const data = await get('/jsonstore/advanced/dropdown');
    update(data);
}

function update(data) {
    render(Object.values(data).map(dropDownTemplate), menu);
}

function onSubmit(event) {
    event.preventDefault();
    const input = form.querySelector('#itemText');
    const text = input.value;
    addItem(text);
}

async function addItem(text) {
    if (text !== '') {
        await post('/jsonstore/advanced/dropdown', { text });
    }

    form.reset();
    getData();
}


