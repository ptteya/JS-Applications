import { page, render } from './lib.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { updateNav } from './views/nav.js';
import { showRegister } from './views/register.js';
import { showSearch } from './views/search.js';
import { logout } from './api/user.js';
// import { getUserData } from './api/util.js';

const main = document.querySelector('main');

page(decorateContext);
page('/index.html', '/');
page('/', showHome);
page('/catalog', showCatalog);
page('/catalog/:id', showDetails);
page('/edit/:id', showEdit);
page('/search', showSearch);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);
page('/logout', onLogout);

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    // const user = getUserData();
    // if (user) {
    //     ctx.user = user;
    // }

    next();
}

function renderMain(content) {
    render(content, main);
}

async function onLogout() {
    await logout();
    updateNav();
    page.redirect('/catalog');
}