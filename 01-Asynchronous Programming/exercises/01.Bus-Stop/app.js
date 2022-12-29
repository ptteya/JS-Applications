async function getInfo() {
    const stopIdElement = document.querySelector('#stopId');
    const stopNameElement = document.querySelector('#stopName');
    const busesElement = document.querySelector('#buses');

    const stopId = stopIdElement.value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        busesElement.replaceChildren();
        stopIdElement.value = '';
        stopNameElement.textContent = data.name;

        Object.entries(data.buses).forEach(([busId, time]) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${time} minutes`;
            busesElement.appendChild(li);
        });
    } catch (error) {
        stopNameElement.textContent = 'Error';
        busesElement.replaceChildren();
        stopIdElement.value = '';
    }
}

