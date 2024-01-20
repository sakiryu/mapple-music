// Intersection observer -> show animation once the block is inside the viewport

const trendBanner = document.getElementById("trend-banner");
const playerSection = document.getElementById("player-and-recents");
const menuBanner = document.getElementById("menu-banner");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("invisible");
      entry.target.classList.remove("no-display");
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.25});

observer.observe(playerSection);
observer.observe(trendBanner);

// observer.observe(rewardsPage);
// observer.observe(videosPage);


