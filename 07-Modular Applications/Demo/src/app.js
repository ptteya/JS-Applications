import page from '../node_modules/page/page.mjs';
import { render } from './lib.js';
import { getUserData } from './util.js';

import { showAbout } from './views/about.js';
import { showCatalog } from './views/catalog.js';
import { showDetails } from './views/details.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { notFound } from './views/notFound.js';

function decorateContext(ctx, next) {
    ctx.render = function (content) {
        render(content, document.querySelector('main'));
    };
    next();
}

function parseQuery(ctx, next) {
    ctx.query = {};
    if (ctx.querystring) {
        const query = Object.fromEntries(ctx.querystring.split('&').map(e => e.split('=')));
        Object.assign(ctx.query, query);
    }
    next();
}

function session(ctx, next) {
    const user = getUserData();

    if (user) {
        ctx.user = user;
    }

    next();
}

page(decorateContext);
page(parseQuery);
page(session);
page('/index.html', '/'); //redirect
page('/', showHome);
page('/recipes', showCatalog);
page('/recipes/:id', showDetails);
page('/about', showAbout);
page('/login', showLogin);
page('*', notFound);

page.start();