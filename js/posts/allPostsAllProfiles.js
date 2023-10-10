import authToken from "/js/variables/localStorage.js";
import API_BASE_URL from "/js/variables/apiEndpoints.js";
import { hideLoadingAnimation, showLoadingAnimation } from "/js/components/loadingAnimation.js";
import { allProfilesUrl } from "/js/variables/apiEndpoints.js";
import { createCard } from "/js/posts/allPostsHTML.js";
import { filterPosts } from "/js/posts/filterPosts.js";

let isFetching = false;  // to track whether a fetch is ongoing
let requestsMade = 0; // Counter to track number of requests made
let currentOffset = 0;
const limit = 10;
const maxRequestsPerLoad = 1; // Maximum requests allowed per load
let allProfiles = [];
let allPosts = [];

// Fetches all profiles stored on the server
function getAllProfiles(offset = currentOffset){

    if (requestsMade >= maxRequestsPerLoad) {
        // Reset the counter and exit the function
        requestsMade = 0; // Reset the counter
        return;
    }
    showLoadingAnimation();
    fetch(`${allProfilesUrl}?limit=${limit}&offset=${offset}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        allProfiles.push(...data);
        // console.log(allProfiles);
        isFetching = false;
        requestsMade += 1; // Update the number of requests made

        // Filtering and displaying the results
        const profilesWithPosts = allProfiles.filter(profile => profile._count.posts >= 1);
        profilesWithPosts.forEach(profile => {
            const profileName = profile.name;
            const profileAvatar = profile.avatar;
            getPostsOfProfiles(profileName, profileAvatar);
        })
        // After processing the current fetch, prepare for the next fetch
        if (data.length === limit) {
            currentOffset += limit;        
            getAllProfiles(currentOffset);
        }
    })
    .catch(error => {
        console.error("There was an error fetching the profiles:", error);
    });
};

// Fetches all posts belonging to all profiles that passed requirements in getAllProfiles().
function getPostsOfProfiles(profileName, profileAvatar) {

    const allPostsByAllProfilesEndpoint = `/social/profiles/${profileName}/posts`;
    const allPostsByAllProfilesUrl = `${API_BASE_URL}${allPostsByAllProfilesEndpoint}`;

    fetch(allPostsByAllProfilesUrl, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {
        // Exclude posts with empty title or body
        const validPosts = data.filter(post => 
        post.title && post.title.trim() !== "" && post.body && post.body.trim() !== "");
        validPosts.forEach(post => {
            post.profileName = profileName;
            post.profileAvatar = profileAvatar;
        });
        allPosts.push(...validPosts);

        const filteredPosts = filterPosts(allPosts, currentFilterType);
        filteredPosts.forEach(post => {
            createCard(post, profileName, profileAvatar);
            hideLoadingAnimation();
        });
    })
    .catch(error => {
        console.error("Error fetching posts:", error);
    });
};
getAllProfiles();

// Clear existing posts each time the page gets refreshed, so there aren't any duplicates. 
const cardsContainer = document.querySelector(".card-container");
cardsContainer.innerHTML = "";

// Gets data-filter for filter-post button
let currentFilterType = "newest"; // default to newest
const filterItems = document.querySelectorAll(".filterPosts-menu");
filterItems.forEach(item => {
    item.addEventListener("click", function(e) {
        e.preventDefault();
        currentFilterType = e.target.getAttribute("data-filter");
        filterPosts(allPosts, currentFilterType);
        cardsContainer.innerHTML = "";  // Clear existing posts
        displaySortedPosts();
    });
});

function displaySortedPosts() {
    allPosts.forEach(post => {
        createCard(post, post.profileName, post.profileAvatar);
    });
}

// Infinite scrolling -> when user scrolls down, more requests on profiles are being made
window.addEventListener("scroll", () => {
    if (isFetching) return;
    const scrollTop = (document.documentElement || document.body.parentNode || document.body).scrollTop;
    const offset = scrollTop + window.innerHeight;
    const bottom = document.querySelector("#mainFeed").offsetHeight;
    if (offset >= bottom - 10) {
        isFetching = true; 
        getAllProfiles(currentOffset);
    }
});