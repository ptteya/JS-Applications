document.querySelector('#form').addEventListener('submit', onSubmitClick);

async function extractStudents() {
    const url = 'http://localhost:3030/jsonstore/collections/students';

    const tbody = document.querySelector('#results tbody');
    tbody.replaceChildren();

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(x => createTableRow(x.firstName, x.lastName, x.facultyNumber, x.grade));
}

function onSubmitClick(event) {
    event.preventDefault();

    const form = document.querySelector('#form');
    const formData = new FormData(form);

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    if (firstName !== '' && lastName !== '' && facultyNumber !== '' && grade !== '') {
        addNewStudent(firstName, lastName, facultyNumber, grade);
        form.reset();
    }
}

async function addNewStudent(fName, lName, fNumber, grade) {
    const url = 'http://localhost:3030/jsonstore/collections/students';

    const body = {
        firstName: fName,
        lastName: lName,
        facultyNumber: fNumber,
        grade: grade
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    extractStudents();
}

function createTableRow(fName, lName, fNumber, grade) {
    const tbody = document.querySelector('#results tbody');

    const tr = document.createElement('tr');

    createEl('td', fName, tr);
    createEl('td', lName, tr);
    createEl('td', fNumber, tr);
    createEl('td', grade, tr);

    tbody.appendChild(tr);
}

function createEl(type, content, parent) {
    const element = document.createElement(type);
    element.textContent = content;
    parent.appendChild(element);
    return element;
}

extractStudents();