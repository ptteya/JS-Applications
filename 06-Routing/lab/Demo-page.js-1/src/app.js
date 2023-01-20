import page from '../node_modules/page/page.mjs';

import { showAbout } from './views/about.js';
import { showCatalog } from './views/catalog.js';
import { showDetails } from './views/details.js';
import { showHome } from './views/home.js';
import { notFound } from './views/notFound.js';

function decorateContext(ctx, next) {
    ctx.render = function (content) {
        document.querySelector('main').innerHTML = content;
    }
    next();
}

page(decorateContext); // everyone will have it
page('/index.html', '/'); //redirect
page('/', showHome);
page('/catalog', showCatalog);
page('/catalog/:categoryId/:productId', showDetails);
page('/about', showAbout);
page('*', notFound);

page.start();