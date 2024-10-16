const videoinfo = document.querySelector(".video-info");
const videoElement = document.createElement("video");
// document.body.appendChild(videoElement);
videoinfo.appendChild(videoElement);

// Selecting Dom elements

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-bar");
const volumeSlider = document.getElementById("volume");
const speedSelect = document.getElementById("speed");

// video data

const videos = [
  {
    title: "Video 1",
    artist: "artist 1",
    cover: "https://via.placeholder.com/250/2196F3/FFFFFF",
    src: "https://cdn.pixabay.com/video/2020/01/05/30902-383991325_large.mp4",
  },

  {
    title: "Video 2",
    artist: "artist 2",
    // cover: "https://via.placeholder.com/250/8C4156/FFFFFF",
    src: "https://cdn.pixabay.com/video/2020/01/05/30901-383991318_large.mp4",
  },

  {
    title: "Video 3",
    artist: "artist 2",
    // cover: "https://via.placeholder.com/250/8C4156/FFFFFF",
    src: "./Kurlus.mp4",
  },
];

let videoIndex = 0;
let isPlaying = false;
let speed = 1;

function loadVideo(video) {
  title.textContent = video.title;
  artist.textContent = video.artist;
  //   cover.src = video.cover;
  videoElement.src = video.src;
}

loadVideo(videos[videoIndex]);

function playVideo() {
  playBtn.querySelector("i").classList.remove("fa-play");
  playBtn.querySelector("i").classList.add("fa-pause");

  videoElement.play();
  isPlaying = true;
}

function pauseVideo() {
  playBtn.querySelector("i").classList.remove("fa-pause");
  playBtn.querySelector("i").classList.add("fa-play");
  videoElement.pause();
  isPlaying = false;
}

//next vedio

function nextVideo() {
  pauseVideo();

  setTimeout(() => {
    videoIndex++;
    if (videoIndex > videos.length - 1) {
      videoIndex = 0;
    }
    loadVideo(videos[videoIndex]);
    playVideo();
  }, 300);
}

//prev video
function prevVideo() {
  pauseVideo();

  // after 300 mill second
  setTimeout(() => {
    videoIndex--;
    if (videoIndex < 0) {
      videoIndex = videos.length - 1;
    }
    loadVideo(videos[videoIndex]);
    playVideo();
  }, 300);
}

//update progress
function updateProgress(e) {
  //   console.log("e.srcElement.duration", e.srcElement.duration);
  //   console.log("e.srcElement.currentTime", e.srcElement.currentTime);

  const { duration, currentTime } = e.srcElement;
  if (isNaN(duration)) return;

  const progressPercent = (currentTime / duration) * 100;
  //   console.log("progress percent", progressPercent);
  progress.style.width = `${progressPercent}%`;

  //duration calculation

  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);

  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  currentTimeEl.textContent = `${durationMinutes}:${durationSeconds}`;

  //current time calculation

  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  durationEl.textContent = `${currentMinutes}:${currentSeconds}`;

  videoElement.playbackRate = speed;
}
//all about events
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseVideo();
  } else {
    playVideo();
  }
});

//set progress

function setProgress(e) {
  const width = this.clientWidth;

  const clickX = e.offsetX;
  const duration = videoElement.duration;

  if (isNaN(duration)) return;
  const newTime = (clickX / width) * duration;
  videoElement.currentTime = newTime;
}

// next video event

nextBtn.addEventListener("click", nextVideo);

// prev
prevBtn.addEventListener("click", prevVideo);

videoElement.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

volumeSlider.addEventListener("input", (e) => {
  videoElement.volume = e.target.value;
});

speedSelect.addEventListener("change", (e) => {
  speed = parseFloat(e.target.value);
  videoElement.playbackRate = speed;
});

//load metadata

videoElement.addEventListener("loadeddata", updateProgress);
