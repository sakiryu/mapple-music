// Mobile nav menu -> show on hamburger icon click & hide on any other click

const mobileMenu = document.getElementById("nav-menu");
const hamburgerIcon = document.getElementById("hamburger-icon");

let isModalOpen = false;

function openModal() {
  mobileMenu.classList.add("mobile-nav");
  mobileMenu.classList.remove("mobile-display");
  overlay.classList.remove("invisible");
  isModalOpen = true;

  document.addEventListener("click", closeModalOnClickOutside);
}

function closeModal() {
  mobileMenu.classList.remove("mobile-nav");
  mobileMenu.classList.add("mobile-display");
  overlay.classList.add("invisible");
  isModalOpen = false;

  document.removeEventListener("click", closeModalOnClickOutside);
}

function closeModalOnClickOutside(e) {
  if (!mobileMenu.contains(e.target) && e.target !== hamburgerIcon) {
    closeModal();
  }
}

hamburgerIcon.addEventListener("click", e => {
  !isModalOpen ? openModal() : closeModal();
});



// Upgrade banner -> show & hide modal & overlay on click
const overlay = document.getElementById("overlay");
const upgradeModal = document.getElementById("modal-upgrade");
const closeIcon = document.getElementById("modal-upgrade-close-icon");
const upgradeButton = document.getElementById("btn-upgrade");

upgradeButton.addEventListener("click", e => {
  overlay.classList.remove("invisible")
  upgradeModal.classList.remove("invisible")
  pageBody.classList.add("overflow-hidden")
});

closeIcon.addEventListener("click", e => {
  overlay.classList.add("invisible")
  upgradeModal.classList.add("invisible")
  pageBody.classList.remove("overflow-hidden")
});


// Settings modal -> show & hide modal & overlay on click

const settingsModal = document.getElementById("modal-settings");
const closeIconSettings = document.getElementById("modal-settings-close-icon");
const settingsIcon = document.getElementById("settings-icon");
const pageBody = document.getElementById("all");


settingsIcon.addEventListener("click", e => {
  overlay.classList.remove("invisible")
  settingsModal.classList.remove("invisible")
  pageBody.classList.add("overflow-hidden")
});

closeIconSettings.addEventListener("click", e => {
  overlay.classList.add("invisible")
  settingsModal.classList.add("invisible")
  pageBody.classList.remove("overflow-hidden")
});

// Settings modal -> change checkmark bg color on click

const settingsCheckboxes = Array.from(document.getElementsByClassName("settings-checkbox"));
settingsCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("click", () => {
    checkbox.classList.toggle("bg-blue");
  });
});


// Add or remove Favorites -> change icon & display notification

const heartIcons = document.getElementsByClassName("heart-icon");

const likedStates = Array.from({ length: heartIcons.length }).fill(false);

const favoritesNotification = document.getElementById("favorites-notification");
const favoritesNotificationText = favoritesNotification.querySelector("p");

let notificationTimeout;
let isNotificationDisplayed = false;

function showNotification(message) {
  if (!isNotificationDisplayed) {
    isNotificationDisplayed = true;
    favoritesNotificationText.innerText = message;
    favoritesNotification.classList.remove("invisible");
    notificationTimeout = setTimeout(() => {
      favoritesNotification.classList.add("invisible");
      isNotificationDisplayed = false;
    }, 1000);
  }
}

function updateHeartIcon(index) {
  likedStates[index] = !likedStates[index];
  heartIcons[index].src = likedStates[index]
    ? "assets/icons/like-filled.svg"
    : "assets/icons/like.svg";

  if (likedStates[index]) {
    showNotification("Added to favorites");
  } else {
    showNotification("Removed from favorites");
  }
}

Array.from(heartIcons).forEach((heartIcon, index) => {
  heartIcon.addEventListener("click", () => updateHeartIcon(index));
});


// Show 3 iterations of Bottom banner on click

const dots = [
  { element: document.getElementById("dot-1"), heading: '"The Real Slim Shady" by Eminem', imageSrc: "assets/pictures/eminem.png" },
  { element: document.getElementById("dot-2"), heading: '"Hips Don’t Lie" by Shakira', imageSrc: "assets/pictures/shakira.png" },
  { element: document.getElementById("dot-3"), heading: '"Where Have You Been" by Rihanna', imageSrc: "assets/pictures/rihanna.png" }
];

const bannerHeading = document.getElementById("trend-head");
const bannerImage = document.getElementById("trend-artist-pic");

