export function createHTML(type, content, attributes, parent) {
    const element = document.createElement(type);
    element.textContent = content;

    if (attributes && attributes.length > 0) {
        attributes.forEach(([attribute, value]) => element.setAttribute(attribute, value));
    }

    if (parent) {
        parent.appendChild(element);
    }

    return element;
}
