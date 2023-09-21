const searchbarButton = document.querySelector(".searchbar-btn_header");
const searchbarContainer = document.querySelector(".searchbar_header-input-container");

// When search-button is pressed, searchbar input "collapses" underneath on smaller devices. 
searchbarButton.addEventListener("click", function() {
searchbarContainer.classList.toggle("d-none");
});

// If window is stretched from sm to md and back again while "collapsed", it goes back to initial state. 
window.addEventListener("resize", function() {
    if (window.innerWidth >= 768) {
        searchbarContainer.classList.add("d-none");
    }
  });