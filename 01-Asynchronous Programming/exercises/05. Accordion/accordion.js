function solution() {
    let mainSection = document.querySelector('#main');

    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(res => res.json())
        .then(data => {

            data.forEach(d => {
                let divAccordion = createEl('div', '', ['class', 'accordion']);
                let headDivElement = createEl('div', '', ['class', 'head']);
                let spanElement = createEl('span', d.title);
                let moreButton = createEl('button', 'MORE', ['class', 'button', 'id', d['_id']]);

                moreButton.addEventListener('click', onClick);

                let extraDivElement = createEl('div', '', ['class', 'extra']);
                let pElement = createEl('p', '');

                headDivElement.appendChild(spanElement);
                headDivElement.appendChild(moreButton);

                extraDivElement.appendChild(pElement);

                divAccordion.appendChild(headDivElement);
                divAccordion.appendChild(extraDivElement);

                mainSection.appendChild(divAccordion);
            })
        })


    function onClick(ev) {
        let id = ev.target.id;
        let divExtra = ev.target.parentElement.parentElement.children[1];
        let p = divExtra.children[0];

        fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`)
            .then(res => res.json())
            .then(data => {
                p.textContent = data.content;
            })

        let isHidden = ev.target.textContent === 'MORE';

        ev.target.textContent = isHidden ? 'LESS' : 'MORE';
        divExtra.style.display = isHidden ? 'block' : 'none';
    }

    function createEl(type, content, attributes = []) {
        let element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i += 2) {
                element.setAttribute(attributes[i], attributes[i + 1]);
            }
        }

        return element;
    }
}

solution();

//async-await
// async function solution() {
//     let mainSection = document.querySelector('#main');

//     let response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
//     let data = await response.json();

//     data.forEach(d => {
//         let divAccordion = createEl('div', '', ['class', 'accordion']);
//         let headDivElement = createEl('div', '', ['class', 'head']);
//         let spanElement = createEl('span', d.title);
//         let moreButton = createEl('button', 'MORE', ['class', 'button', 'id', d['_id']]);

//         moreButton.addEventListener('click', onClick);

//         let extraDivElement = createEl('div', '', ['class', 'extra']);
//         let pElement = createEl('p', '');

//         divAccordion.appendChild(headDivElement);
//         headDivElement.appendChild(spanElement);
//         headDivElement.appendChild(moreButton);
//         divAccordion.appendChild(extraDivElement);
//         extraDivElement.appendChild(pElement)
//         mainSection.appendChild(divAccordion);
//     });

//     async function onClick(ev) {
//         let id = ev.target.id;
//         let divExtra = ev.target.parentElement.parentElement.children[1];
//         let p = divExtra.children[0];

//         let response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);
//         let data = await response.json();

//         p.textContent = data.content;

//         let isHidden = ev.target.textContent === 'MORE';

//         ev.target.textContent = isHidden ? 'LESS' : 'MORE';
//         divExtra.style.display = isHidden ? 'block' : 'none';
//     }

//     function createEl(type, content, attributes = []) {
//         let element = document.createElement(type);

//         if (content) {
//             element.textContent = content;
//         }

//         if (attributes.length > 0) {
//             for (let i = 0; i < attributes.length; i += 2) {
//                 element.setAttribute(attributes[i], attributes[i + 1]);
//             }
//         }

//         return element;
//     }
// }

// solution();