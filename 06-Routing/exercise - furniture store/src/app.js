import page from '../node_modules/page/page.mjs';
import { render } from './lib.js';
import { showCatalog } from './views/catalog.js';
import { onDelete, showDetails } from './views/details.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { logout } from './api/users.js';
import { showCreate } from './views/createFurniture.js';
import { showEdit } from './views/edit.js';
import { showMyPublications } from './views/myPublications.js';

document.querySelector('#logoutBtn').addEventListener('click', onLogout);

function decorateContext(ctx, next) {
    ctx.render = function (content) {
        render(content, document.querySelector('.container'))
    }
    ctx.updateNav = updateNav;
    next();
}

page(decorateContext);
page('/index.html', '/');
page('/', showCatalog);
page('/catalog/:id', showDetails);
page('/my-publications', showMyPublications);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);
page('/edit/:id', showEdit);
page('/delete/:id', onDelete);

page.start();
updateNav();

function updateNav() {
    const userNav = document.querySelector('#user');
    const guestNav = document.querySelector('#guest');

    const user = localStorage.getItem('user');
    if (user) {
        userNav.style.display = 'inline-block';
        guestNav.style.display = 'none';
    } else {
        guestNav.style.display = 'inline-block';
        userNav.style.display = 'none';
    }
}

function onLogout(event) {
    event.preventDefault();
    logout();
    updateNav();
    page.redirect('/');
}