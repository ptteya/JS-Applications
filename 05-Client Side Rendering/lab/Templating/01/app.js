import { data, nav as links } from './data.js';

start();

function start() {
    const main = document.querySelector('main');
    main.replaceChildren(...data.map(articleTemplate));

    const nav = document.querySelector('nav ul');
    nav.replaceChildren(...links.map(navTemplate));
}

function articleTemplate(article) {
    const articleEl = document.createElement('article');

    const h2 = document.createElement('h2');
    h2.textContent = article.title;

    const div = document.createElement('div');
    div.classList.add('content');

    const p = document.createElement('p');
    p.textContent = article.content;

    const footer = document.createElement('footer');
    footer.textContent = `Author: ${article.author}`;

    div.appendChild(p);

    articleEl.appendChild(h2);
    articleEl.appendChild(div);
    articleEl.appendChild(footer);

    return articleEl;
}

function navTemplate(nav) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', nav.href);
    a.textContent = nav.label;

    li.appendChild(a);
    return li;
}