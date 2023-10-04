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


  /**
   * Searchbar input functunality 
   */

  document.addEventListener("DOMContentLoaded", () => {
    const searchbarInput = document.querySelector("#searchbar-header");
    searchbarInput.addEventListener("input", filterPosts);

    function filterPosts() {
        const inputValue = searchbarInput.value.trim(); // get the current value of the input field
        const allCards = document.querySelectorAll(".card"); // targets all .card elements on page with .card class 

        allCards.forEach(card => {
            const postId = card.getAttribute("data-id"); // get the data-id attribute from each card (id)
            const userName = card.querySelector(".card-top-text").innerText.trim(); // get the innerText of the userName element

            if (postId.startsWith(inputValue) || userName.toLowerCase().startsWith(inputValue.toLowerCase())) {
                card.style.display = "block"; // Shows the card that matches the input criteria
            } else {
                card.style.display = "none"; // hide the cards that does not match the input criteria
            }
        });
    }

});