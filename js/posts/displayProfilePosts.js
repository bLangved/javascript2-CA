import authToken from "/js/variables/localStorage.js";
import { username } from "/js/variables/localStorage.js";
import API_BASE_URL from "/js/variables/apiEndpoints.js";
import { createCard } from "./postHTML.js";
import { filterPosts } from "./filterPosts.js";

const allPostsEndpoint = `/social/profiles/${username}/posts`;
const createPostUrl = `${API_BASE_URL}${allPostsEndpoint}`;

// Check if the user has a session and setup their environment if they do:
function checkUserSession() {
    if (localStorage.getItem("accessToken")) {
        setupUserEnvironment();
    }
}

// Setup the user"s environment (e.g., display their posts):
function setupUserEnvironment() {
    // ... (any other logic you want when confirming the user"s session)

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
    fetch(createPostUrl, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
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
