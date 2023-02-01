import { getUserData } from "../api/util.js";
import { html, render } from "../lib.js";

const header = document.querySelector('header');

const navTemplate = (hasUser) => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.jpg" alt="" /></a>

<nav>
    <div>
        <a href="/catalog">Dashboard</a>
    </div>

    ${hasUser
    ? html`
    <div class="user">
        <a href="/create">Create Offer</a>
        <a href="/logout">Logout</a>
    </div>`
    : html`
    <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
</nav>`;

export function updateNav() {
    const user = getUserData();
    render(navTemplate(user), header);
}