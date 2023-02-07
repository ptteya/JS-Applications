import { get, post } from "./api.js";

const endpoints = {
    'add': '/data/likes',
    'albumLikes': (albumId) => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    'userLikes': (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function addLike(albumId) {
    return await post(endpoints.add, { albumId });
}

export async function getAlbumLikes(albumId) {
    return await get(endpoints.albumLikes(albumId));
}

export async function getUserLikes(albumId, userId) {
    return await get(endpoints.userLikes(albumId, userId));
}

