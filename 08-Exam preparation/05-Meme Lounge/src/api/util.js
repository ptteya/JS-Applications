export function getUserData() {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    return data;
}
export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}
export function clearUserData() {
    sessionStorage.removeItem('userData');
}

export function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        callback(data);
    }
}

export function toggleNotification(message) {
    const notification = document.querySelector('.notification');
    const errorMessage = document.querySelector('#errorBox span');

    errorMessage.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}