import { edit, getById } from "../api/data.js";
import { login } from "../api/user.js";
import { createSubmitHandler } from "../api/util.js";
import { html } from "../lib.js";

const editTemplate = (offer, onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit=${onEdit} class="edit-form">
            <input type="text" name="title" id="job-title" placeholder="Title" .value=${offer.title} />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${offer.imageUrl} />
            <input type="text" name="category" id="job-category" placeholder="Category" .value=${offer.category} />
            <textarea id="job-description" name="description" placeholder="Description" rows="4"
                cols="50">${offer.description}</textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50">${offer.requirements}</textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${offer.salary} />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    const offer = await getById(id);

    ctx.render(editTemplate(offer, createSubmitHandler(onEdit)));

    async function onEdit({ title, imageUrl, category, description, requirements, salary }) {
        if ([title, imageUrl, category, description, requirements, salary].some(e => e == '')) {
            return alert('All fields are required!');
        }

        await edit(id, {
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary
        });

        ctx.page.redirect(`/catalog/${id}`);
    }

}