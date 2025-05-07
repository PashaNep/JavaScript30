let countdown;
const timeDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const input = document.customForm;

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + (seconds * 1000);
    displayTimeLeft(seconds);
    displayTimeEnd(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            timeDisplay.textContent = '0';
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemain = seconds % 60;
    const display = `${minutes}:${secondsRemain < 10 ? `0${secondsRemain}` : secondsRemain}`;
    document.title = display;
    timeDisplay.textContent = display;
}

function displayTimeEnd(timeFinish) {
    const end = new Date(timeFinish);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTimeDisplay.textContent = `Timer finishes at ${hours}:${minutes}`;
}

function startTimer() {
    const time = this.dataset.time;
    timer(time);
}

buttons.forEach(button => button.addEventListener('click', startTimer))
input.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});
timer(300);