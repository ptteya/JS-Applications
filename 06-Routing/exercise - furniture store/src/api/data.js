import * as api from "./api.js";

const endpoints = {
    'catalog': '/data/catalog',
    'getById': '/data/catalog/',
    'myFurniture': '/data/catalog?where=_ownerId%3D%22',
}

export async function createItem(data) {
    return await api.post(endpoints.catalog, data);
}

export async function getAllItems() {
    return await api.get(endpoints.catalog);
}

export async function itemDetails(id) {
    return await api.get(endpoints.getById + id);
}

export async function updateItem(id, data) {
    return await api.put(endpoints.getById + id, data);
}

export async function deleteItem(id) {
    return await api.del(endpoints.getById + id);
}

export async function getMyItems() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const userId = user._id;
        const id = `${userId}%22`;
        return await api.get(endpoints.myFurniture + id);
    }
}