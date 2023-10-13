import { createCard } from "/js/posts/postsProfileHTML.js";
import { filterPosts } from "/js/posts/filterPosts.js";
import { AllPostsByProfileUrl } from "/js/variables/apiEndpoints.js";


// Check if the user has a session and setup their environment if they do:
function checkUserSession() {
    if (localStorage.getItem("accessToken")) {
        setupUserEnvironment();
    }
}

// Setup the user"s environment (e.g., display their posts):
function setupUserEnvironment() {
    displayUserPosts();
}

const filterItems = document.querySelectorAll(".filterPosts-menu");
filterItems.forEach(item => {
    item.addEventListener("click", function(e) {
        e.preventDefault();
        const filterType = e.target.getAttribute("data-filter");
        displayUserPosts(filterType);
    });
});

// Fetch the posts associated with the current user and display them:
function displayUserPosts(filterType) {
    const accessToken = localStorage.getItem("accessToken");

    // fetching posts by accessToken:
    fetch(AllPostsByProfileUrl, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {

        const cardsContainer = document.querySelector(".card-container");
        // Clear existing posts each time the page gets refreshed, so there aren't any duplicates. 
        cardsContainer.innerHTML = "";
         
        const filteredData = filterPosts(data, filterType); 
        filteredData.forEach(post => {
            createCard(post);
        });
    })
    .catch(error => {
        console.error("Error fetching posts:", error);
    });
}

// Call checkUserSession once the DOM is fully loaded:
document.addEventListener("DOMContentLoaded", checkUserSession);
