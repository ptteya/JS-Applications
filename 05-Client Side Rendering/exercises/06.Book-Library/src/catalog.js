import { deleteBook, getBooks, html } from './utility.js';
import { render } from './utility.js';

const catalogTemplate = (ctx) => html`
<button @click=${loadBooks.bind(null, ctx)} id="loadBooks">LOAD ALL BOOKS</button>
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>

    </tbody>
</table>`;

export function showCatalog(ctx) {
    return catalogTemplate(ctx);
}

async function loadBooks(ctx) {
    const tbody = document.querySelector('tbody');

    const data = await getBooks();

    const books = Object.entries(data).map(([k, v]) => Object.assign(v, { _id: k }));

    render(bookRow(books, ctx), tbody);
}

function bookRow(books, ctx) {
    return Object.values(books).map(book => html`
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button @click=${toggleEditor.bind(null, book, ctx)}>Edit</button>
            <button @click=${onDelete.bind(null, book._id, ctx)}>Delete</button>
        </td>
    </tr>`)
}

function toggleEditor(book, ctx) {
    ctx.book = book;
    ctx.update();
}

async function onDelete(id, ctx) {
    await deleteBook(id);
    ctx.update();
}