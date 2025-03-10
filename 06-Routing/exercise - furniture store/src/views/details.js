import { html, nothing } from '../lib.js';
import { itemDetails, deleteItem } from '../api/data.js';

const detailsTemplate = (data, isOwner) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=".${data.img}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${data.make}</span></p>
        <p>Model: <span>${data.model}</span></p>
        <p>Year: <span>${data.year}</span></p>
        <p>Description: <span>${data.description}</span></p>
        <p>Price: <span>${data.price}</span></p>
        <p>Material: <span>${data.material}</span></p>
        <div>
            ${isOwner ? buttonsTemplate(data._id) : nothing}
        </div>
    </div>
</div>`;

const buttonsTemplate = (id) => html`
    <a href="/edit/${id}" class="btn btn-info">Edit</a>
    <a href="/delete/${id}" class="btn btn-red">Delete</a>`;


export async function showDetails(ctx) {
    const id = ctx.params.id;
    const data = await itemDetails(id);

    let isOwner = false;
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user._id === data._ownerId) {
        isOwner = true;
    }

    ctx.render(detailsTemplate(data, isOwner));
}

export async function onDelete(ctx) {
    const confirmed = confirm('Do you want to delete this item?');

    if (confirmed) {
        const id = ctx.params.id;
        await deleteItem(id);
        ctx.page.redirect('/');
    }
}
