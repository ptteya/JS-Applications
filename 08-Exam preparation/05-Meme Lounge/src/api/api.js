import { getUserData, toggleNotification } from "./util.js";

const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    if (data !== undefined) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = getUserData()
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        //get network errors
        const response = await fetch(host + url, options);


        //means that there is no data and that the response is ok
        if (response.status == 204) {
            return response;
        }

        //if there is data
        const result = await response.json();

        if (response.ok == false) {
            const error = result.message;
            throw new Error(error);
        }

        return result;

    } catch (error) {
        // alert(error.message);
        toggleNotification(error.message);
        throw error;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');