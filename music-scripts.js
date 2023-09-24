let playerMusic = document.getElementById('player-music');
const playIcon = document.getElementById("play-icon");
let songTime = document.getElementById("time-remaining");

let duration;
let currentSongIndex = 0;

const previousSong = document.getElementById("player-prev")
const nextSong = document.getElementById("player-next")
const currentSong = document.getElementById("player-song");
const currentArtist = document.getElementById("player-artist");
const currentCover = document.getElementById("player-cover");
const nextSongText = document.getElementById("next-song-queue");
let playHead = document.getElementById("playhead");

let recentArtist = document.querySelectorAll("#playlist-list > div > div:nth-child(1) p.remark");
let recentSong = document.querySelectorAll("#playlist-list > div > div:nth-child(1) p.regular-text");
let recentImage = document.querySelectorAll("#playlist-list > div > div:nth-child(1) img.icon-box-40.rad-6");
let recentSongPlayIcon = document.querySelectorAll("#playlist-list > div > div:nth-child(1) > div.align-center.relative.pointer > img.transform-center.z-1.absolute");


// Audio player - play/ pause audio & change icon

function playAudio() {
  recentSongPlayIcon.forEach((icon) => {
    icon.src = "assets/icons/player-play.svg"
  })

  const songId = songCollection.findIndex(x => playerMusic.src.endsWith(x.src));
  const recentPlayIcon = recentSongPlayIcon[songId];

  console.log(songId, recentPlayIcon);

  if (playerMusic.paused) {
    playerMusic.play();
    playIcon.src = "assets/icons/player-pause.svg";
    recentPlayIcon.src = "assets/icons/player-pause.svg";
  }
  else {
    playerMusic.pause();
    playIcon.src = "assets/icons/player-play.svg";
    recentPlayIcon.src = "assets/icons/player-play.svg";
  }
};



// Gets audio file duration 

function formatTime(n) {
  const mins = Math.floor(n / 60);
  const secs = Math.floor(n % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

playerMusic.load();
playerMusic.addEventListener("loadedmetadata", function () {
  duration = playerMusic.duration;
  document.getElementById("song-duration").textContent = formatTime(duration);
});


// Collection of all songs

const songCollection = [

  {
    "id": 0,
    "name": "Future Bass",
    "artist": "Raspberries",
    "src": "assets/music/for-future-bass-159125.mp3",
    "img": "assets/pictures/c1.png"
  },

  {
    "id": 1,
    "name": "Garage Royalty",
    "artist": "Mayday Park",
    "src": "assets/music/deep-future-garage-royalty-free-music-163081.mp3",
    "img": "assets/pictures/c2.png"
  },

  {
    "id": 2,
    "name": "Good night",
    "artist": "Olivia da Silva",
    "src": "assets/music/good-night-160166.mp3",
    "img": "assets/pictures/c3.png"
  },

  {
    "id": 3,
    "name": "Eternity",
    "artist": "Rapid Ghosts",
    "src": "assets/music/leva-eternity-149473.mp3",
    "img": "assets/pictures/c4.png"
  },

  {
    "id": 4,
    "name": "Reflected light",
    "artist": "Luminorics",
    "src": "assets/music/reflected-light-147979.mp3",
    "img": "assets/pictures/c5.png"
  },

  {
    "id": 5,
    "name": "New Orleans",
    "artist": "Jazz Boyz",
    "src": "assets/music/the-best-jazz-club-in-new-orleans-164472.mp3",
    "img": "assets/pictures/c6.png"
  }

];


// Go to previous and next song on click

nextSong.addEventListener("click", e => {
  currentSongIndex = (currentSongIndex + 1) % songCollection.length;
  playerMusic.src = songCollection[currentSongIndex].src;
  playAudio();
  songData(currentSongIndex);
});

previousSong.addEventListener("click", e => {
  currentSongIndex = (currentSongIndex - 1 + songCollection.length) % songCollection.length;
  playerMusic.src = songCollection[currentSongIndex].src;
  playAudio();
  songData(currentSongIndex);
});


// Replace HTML content with the song name, duration, and artist

function songData(i) {
  currentSong.innerHTML = songCollection[i].name;
  currentArtist.innerHTML = songCollection[i].artist;
  currentCover.src = songCollection[i].img
  nextSongText.innerHTML = songCollection[i + 1].name;

}

songData(currentSongIndex);


// Move playhead with the song -> copied from Google, works


playerMusic.addEventListener("timeupdate", timeUpdate, false);

function timeUpdate() {
  let playPercent = 100 * (playerMusic.currentTime / playerMusic.duration);
  playHead.style.marginLeft = playPercent + "%";
  songTime.textContent = formatTime(playerMusic.currentTime);
}


// Replace recently played with actual songs from collection

recentArtist.forEach((artist, i) => {
  artist.textContent = songCollection[i].artist;
});

recentSong.forEach((song, i) => {
  song.textContent = songCollection[i].name;
});

recentImage.forEach((image, i) => {
  image.src = songCollection[i].img;
});


// Play the song from recents 

recentSongPlayIcon.forEach((icon, i) => {
  icon.addEventListener("click", e => {
    if (playerMusic.src === songCollection[i].src) {
      if (playerMusic.paused) {
        playerIcon.addEventListener("click", e => {
          icon.src = "assets/icons/player-play.svg";
        });
        playerMusic.play();
        icon.src = "assets/icons/player-pause.svg"

      } else {
        playerMusic.pause();
        icon.src = "assets/icons/player-play.svg";
      }
    } else {
      playerMusic.src = songCollection[i].src;
      songData(i);
      playerMusic.play();
      icon.src = "assets/icons/player-pause.svg";
      recentSongPlayIcon.forEach((otherIcon, j) => {
        if (i !== j) {
          otherIcon.src = "assets/icons/player-play.svg";
          playIcon.src = "assets/icons/player-pause.svg";
        }
      });
    }
  });
});



// Shuffle function

const shuffleButton = document.getElementById("shuffle");

function shuffle() {
  let randomIndex;
  
  do {
    randomIndex = Math.floor(Math.random() * songCollection.length);
  } while (randomIndex === currentSongIndex);
  
  const randomSong = songCollection[randomIndex];
  playerMusic.src = randomSong.src; 
  currentSong.textContent = randomSong.name
  currentArtist.textContent = randomSong.artist
  currentCover.src = randomSong.img
  nextSongText.textContent = "Random"
  playAudio();
}

shuffleButton.addEventListener("click", shuffle);
