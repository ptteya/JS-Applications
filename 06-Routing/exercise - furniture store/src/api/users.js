import * as api from './api.js';

const endpoints = {
    'register': '/users/register',
    'login': '/users/login',
    'logout': '/users/logout'
}

export async function register(email, password) {
    const user = await api.post(endpoints.register, { email, password });
    localStorage.setItem('user', JSON.stringify(user));
}

export async function login(email, password) {
    const user = await api.post(endpoints.login, { email, password });
    localStorage.setItem('user', JSON.stringify(user));
}

export async function logout() {
    api.get(endpoints.logout);
    localStorage.removeItem('user');
}