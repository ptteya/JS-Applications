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

    // const user = localStorage.getItem('user');
    // const token = user.token;

    // if (user) {
    //     options.headers['X-Authorization'] = token;
    // }

    try {
        const response = await fetch(host + url, options);

        if (response.status == 204) {
            return response;
        }

        const data = await response.json();

        if (response.ok != true) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');