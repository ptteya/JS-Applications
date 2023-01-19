import { cats } from './catSeeder.js';
import { html, render } from './node_modules/lit-html/lit-html.js';

const root = document.querySelector('#allCats');

const catTemplate = (cats) => html`
    <ul>
        ${cats.map(createCard)}
    </ul>`

const createCard = (cat) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn">Show status code</button>
            <div class="status" style="display: none" id="${cat.id}">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>`;


render(catTemplate(cats), root);

root.addEventListener('click', toggleDetails);

function toggleDetails(event) {
    event.preventDefault();

    if (event.target.classList.contains('showBtn')) {
        const button = event.target;
        const statusInfo = button.parentElement.querySelector('.status');

        if (button.textContent === 'Show status code') {
            statusInfo.style.display = 'block';
            button.textContent = 'Hide status code';
        } else {
            statusInfo.style.display = 'none';
            button.textContent = 'Show status code';
        }
    }
}
