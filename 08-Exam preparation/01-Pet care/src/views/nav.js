import { logout } from "../api/user.js";
import { getUserData } from "../api/util.js";
import { html, render ,page} from "../lib.js";

const header = document.querySelector('header');

const navTemplate = (hasUser) => html` 
<nav>
    <section class="logo">
        <img src="./images/logo.png" alt="logo">
    </section>
    <ul>
        <!--Users and Guest-->
        <li><a href="/">Home</a></li>
        <li><a href="/catalog">Dashboard</a></li>
        ${!hasUser 
            ? html`
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>`
            : html`
            <li><a href="/create">Create Postcard</a></li>
            <li><a @click=${onLogout} href="javascript:void(0)">Logout</a></li>`}
        <!-- javascript:void(0) - link that does nothing-->
    </ul>
</nav>`

export function updateNav() {
    const user = getUserData();

    render(navTemplate(user), header)
}

function onLogout() {
    //because of javascript:void(0) we don't need event.preventDefault()

    logout();
    updateNav();
    page.redirect('/');
}
