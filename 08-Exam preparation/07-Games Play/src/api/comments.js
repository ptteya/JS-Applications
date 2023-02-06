import { get, post } from "./api.js";

export async function getComments(gameId) {
    return await get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function addComment(gameId, comment) {
    return await post('/data/comments', { gameId, comment });
}

