//Elementlere ulasma
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

//sira
let index;

//dongu
let loop = true;

//sarki listesi

const songsList = [
  {
    name: "Ainsi Bas La Vida",
    artist: "Indila",
    image: "assets/Indila – Ainsi Bas La Vida.jpg",
    link: "assets/Indila-Ainsi-Bas-La-Vida-46.mp3",
  },
  {
    name: "Gangsta's Paradise",
    artist: "Coolio",
    image: "assets/Coolio-Gangstas-Paradise.jpg",
    link: "assets/Coolio-Gangstas-Paradise-Orijinal-14.mp3",
  },
  {
    name: "Günah Benim",
    artist: "Eypio ft. Burak King",
    image: "assets/Eypio-feat-Burak-King--Gunah-Benim.jpg",
    link: "assets/Eypio-feat-Burak-King--Gunah-Benim.mp3",
  },
  {
    name: "Sağı Solu Kes",
    artist: "Gazapizm",
    image: "assets/Gazapizm-Sagi-Solu-Kes.jpg",
    link: "assets/Gazapizm-Sagi-Solu-Kes-60.mp3",
  },
  {
    name: "Demet Akalın",
    artist: "Ben Fero",
    image: "assets/Ben-Fero-Demet-Akalin.jpg",
    link: "assets/Ben-Fero-Demet-Akalin.mp3",
  },
  {
    name: "Holocaust",
    artist: "Ceza",
    image: "assets/Ceza-Holocaust.jpg",
    link: "assets/Ceza-Holocaust.mp3",
  },
  {
    name: "Neyim Var Ki",
    artist: "Ceza ft. Sagopa K.",
    image: "assets/Ceza-Neyim-Var-Ki.jpg",
    link: "assets/Ceza-Neyim-Var-Ki.mp3",
  },
  {
    name: "Yerli Plaka",
    artist: "Ceza",
    image: "assets/Ceza-Yerli-Plaka.jpg",
    link: "assets/Ceza-Yerli-Plaka.mp3",
  },
  {
    name: "Suspus",
    artist: "Ceza",
    image: "assets/Ceza-Suspus.jpg",
    link: "assets/Ceza-Suspus.mp3",
  },

  {
    name: "Parla - 100 Yıl Marşı",
    artist: "Norm Ender",
    image: "assets/Norm-Ender-Parla-100-Yil-Marsi.jpg",
    link: "assets/Norm-Ender-Parla-100-Yil-Marsi-18.mp3",
  },

  {
    name: "Günleri Geride Bırak",
    artist: "Şanışer",
    image: "assets/Şanışer-Günleri-Geride-Bırak.jpg",
    link: "assets/Saniser-Gunleri-Geride-Birak-68.mp3",
  },
  {
    name: "Susamam",
    artist: "Şanışer",
    image: "assets/Şanışer-Susamam.jpg",
    link: "assets/Saniser-Susamam.mp3",
  },
];

//sarki atama 4
const setSong = (arrayIndex) => {
  console.log(arrayIndex);
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  playListContainer.classList.add("hide");

  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };

  playAudio();
};
//canli izleme yap
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);

  let value = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
  console.log("value: ", value);
  currentProgress.style.width = value;
});

//sarki bittiginde
audio.onended = () => {
  nextSong();
};

//sureyi tiklayarak degistir
progressBar.addEventListener("click", (event) => {
  //baslangic/sol
  let coordStart = progressBar.getBoundingClientRect().left;
  console.log("coordStart: ", coordStart);
  //bitis
  let coordEnd = event.clientX;
  console.log("coordEnd: ", coordEnd);
  console.log("progressBar offsetWidth: ", progressBar.offsetWidth);
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;
  console.log("progress ", progress);

  currentProgress.style.width = progress * 100 + "%";
  audio.currentTime = progress * audio.duration;
  playAudio();
});

//sarkiyi oynat
const playAudio = () => {
  audio.play();
  playButton.classList.add("hide");
  pauseButton.classList.remove("hide");
};

//sarkiyi durdur
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//zamani formatla. 98
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60); //1
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60); // 38
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

//siradaki sarkiya gec
const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index += 1; //index = index + 1
    }
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    index = randIndex;
  }
  setSong(index);
};

//onceki sarkiya gec
const previousSong = () => {
  console.log(index);
  if (index > 0) {
    index -= 1; // index = index - 1
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
};
//liste ac button a tiklanirsa
playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

//kapat butonuna tiklanirsa
playListContainer.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

//sirali sarki listesini olustur
const initializePlaylist = () => {
  // 0 1 2 3 4
  for (let i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
            onclick="setSong(${i})">
                <div class="playlist-image-container">
                    <img src="${songsList[i].image}" />
                </div>
                <div class="playlist-song-details">
                    <span id="playlist-song-name">
                        ${songsList[i].name}
                    </span>
                    <span id="playlist-song-artist-album">
                        ${songsList[i].artist}
                    </span>
                </div>
            </li>
            `;
  }
};

//button lara tiklanildigida
playButton.addEventListener("click", playAudio);

//sarkiyi durdur
pauseButton.addEventListener("click", pauseAudio);

//siradaki sarkiyi cal
nextButton.addEventListener("click", nextSong);

//onceki sarkiyi ac
prevButton.addEventListener("click", previousSong);

//karistir modu
shuffleButton.addEventListener("click", () => {
  shuffleButton.classList.toggle("active");
  loop = !loop;
});

//donguyu ac kapa
repeatButton.addEventListener("click", () => {
  repeatButton.classList.toggle("active");
  audio.loop = !audio.loop;
});


//sayfa yuklenince
window.onload = () => {
  index = 4;
  setSong(index);
  initializePlaylist();
  pauseAudio();
};

async function getAlbumCover(songName) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(songName)}&limit=1&entity=song`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      // Görseli 600x600 px boyutuna çevirir
      return data.results[0].artworkUrl100.replace("100x100bb", "600x600bb");
    }
  } catch (error) {
    console.error("Kapak yüklenemedi:", error);
  }
  return "assets/ben fero.jpg"; // Hata olursa varsayılan görsel
}

// Örnek kullanım:
getAlbumCover("Ceza Suspus").then((coverUrl) => {
  console.log("Kapak Resmi URL:", coverUrl);
  // document.querySelector('.album-art').src = coverUrl;
});
