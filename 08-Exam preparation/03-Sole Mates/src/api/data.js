import { del, get, post, put } from "./api.js";

const endPoints = {
    'getAll': '/data/shoes?sortBy=_createdOn%20desc',
    'create': '/data/shoes',
    'byId': '/data/shoes/',
    'search': (query) => `/data/shoes?where=brand%20LIKE%20%22${query}%22`
}

export async function getAll() {
    return get(endPoints.getAll);
}

export async function create(data) {
    return post(endPoints.create, data);
}

export async function getById(id) {
    return get(endPoints.byId + id);
}

export async function edit(id, data) {
    return put(endPoints.byId + id, data);
}

export async function deleteById(id) {
    return del(endPoints.byId + id);
}

export async function search(query) {
    return get(endPoints.search(query));
}