const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    if (data !== undefined) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    //authorization 
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const token = user.accessToken;
        options.headers['X-Authorization'] = token;
    }

    try {
        const response = await fetch(host + url, options);

        //server error
        if (response.ok != true) {
            //if token is invalid
            if (response.status == 403) {
                localStorage.removeItem('user');
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        // on logout the server returns code 204 which means that the response is empty and response.json() will throw error
        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

const get = request.bind(null, 'get');
const post = request.bind(null, 'post');
const put = request.bind(null, 'put');
const del = request.bind(null, 'delete');

export {
    get,
    post,
    put,
    del as delete
};