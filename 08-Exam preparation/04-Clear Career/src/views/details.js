import { addApplication, getTotal, getTotalForUser } from "../api/apply.js";
import { deleteById, getById } from "../api/data.js";
import { getUserData } from "../api/util.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (offer, user, applications, isOwner, canApply, onDelete, onApply) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${offer.imageUrl} alt="example1" />
        <p id="details-title">${offer.title}</p>
        <p id="details-category">
            Category: <span id="categories">${offer.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${offer.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${applications}</strong></p>

        ${offerButtons(offer, user, isOwner, canApply, onDelete, onApply)}
    </div>
</section>`;

function offerButtons(offer, user, isOwner, canApply, onDelete, onApply) {
    if (!user) {
        return nothing;
    }

    if (canApply) {
        return html` 
        <div id="action-buttons">
            <a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>
        </div>`
    }

    if (isOwner) {
        return html`
        <div id="action-buttons">
            <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>`
    }

}

export async function showDetails(ctx) {
    const id = ctx.params.id;

    const requests = [
        getById(id),
        getTotal(id)
    ]

    const user = getUserData();

    if (user) {
        requests.push(getTotalForUser(id, user._id));
    }

    const [offer, applications, hasApplications] = await Promise.all(requests);

    const isOwner = user && user._id == offer._ownerId;
    const canApply = !isOwner && hasApplications == 0;

    ctx.render(detailsTemplate(offer, user, applications, isOwner, canApply, onDelete, onApply));

    async function onDelete() {
        const confirmation = confirm('Do you want to delete this offer?');

        if (confirmation) {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }

    async function onApply() {
        await addApplication(id);
        ctx.page.redirect('/catalog/' + id);
    }
}

