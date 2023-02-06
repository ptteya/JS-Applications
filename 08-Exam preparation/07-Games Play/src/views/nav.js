import { getUserData } from "../api/util.js";
import { html, render } from "../lib.js";

const header = document.querySelector('header');

const navTemplate = (hasUser) => html`
<h1><a class="home" href="/">GamesPlay</a></h1>
<nav>
    <a href="/catalog">All games</a>

    ${hasUser 
    ? html`
    <div id="user">
        <a href="/create">Create Game</a>
        <a href="/logout">Logout</a>
    </div>`
    : html`
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
</nav>
`;

export function updateNav() {
    const user = getUserData();
    render(navTemplate(user), header);
}