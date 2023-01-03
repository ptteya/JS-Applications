function attachEvents() {
    const forecastElement = document.querySelector('#forecast');
    document.querySelector('#submit').addEventListener('click', onGetWeatherClick);

    const currentForecastEl = document.querySelector('#current');
    const upcomingForecastEl = document.querySelector('#upcoming');

    let weatherSymbols = {
        'Sunny': '&#x2600;', // ☀
        'Partly sunny': '&#x26C5;', // ⛅
        'Overcast': '&#x2601;',  // ☁
        'Rain': '&#x2614;',  // ☂
        'Degrees': '&#176;'    // °
    }

    async function onGetWeatherClick() {
        const city = document.querySelector('#location').value;

        try {
            const url = 'http://localhost:3030/jsonstore/forecaster/locations';

            const response = await fetch(url);
            const data = await response.json();

            const cityInfo = data.find(x => x.name == city);

            if (!cityInfo) {
                throw new Error('City not found');
            }

            forecastElement.style.display = 'block';

            createForecasts(cityInfo.code)
        } catch (error) {
            forecastElement.style.display = 'block';

            currentForecastEl.children[0].textContent = 'Error';

            if (currentForecastEl.children.length > 1) {
                currentForecastEl.children[1].remove();
            }

            if (upcomingForecastEl.children.length > 1) {
                upcomingForecastEl.children[1].remove();
            }
        }
    }

    async function createForecasts(code) {
        const urlCurrent = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
        const urlUpcoming = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

        const responseCurrent = await fetch(urlCurrent);
        const dataCurrent = await responseCurrent.json();

        const responseUpcoming = await fetch(urlUpcoming);
        const dataUpcoming = await responseUpcoming.json();

        const currentForecastHTML = createCurrentForecastHTML(dataCurrent);
        currentForecastEl.appendChild(currentForecastHTML);

        const threeDayForecastHTML = createThreeDayForecastHTML(dataUpcoming);
        upcomingForecastEl.appendChild(threeDayForecastHTML);
    }

    function createCurrentForecastHTML(data) {
        if (currentForecastEl.children.length > 1) {
            currentForecastEl.children[1].remove();
        }

        if (currentForecastEl.children[0].textContent == 'Error') {
            currentForecastEl.children[0].textContent = 'Current conditions';
        }

        const { condition, high, low } = data.forecast;

        const divElement = createEl('div', '', ['forecasts']);

        const spanSymbol = createEl('span', weatherSymbols[data.forecast.condition], ['condition', 'symbol']);

        const spanCondition = createEl('span', '', ['condition']);

        const spanLocation = createEl('span', data.name, ['forecast-data']);

        const spanDegrees = createEl('span', `${low}${weatherSymbols.Degrees}/${high}${weatherSymbols.Degrees}`, ['forecast-data']);

        const spanWeather = createEl('span', condition, ['forecast-data']);

        spanCondition.appendChild(spanLocation);
        spanCondition.appendChild(spanDegrees);
        spanCondition.appendChild(spanWeather);

        divElement.appendChild(spanSymbol);
        divElement.appendChild(spanCondition);

        return divElement;
    }

    function createThreeDayForecastHTML(data) {
        if (upcomingForecastEl.children.length > 1) {
            upcomingForecastEl.children[1].remove();
        }

        const divElement = createEl('div', '', ['forecast-info']);

        data.forecast.forEach(x => {
            const spanUpcoming = createEl('span', '', ['upcoming']);

            const symbolSpan = createEl('span', weatherSymbols[x.condition], ['symbol']);

            const degreesSpan = createEl('span', `${x.low}${weatherSymbols.Degrees}/${x.high}${weatherSymbols.Degrees}`, ['forecast-data']);

            const weatherSpan = createEl('span', x.condition, ['forecast-data']);

            spanUpcoming.appendChild(symbolSpan);
            spanUpcoming.appendChild(degreesSpan);
            spanUpcoming.appendChild(weatherSpan);

            divElement.appendChild(spanUpcoming);

        });

        return divElement;
    }

    function createEl(type, content, attributes) {
        const element = document.createElement(type);
        element.innerHTML = content;

        if (attributes.length !== 0) {
            attributes.forEach(a => {
                element.classList.add(a);
            })
        }

        return element;
    }
}

attachEvents();