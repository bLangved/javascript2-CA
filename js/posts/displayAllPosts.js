import { createCard } from "./postHTML.js";

const API_BASE_URL = "https://api.noroff.dev/api/v1";
const allPostsEndpoint = "/social/profiles/bjornar_heian/posts";
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

// Fetch the posts associated with the current user and display them:
function displayUserPosts() {
    const accessToken = localStorage.getItem("accessToken");

    // Assuming you have a backend API endpoint to fetch posts by accessToken:
    fetch(createPostUrl, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {
        // Assuming "data" is an array of post objects:
        data.forEach(post => {
            createCard(post); // Your function to display each post
        });
    })
    .catch(error => {
        console.error("Error fetching posts:", error);
    });
}

// Call checkUserSession once the DOM is fully loaded:
document.addEventListener("DOMContentLoaded", checkUserSession);
