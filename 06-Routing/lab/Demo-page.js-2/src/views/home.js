import { html } from '../lib.js';

const homeTemplate = () => html`<h2>Home</h2><button>Click me</button>`


export function showHome(ctx) {
    ctx.render(homeTemplate());
    document.querySelector('button').addEventListener('click', () => {
        ctx.page.redirect('/recipes');
    });
}