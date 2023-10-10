import { avatar } from "/js/variables/localStorage.js";
/** 
 * Sets profile avatar in header
 */
export function setAvatarThumbnail(imageUrl) {
    localStorage.setItem("avatar", imageUrl);
    const newAvatarImg = localStorage.getItem("avatar");
    const avatarHeaders = document.querySelectorAll(".avatar-thumbnail");
    avatarHeaders.forEach(header => {
        header.src = newAvatarImg;
    });
}

/**
 * Loads in the header HTML-content located inside websiteHeader.html
 */
function loadHeader() {
    fetch("/htmlComponents/websiteHeader.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector("#websiteHeader").innerHTML = data;
        initializeSearchbar(); // Calls the function after the header is loaded
        setAvatarThumbnail(avatar);
    });
};

/**
 * Initialize the searchbar inside the header after the page is fully loaded. 
 */
function initializeSearchbar() {
    const searchbarButton = document.querySelector(".searchbar-btn_header");
    const searchbarContainer = document.querySelector(".searchbar_header-input-container");

    // When search-button is pressed, searchbar input "collapses" underneath on smaller devices. 
    searchbarButton.addEventListener("click", function() {
        searchbarContainer.classList.toggle("d-none");
    });
    window.addEventListener("resize", function() {
        if (window.innerWidth >= 768) {
            searchbarContainer.classList.add("d-none");
        }
    });

    /**
     * Filters the posts on the website based on text input in searchbar
     * 
     * Accepts 2 options atm: username (string) and id (number)
    */
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
}
loadHeader();

