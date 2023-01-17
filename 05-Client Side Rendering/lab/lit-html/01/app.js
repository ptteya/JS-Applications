import { html, render } from 'https://unpkg.com/lit-html?module';

const timer = (time) => html`<p>The time is ${time}</p><p>Have a nice day</p>`;
const root = document.querySelector('main');

const message = () => html`<p>This is a static message</p>`

function show() {
    render(message(), root);
}

function update() {
    render(timer(new Date), root);
}

document.querySelector('#update').addEventListener('click', update);
document.querySelector('#message').addEventListener('click', show);

// setInterval(update, 1000);

