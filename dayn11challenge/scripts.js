const player = document.querySelector('.player');
const progress = player.querySelector(".progress");
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const video = player.querySelector(`.player__video`);
const fullScreen = player.querySelector('.fullScreen');


video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));

video.addEventListener("timeupdate", handleProgress);

let mouseDown = false;
progress.addEventListener('mouseup',() => mouseDown = false);
progress.addEventListener('mousedown',() => mouseDown = true);

progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e) => mouseDown && scrub(e));


let fullscreenflag = false;

fullScreen.addEventListener('click',()=> { 
  player.classList.toggle("fullScreenMode");
});

function togglePlay(){
  if(video.paused){
    video.play();
  }
  else{
    video.pause();
  }
}

function updateButton()
{
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip);

}

function handleRangeUpdate(){
  video[this.name] = this.value; 
}

function handleProgress(){
  const percent = (video.currentTime/video.duration)*100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth)*video.duration;
  video.currentTime = scrubTime;
}

