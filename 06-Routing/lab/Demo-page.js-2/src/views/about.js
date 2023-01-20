import { html } from '../lib.js';

const aboutTemplate = () => html`<h2>About</h2>`

export function showAbout(ctx) {
    ctx.render(aboutTemplate());
}