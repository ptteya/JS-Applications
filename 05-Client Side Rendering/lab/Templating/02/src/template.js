const placeHolderPattern = /%%(.+?)%%/g;

const templates = {};

export async function render(templateName, ctx) {
    const html = await loadTemplate(templateName);

    const result = html.replace(placeHolderPattern, replacer);

    return result;

    function replacer(match, name) {
        const value = ctx[name];
        if (value !== undefined) {
            return escapeHtml(value);
        } else {
            return match;
        }
    }
}

async function loadTemplate(name) {
    if (!templates.hasOwnProperty(name)) {
        const response = await fetch(`/views/${name}.html`);
        templates[name] = await response.text();
    }

    return templates[name];
}

function escapeHtml(html) {
    return html.toString()
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
}