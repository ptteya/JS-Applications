import { deleteById, getById } from "../api/data.js";
import { getUserData } from "../api/util.js";
import { html,nothing } from "../lib.js";

const detailsTemplate = (item,isOwner,onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
            <img src=${item.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${item.brand}</span></p>
            <p>
                Model: <span id="details-model">${item.model}</span>
            </p>
            <p>Release date: <span id="details-release">${item.release}</span></p>
            <p>Designer: <span id="details-designer">${item.designer}</span></p>
            <p>Value: <span id="details-value">${item.value}</span></p>
        </div>

        <!--Edit and Delete are only for creator-->
        ${isOwner 
            ? html` 
            <div id="action-buttons">
                <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>`
        : nothing}
    </div>
</section>`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);

    const user = getUserData();
    const isOwner = user && user._id == item._ownerId;

    ctx.render(detailsTemplate(item,isOwner,onDelete));

    async function onDelete(){
        const confirmation = confirm('Do you want to delete this item?');

        if(confirmation){
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }
}

