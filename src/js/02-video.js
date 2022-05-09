import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

//Player initialization
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function() {
    console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

//Callback function, which save videoplayer current time to the localStorage
function saveVideoplayerCurrentTime(time) {
  localStorage.setItem('videoplayer-current-time', time.seconds);
  console.log(localStorage.getItem('videoplayer-current-time'));
};

//Function tracks current videoplayer time every 1250ms
player.on('timeupdate', throttle(saveVideoplayerCurrentTime, 1250)); 

let currentTime = localStorage.getItem('videoplayer-current-time')
console.log('Videoplayer current time:', currentTime);

if (currentTime != null) {
  player.setCurrentTime(currentTime);
}
  
 
    
 