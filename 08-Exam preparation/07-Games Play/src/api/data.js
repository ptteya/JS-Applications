import { get, post, put, del } from "./api.js"

const endpoints = {
    'latestGames': '/data/games?sortBy=_createdOn%20desc&distinct=category',
    'allGames': '/data/games?sortBy=_createdOn%20desc',
    'byId': '/data/games/',
    'create': '/data/games',
}

export async function getLatest() {
    const result = await get(endpoints.latestGames);
    return result;
}

export async function getAll() {
    const result = await get(endpoints.allGames);
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
