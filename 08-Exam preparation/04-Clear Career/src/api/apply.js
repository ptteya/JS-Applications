import { get, post } from "./api.js";

export async function addApplication(offerId) {
    return await post('/data/applications', { offerId });
}

export async function getTotal(offerId) {
    return await get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);
}

export async function getTotalForUser(offerId, userId) {
    return await get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

// /data/applications?where=offerId%3D%22136777f5-3277-42ad-b874-76d043b069cb%22&distinct=_ownerId&count