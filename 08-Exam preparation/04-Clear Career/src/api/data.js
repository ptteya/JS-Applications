import { del, get, post, put } from "./api.js";

const endPoints = {
    'getAll': '/data/offers?sortBy=_createdOn%20desc',
    'create': '/data/offers',
    'byId': '/data/offers/',
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