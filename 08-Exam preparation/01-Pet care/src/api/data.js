import { get, post, put, del } from "./api.js"

const endpoints = {
    'pets': '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    'byId': '/data/pets/',
    'create': '/data/pets',
    'addDonation': '/data/donation'
}

export async function getAll() {
    const result = await get(endpoints.pets);
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

export async function editPet(id, data) {
    const result = await put(endpoints.byId + id, data);
    return result;
}
