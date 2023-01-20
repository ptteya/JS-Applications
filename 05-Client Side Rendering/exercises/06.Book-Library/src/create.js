import { createBook, html } from './utility.js';

const createTemplate = () => html`
<form @submit=${onSubmit} id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>`;

let context = null;

export function showCreate(ctx) {
    if (ctx.book == undefined) {
        context = ctx;
        return createTemplate();
    } else {
        return null;
    }
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { title, author } = Object.fromEntries(formData);

    await createBook({ title, author });

    event.target.reset();

    context.update();
}