// export function validateInput(input) {
//     if (input.make.length < 4) {
//         alert('Make must be at least four symbols!');
//         return;
//     } else if (input.model.length < 4) {
//         alert('Model must be at least four symbols!');
//         return;
//     }

//     if (input.year < 1950 && input.year > 2050) {
//         alert('Year must be between 1950 and 2050!');
//         return;
//     }

//     if (input.description < 10) {
//         alert('Description must be more than 10 symbols')
//         return;
//     }

//     if (input.price < 0) {
//         alert('Price must be a positive number!');
//         return;
//     }

//     if (!input.img) {
//         alert('URL is required!');
//         return;
//     }

//     return true;
// }

export function validateInput(data) {
    let validate = {
        make: '',
        model: '',
        year: '',
        description: '',
        price: '',
        img: '',
    };


    validate.make = data.make.length >= 4 ? 'valid' : 'notValid';
    validate.model = data.model.length >= 4 ? 'valid' : 'notValid';
    validate.year = (Number(data.year) >= 1950 && Number(data.year) <= 2050) ? 'valid' : 'notValid';
    validate.description = data.description.length >= 10 ? 'valid' : 'notValid';
    validate.price = Number(data.price) > 0 ? 'valid' : 'notValid';
    validate.img = data.img !== '' ? 'valid' : 'notValid';

    if (data.material !== '') {
        validate.material = 'valid';
    }

    return validate;
}