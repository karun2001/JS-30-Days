let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds){
    clearInterval(countdown);
    const now = Date.now(); //it returns timestamp in milliseconds elapsed from jan1 1970
    const then = now + seconds*1000; //making seconds to milliseconds
    displayTimeLeft(seconds);
    displayEndTime(then);
    countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now())/1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000);
}
function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = seconds%60;
    const display = `${minutes}:${remainingSeconds<10 ? '0' : ''}${remainingSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timeStamp){
    const end = new Date(timeStamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent =  `Be back at ${hour}:${minutes<10?'0':''}${minutes}`;
}

buttons.forEach(button => button.addEventListener("click", startTimer));

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins*60);
})