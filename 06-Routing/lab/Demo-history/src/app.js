//detect url changes and notify application
//change url on application content swap

const main = document.querySelector('main');
document.querySelector('nav').addEventListener('click', onNavigate);
window.addEventListener('popstate', onPopstate);

const views = {
    '/': () => '<h2>Home Page</h2>',
    '/catalog': () => '<h2>Catalog Page</h2>',
    '/about': () => '<h2>About Page</h2>'
}

//start application in previous view
onPopstate();

function onNavigate(event) {
    if (event.target.tagName == 'A') {
        const url = new URL(event.target.href);
        const path = url.pathname;

        if (showView(path)) {
            event.preventDefault();
            history.pushState(null, '', path)
        }
    }
}

function showView(name) {
    const view = views[name];
    if (typeof view == 'function') {
        main.innerHTML = view();
        return true;
    } else {
        return false;
    }
}

function onPopstate() {
    const startingView = window.location.pathname;
    showView(startingView);
}