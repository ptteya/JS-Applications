function solve() {
    const departButton = document.querySelector('#depart');
    const arriveButton = document.querySelector('#arrive');
    const infoBoxElement = document.querySelector('.info');
    
    let stop = {
        name: '',
        next: 'depot'
    }

    async function depart() {
        const baseUrl = `http://localhost:3030/jsonstore/bus/schedule`;

        try {
            const res = await fetch(`${baseUrl}/${stop.next}`);
            stop = await res.json();

            infoBoxElement.textContent = `Next stop ${stop.name}`;

            departButton.disabled = true;
            arriveButton.disabled = false;
        } catch (error) {
            infoBoxElement.textContent = `Error`;
            departButton.disabled = true;
            arriveButton.disabled = true;
        }
    }

    function arrive() {
        departButton.disabled = false;
        arriveButton.disabled = true;

        infoBoxElement.textContent = `Arriving at ${stop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();