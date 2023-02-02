import { logout } from './api/user.js';
import { getUserData } from './api/util.js';
import { page, render } from './lib.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showProfile } from './views/profile.js';
import { showRegister } from './views/register.js';

const main = document.querySelector('main');

page(decorateContext);
page('/', showHome);
page('/catalog', showCatalog);
page('/catalog/:id', showDetails);
page('/edit/:id', showEdit);
page('/create', showCreate);
page('/profile', showProfile);
page('/login', showLogin);
page('/register', showRegister);
page('/logout', onLogout);

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    next();
}

function renderMain(content) {
    render(content, main);
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}

function updateNav() {
    const user = getUserData();
    const userNav = document.querySelector('.user');
    const guestNav = document.querySelector('.guest');

    if (user) {
        userNav.style.display = 'block';
        guestNav.style.display = 'none';

        const welcomeMessage = userNav.querySelector('span');
        welcomeMessage.textContent = `Welcome, ${user.email}`
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'block';
    }
}
