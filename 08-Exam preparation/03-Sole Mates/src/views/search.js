import { search } from "../api/data.js";
import { getUserData } from "../api/util.js";
import { html, nothing } from "../lib.js";

const searchTemplate = html`
<section id="search">
    <h2>Search by Brand</h2>

    <form class="search-wrapper cf">
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
        <button @click=${onSearch} type="submit">Search</button>
    </form>

    <h3>Results:</h3>
</section>`;

const searchResultTemplate = (searchTemplate, items, hasUser) => html`
${searchTemplate}
<div id="search-container">
    ${items.length > 0
        ? html`
    <ul class="card-wrapper">
        ${items.map(i => itemCard(i, hasUser))}
    </ul>`
        : html`<h2>There are no results found.</h2>`}
</div>`;

const itemCard = (item, hasUser) => html`
<li class="card">
    <img src=${item.imageUrl} alt="travis" />
    <p>
        <strong>Brand: </strong><span class="brand">${item.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${item.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
    ${hasUser
    ? html` <a class="details-btn" href="/catalog/${item._id}">Details</a>`
    : nothing}
</li>`

let context = null;

export function showSearch(ctx) {
    context = ctx;
    ctx.render(searchTemplate);
}

async function onSearch(event) {
    event.preventDefault();

    const searchInput = document.getElementById('#search-input');
    const query = searchInput.value;

    if (!query) {
        return alert('Write something to search for!');
    }

    const items = await search(query);
    const user = getUserData();

    context.render(searchResultTemplate(searchTemplate, items, user));
}