function updateBanner(index) {
  dots.forEach((dot, i) => {
    const isCurrentDot = i === index;
    dot.element.classList.toggle("bg-blue", isCurrentDot);
    dot.element.classList.toggle("bg-grey", !isCurrentDot);
  });

  bannerHeading.innerHTML = dots[index].heading;
  bannerImage.src = dots[index].imageSrc;
}

dots.forEach((dot, index) => {
  dot.element.addEventListener("click", () => updateBanner(index));
});



// Song sharing modal -> show & hide modal & overlay on click

const shareModal = document.getElementById("song-sharing-modal");
const closeIconShare = document.getElementById("modal-sharing-close-icon");
const shareButton = document.getElementById("player-share");


shareButton.addEventListener("click", e => {
  overlay.classList.remove("invisible")
  shareModal.classList.remove("invisible")
  pageBody.classList.add("overflow-hidden")
});

closeIconShare.addEventListener("click", e => {
  overlay.classList.add("invisible")
  shareModal.classList.add("invisible")
  pageBody.classList.remove("overflow-hidden")
});


// Change settings icons stroke on hover

const settingsIconPath = document.querySelectorAll("#settings-icon > svg > path");
const settingsIconBox = document.getElementById("settings-icon")

settingsIconBox.addEventListener("mouseover", e => {

  settingsIconPath.forEach(path => {
    path.classList.add("stroke-white");
  });
});


settingsIconBox.addEventListener("mouseout", e => {

  settingsIconPath.forEach(path => {
    path.classList.remove("stroke-white");
  });
});


// Change bell icon stroke on hover

const bellIconPath = document.querySelectorAll("#bell-icon > svg > path");
const bellIconBox = document.getElementById("bell-icon")

bellIconBox.addEventListener("mouseover", e => {

  bellIconPath.forEach(path => {
    path.classList.add("stroke-white");
  });
});


bellIconBox.addEventListener("mouseout", e => {

  bellIconPath.forEach(path => {
    path.classList.remove("stroke-white");
  });
});


// Show notifications modal 

bellIconBox.addEventListener("click", e => {

  overlay.classList.remove("invisible")
  upgradeModal.classList.remove("invisible")
  pageBody.classList.add("overflow-hidden")
  document.querySelector("#modal-upgrade > div > h3").textContent = "No new notifications... yet"
  document.querySelector("#modal-upgrade > div > p").textContent = "When something happens, you'll be the first to know!"
})


// Add to favorites notification

// const plusIcons = document.querySelectorAll("#playlist-list > div > div:nth-child(2) > div > img");


// plusIcons.forEach(icon => {
//   icon.addEventListener("click", e => {
//     icon.classList.add("brighten");
//     const parentBox = icon.parentNode;
//     if (parentBox.classList.contains("pointer")) {
//       parentBox.classList.add("bg-blue");
//       favoritesNotification.classList.remove("invisible");
//       favoritesNotificationText.textContent = "Added to playlist";
//       parentBox.classList.remove("pointer");
//       setTimeout(() => {
//         favoritesNotification.classList.add("invisible");
//       }, 1000);


//     }

//   });
// });


const plusIcons = document.querySelectorAll("#playlist-list > div > div:nth-child(2) > div > img");

plusIcons.forEach((icon, index) => {
  icon.addEventListener("click", e => {
    icon.classList.add("brighten");
    const parentBox = icon.parentNode;
    if (parentBox.classList.contains("pointer")) {
      parentBox.classList.add("bg-blue");
      favoritesNotification.classList.remove("invisible");
      favoritesNotificationText.textContent = "Added to playlist";
      parentBox.classList.remove("pointer");

      const song = songCollection[index];

      addEntryToPlaylistPage(song.name, song.artist, song.img);

      setTimeout(() => {
        favoritesNotification.classList.add("invisible");
      }, 1000);
    }
  });
});

function addEntryToPlaylistPage(songTitle, artistName, coverSrc) {
  const playlistCollection = document.getElementById("playlist-collection");

  fetch("../playlist-entry.template.html")
  .then(html => html.text())
  .then(html => {
    const newEntry = document.createElement("div");
    newEntry.classList.add(
      "pad-left-20", "pad-right-20", "bg-white", "flex-row", "align-center",
      "shadow", "pad-top-bottom-10", "full-width", "rad-8", "space-between"
    );
  
    newEntry.innerHTML = html;
    console.log("test")
    playlistCollection.appendChild(newEntry);
  });
  // newEntry.innerHTML = `
  //   <div class="flex-row gap-20 align-center">
  //     <div class="align-center relative pointer">
  //       <img class="icon-box-40 rad-6" src="${coverSrc}">
  //     </div>
  //     <div class="flex-col">
  //       <p class="regular-text black m-bot-2 bold">${songTitle}</p>
  //       <p class="remark grey m-0">${artistName}</p>
  //     </div>
  //   </div>`;

}






