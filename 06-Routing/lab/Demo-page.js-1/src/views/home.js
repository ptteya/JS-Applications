export function showHome(ctx) {
    ctx.render('<h2>Home</h2><button>Click me</button>');
    document.querySelector('button').addEventListener('click', () => {
        ctx.page.redirect('/catalog');
    });
}