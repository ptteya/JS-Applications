import { html, render } from './node_modules/lit-html/lit-html.js';

const root = document.querySelector('#root');
const form = document.querySelector('.content');
form.addEventListener('submit', onSubmit);

const townTemplate = (towns) => html`
    <ul>
        ${towns.map(town => html`<li>${town}</li>`)}
    </ul>`;

function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    let towns = formData.get('towns');
    towns = towns.split(', ');

    renderTowns(towns);
    form.reset();
}

function renderTowns(towns) {
    render(townTemplate(towns), root);
}
