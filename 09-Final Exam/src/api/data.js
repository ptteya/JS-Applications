import { get, post, put, del } from "./api.js"

const endpoints = {
    'getAll': '/data/albums?sortBy=_createdOn%20desc',
    'byId': '/data/albums/',
    'create': '/data/albums',
}

export async function getAll() {
    const result = await get(endpoints.getAll);
    return result;
}

export async function getById(id) {
    const result = await get(endpoints.byId + id);
    return result;
}

export async function deleteById(id) {
    const result = await del(endpoints.byId + id);
    return result;
}

export async function create(data) {
    const result = await post(endpoints.create, data);
    return result;
}

export async function edit(id, data) {
    const result = await put(endpoints.byId + id, data);
    return result;
}
