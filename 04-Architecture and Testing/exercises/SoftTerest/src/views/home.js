const section = document.querySelector('#homePage');
section.remove();

export function showHomeView(context) {
    context.showSection(section);
}