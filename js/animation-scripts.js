// Intersection observer -> show animation once the block is inside the viewport

// Even though understanding this script is not a difficult task, the name "animation-scripts"
// is not really helpful, lol. Perhaps you could give it a more descriptive name?
// Something like LazyHtmlElementRenderer?

const trendBanner = document.getElementById("trend-banner");
const playerSection = document.getElementById("player-and-recents");
const menuBanner = document.getElementById("menu-banner");

const observer = new IntersectionObserver(entries => {
  
  entries.forEach(entry => {
    //Maybe just a preference here, but I really like early-return ;)
    if (!entry.isIntersecting) {
      return;
    }

    // For attributes often used, consider putting them into variables 
    let entryClassList = entry.target.classList;
    entryClassList.remove("invisible");
    entryClassList.remove("no-display");
    entryClassList.add('fade-in');

    observer.unobserve(entry.target);
  });
}, {threshold: 0.25});

observer.observe(playerSection);
observer.observe(trendBanner);

// observer.observe(rewardsPage);
// observer.observe(videosPage);


