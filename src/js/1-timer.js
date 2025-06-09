// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector('.btn');
const daysD = document.querySelector('[data-days]');
const hoursD = document.querySelector('[data-hours]');
const minutesD = document.querySelector('[data-minutes]');
const secondsD = document.querySelector('[data-seconds]');
const datetimePicker = document.querySelector('#datetime-picker');
let isActive = false;


btn.disabled = true;

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (options.defaultDate < selectedDates[0]) {
            btn.disabled = false;
            userSelectedDate = selectedDates[0];
        } else {
            btn.disabled = true;
            // alert("Please choose a date in the future")
            iziToast.show({
                message: 'Please choose a date in the future',
                position: 'topRight',
                backgroundColor: '#EF4040',
                titleColor: '#fff',
                messageColor: '#fff',
                close: true
            });
        }
    }
  };

flatpickr("#datetime-picker", options);


btn.addEventListener('click', handlerTimer);


function handlerTimer() {
    if (isActive) {
        return
    }

    isActive = true;

    const userSelectedDateMS = userSelectedDate.getTime();
    let time;
    let deltaTime
    let timerInterval = setInterval(() => {
        let currentTime = Date.now()
        deltaTime = userSelectedDateMS - currentTime;
        time = convertMs(deltaTime);
        timerText(time)
        btn.disabled = true;
        datetimePicker.disabled = true;

        if (time.days <= 0 && time.hours <= 0 && time.minutes <= 0 && time.seconds <= 0) {
            clearInterval(timerInterval)
            datetimePicker.disabled = false;
        }

    }, 1000
    )
}


function timerText({ days, hours, minutes, seconds }) {
    daysD.innerHTML = addLeadingZero(days);
    hoursD.innerHTML = addLeadingZero(hours);
    minutesD.innerHTML = addLeadingZero(minutes);
    secondsD.innerHTML = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}