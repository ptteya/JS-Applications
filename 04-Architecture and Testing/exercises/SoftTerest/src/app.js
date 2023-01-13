import * as api from './api/users.js';
import { initialize } from './router.js';
import { showCatalogView } from './views/catalog.js';
import { showCreateView } from './views/create.js';
import { showDetailsView } from './views/details.js';
import { showHomeView } from './views/home.js';
import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { logout } from './api/users.js'

const views = {
    '/': showHomeView,
    '/catalog': showCatalogView,
    '/login': showLoginView,
    '/register': showRegisterView,
    '/details': showDetailsView,
    '/create': showCreateView,
    '/logout': onLogout
};

const router = initialize(views);
router.updateNav();

//start application in home view
router.goTo('/');

function onLogout() {
    logout();
    router.updateNav();
    router.goTo('/');
}

