import { create } from "../api/data.js";
import { createSubmitHandler, toggleNotification } from "../api/util.js";
import { html } from "../lib.js";

const createTemplate = (onCreate) => html`
<section id="create-meme">
    <form @submit=${onCreate} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;

export function showCreate(ctx) {

    ctx.render(createTemplate(createSubmitHandler(onCreate)));

    async function onCreate({ title, description, imageUrl }) {
        if (!title || !description || !imageUrl) {
            toggleNotification('All fields are required!');
            return;
        }

        await create({
            title,
            description,
            imageUrl
        });

        ctx.page.redirect('/catalog');
    }
}