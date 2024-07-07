const inputDatetime = document.querySelector('#datetime-picker');
const btnDataStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('.value[data-days]');
const dataHours = document.querySelector('.value[data-hours]');
const dataMinutes = document.querySelector('.value[data-minutes]');
const dataSeconds = document.querySelector('.value[data-seconds]');

btnDataStart.disabled = true


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (options.defaultDate > selectedDates[0]) {
        btnDataStart.disabled = true
        iziToast.error({
        title: 'Error',
        message: "Please choose a date in the future",
 });
        } else {
        btnDataStart.disabled = false
        iziToast.success({
        title: 'OK',
        message: 'Successfully!',
 });
      }  
      console.log(options.defaultDate)
      console.log(selectedDates[0]);
  },
};

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

flatpickr("#datetime-picker", options);


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

btnDataStart.addEventListener('click', getTime);

const addLeadingZero = value => value.toString().padStart(2, "0");

function getTime() {
  btnDataStart.disabled = true;
  inputDatetime.disabled = true;

  const timer = setInterval(() => {
        const currentDate = new Date();
        const targetDate = new Date(inputDatetime.value);
        const timeEnd = targetDate - currentDate;

        const { days, hours, minutes, seconds } = convertMs(timeEnd);

        dataDays.textContent = addLeadingZero(days);
        dataHours.textContent = addLeadingZero(hours);
        dataMinutes.textContent = addLeadingZero(minutes);
        dataSeconds.textContent = addLeadingZero(seconds);

        const isTimerFinished = [days, hours, minutes, seconds].every(value => value === 0);

        if (isTimerFinished) {
            clearInterval(timer);
            inputDatetime.disabled = false;
        }
    }, 1000);
}