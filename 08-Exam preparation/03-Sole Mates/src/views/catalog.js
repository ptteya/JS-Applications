import { getAll } from "../api/data.js";
import { html } from "../lib.js";

const catalogTemplate = (items) => html`
<section id="dashboard">
    <h2>Collectibles</h2>
    ${items.length > 0
    ? items.map(itemCard)
    : html`<h2>There are no items added yet.</h2>`}
</section>`;

const itemCard = (item) => html`
<ul class="card-wrapper">
    <li class="card">
        <img src=${item.imageUrl} alt="travis" />
        <p>
            <strong>Brand: </strong><span class="brand">${item.brand}</span>
        </p>
        <p>
            <strong>Model: </strong><span class="model">${item.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
        <a class="details-btn" href="/catalog/${item._id}">Details</a>
    </li>
</ul>`

export async function showCatalog(ctx) {
    const items = await getAll();
    ctx.render(catalogTemplate(items));
}

