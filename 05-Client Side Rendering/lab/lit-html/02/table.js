import { html } from 'https://unpkg.com/lit-html?module';

export const table = (items, onDelete) => html`
<table>
    ${items.map(i => tableRow(i, onDelete))}
</table>
`;

const tableRow = ({ name, id }, onDelete) => html`
<tr>
    <td>${name}</td>
    <td><button @click=${onDelete.bind(null, id)}>Delete</button></td>
</tr>`;


