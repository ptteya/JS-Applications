import { del, get, post, put } from "./api.js";

const endPoints = {
    'getAll': '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    'create': '/data/albums',
    'byId': '/data/albums/',
    'search': (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`
}

export async function getAll() {
    return get(endPoints.getAll);
}

export async function create(data) {
    return post(endPoints.create, data);
}

export async function getAlbumById(id) {
    return get(endPoints.byId + id);
}

export async function editAlbum(id, data) {
    return put(endPoints.byId + id, data);
}

export async function deleteById(id) {
    return del(endPoints.byId + id);
}

export async function searchAlbum(query) {
    return get(endPoints.search(query));
}