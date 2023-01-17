import { render } from 'https://unpkg.com/lit-html?module';
import { table } from './table.js'

const data = [
    {
        name: 'Peter',
        id: 'asd1',
        canEdit: true,
        style: {
            color: 'red',
            border: '1px solid black'
        }
    },
    {
        name: 'Mary',
        id: 'asd2',
        canEdit: false,
        highlight: {
            active: true,
            content: false
        }

    },
    {
        name: 'Sami',
        id: 'asd3',
        canEdit: false
    }
];


const root = document.querySelector('main');
update();

function onClick(id) {
    const index = data.findIndex(i => i.id === id)
    data.splice(index, 1);
    update();
}

function update() {
    render(table(data, onClick), root);
}