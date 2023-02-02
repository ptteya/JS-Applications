import { get, post, put, del } from "./api.js"

const endpoints = {
    'memes': '/data/memes?sortBy=_createdOn%20desc',
    'byId': '/data/memes/',
    'create': '/data/memes',
    'ownMemes': (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
}

export async function getAll() {
    const result = await get(endpoints.memes);
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

export async function getOwnMemes(userId) {
    const result = await get(endpoints.ownMemes(userId));
    return result;
}