// Artist box slider
const artistDots = [
  { element: document.getElementById("artist-dot-1"), name: "Troye Sivan", title: "Blue blue sky", imageSrc: "assets/pictures/neighbor.png" },
  { element: document.getElementById("artist-dot-2"), name: "Ryan Jones", title: "Pain", imageSrc: "assets/pictures/pain.png" },
  { element: document.getElementById("artist-dot-3"), name: "Devil’s Gun", title: "Raising the beats", imageSrc: "assets/pictures/gun.png" },
  { element: document.getElementById("artist-dot-4"), name: "Alex Brown", title: "Risk it all", imageSrc: "assets/pictures/risk.png" }
];

const ArtistName = document.getElementById("first-artist-song")
const ArtistSong = document.getElementById("first-artist-name")
const ArtistImage = document.getElementById("first-artist-image")

function artistSlider(index) {
  artistDots.forEach((dot, i) => {
    const isSelectedDot = i === index;
    dot.element.classList.toggle("bg-blue", isSelectedDot);
    dot.element.classList.toggle("bg-grey", !isSelectedDot);
  });

  ArtistName.textContent = artistDots[index].name;
  ArtistSong.textContent = artistDots[index].title;
  ArtistImage.src = artistDots[index].imageSrc;
}

artistDots.forEach((dot, index) => {
  dot.element.addEventListener("click", () => artistSlider(index));
});


// open & close pages

const homePage = document.getElementById("home-page")
const rewardsPage = document.getElementById("rewards-page")
const playlistPage = document.getElementById("playlist-page")
const videosPage = document.getElementById("videos-page")

const rewardsLink = document.getElementById("rewards-link")
const homeLink = document.getElementById("home-link")
const playlistLink = document.getElementById("playlist-link")
const videosLink = document.getElementById("videos-link")

const homeContainer = document.getElementById("home-container")
const rewardsContainer = document.getElementById("rewards-container")
const videoContainer = document.getElementById("video-container")
const playlistContainer = document.getElementById("playlist-container")



rewardsLink.addEventListener("click", e => {
homePage.classList.add("no-display")
homeContainer.classList.remove("darken")

videosPage.classList.add("no-display")
videoContainer.classList.remove("darken")

playlistPage.classList.add("no-display")
playlistContainer.classList.remove("darken")

rewardsPage.classList.remove("no-display")
rewardsContainer.classList.add("darken")
})

homeLink.addEventListener("click", e => {
  homePage.classList.remove("no-display")
  rewardsPage.classList.add("no-display")
  videosPage.classList.add("no-display")
  playlistPage.classList.add("no-display")

  homeContainer.classList.add("darken")
videoContainer.classList.remove("darken")
rewardsContainer.classList.remove("darken")
playlistContainer.classList.remove("darken")

  })


  videosLink.addEventListener("click", e => {
    homePage.classList.add("no-display")
    homeContainer.classList.remove("darken")

    rewardsPage.classList.add("no-display")
    playlistPage.classList.add("no-display")
    videosPage.classList.remove("no-display")

    rewardsContainer.classList.remove("darken")
    videoContainer.classList.add("darken")
    playlistContainer.classList.remove("darken")
    })


    playlistLink.addEventListener("click", e => {
      playlistPage.classList.remove("no-display")
      homePage.classList.add("no-display")
      rewardsPage.classList.add("no-display")
      videosPage.classList.add("no-display")
      
      homeContainer.classList.remove("darken")
      rewardsContainer.classList.remove("darken")
      videoContainer.classList.remove("darken")
      playlistContainer.classList.add("darken")
      })

    // redeem links

    const redeemLinks = Array.from(document.getElementsByClassName("redeem"))
    redeemLinks.forEach((link) => {
      link.addEventListener("click", e => {
        link.parentNode.parentNode.classList.add("no-display")
        favoritesNotification.classList.remove("invisible");
        favoritesNotificationText.textContent = "Points redeemed";
        setTimeout(() => {
          favoritesNotification.classList.add("invisible");
        }, 1000);
      })
    })
  

    // Populate playlist page

