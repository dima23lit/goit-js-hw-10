import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form')

function promise(delay, radio) {
    const promiseDelay = { delay, radio };
    
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (radio === "fulfilled") {
                res (promiseDelay)
            } else {
                rej (promiseDelay)
            }
        }, delay)
    })
}


form.addEventListener('submit', submitForm)


function submitForm(evt) {
    evt.preventDefault();

    const form = evt.target;
    const delay = Number(form.elements.delay.value);
    const radio = form.elements.state.value;

    promise(delay, radio)
        .then(({ delay }) => {
            iziToast.success({
                title: 'OK',
                message: `✅ Fulfilled promise in ${delay} ms`,
            });
        })
        .catch(({ delay }) => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay} ms`,
            });
        });

    form.reset();
}
