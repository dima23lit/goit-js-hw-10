// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');
const inputNumber = document.querySelector('[name="delay"]');

inputNumber.setAttribute("min", 0);


form.addEventListener('submit', handleForm);

function handleForm(event) {
    event.preventDefault()

    const promis = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (event.target.elements.state.value === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${event.target[0].value}ms`)
            } else {
                reject(`❌ Rejected promise in ${event.target[0].value}ms`)
            }
        }, Number(event.target[0].value))
    })

    promis
        .then((result) => {
            iziToast.show({
                message: result,
                position: 'topRight',
                backgroundColor: '#59A10D',
                titleColor: '#fff',
                messageColor: '#fff'
            });
        })
        .catch((error) => {
            iziToast.show({
                message: error,
                position: 'topRight',
                backgroundColor: '#EF4040',
                titleColor: '#fff',
                messageColor: '#fff'
            });
        })
}