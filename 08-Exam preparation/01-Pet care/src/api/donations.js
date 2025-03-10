import { get, post } from "./api.js";

export async function getDonations(petId) {
    return get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export async function addDonation(petId) {
    return post('/data/donation', { petId });
}

export async function getOwnDonation(petId, userId) {
    return get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

