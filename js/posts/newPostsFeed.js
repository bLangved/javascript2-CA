// import { hideLoadingAnimation, showLoadingAnimation } from "/js/components/loadingAnimation.js";
// import { createCard } from "/js/posts/postsFeedHTML.js";
// import { filterPosts } from "/js/posts/filterPosts.js";



// let filterType = "newest"; 
// let allPosts = getFromSessionStorage("newAllPosts") || [];  // Retrieve all posts from sessionStorage when initializing
// const filterItems = document.querySelectorAll(".filterPosts-menu");
// const postTitleFeed = document.querySelector("#titleFeed");
// const cardsContainer = document.querySelector(".card-container");


// function saveToSessionStorage(key, data) {
//     sessionStorage.setItem(key, JSON.stringify(data));
// }
// function getFromSessionStorage(key) {
//     const data = sessionStorage.getItem(key);
//     return data ? JSON.parse(data) : null;
// }

// function handleFilterClick(event) {
//     event.preventDefault();  // To prevent default link behavior
//     const chosenFilter = event.currentTarget.getAttribute("data-filter");
//     filterType = chosenFilter;

//     if (chosenFilter === "newest") {
//         postTitleFeed.textContent = "Recent posts";
//     } 
//     else if (chosenFilter === "oldest") {
//         postTitleFeed.textContent = "Oldest posts";
//     }

//     cardsContainer.innerHTML = "";
//     showLoadingAnimation();

//     const sortedPosts = filterPosts(allPosts, filterType);
//     saveToSessionStorage("newAllPosts", sortedPosts);
//     processAndDisplayPosts();
// }
// filterItems.forEach(item => {
//     item.addEventListener("click", handleFilterClick);
// });


// // Function to process and display the posts once all fetching is done
// function processAndDisplayPosts() {
//     let filteredPosts = [];

//     const validPosts = getFromSessionStorage("newAllPosts").filter(post => 
//         post.title && post.title.trim() !== "" && post.body && post.body.trim() !== "");
//         filteredPosts.push(...validPosts);
//         filteredPosts = filterPosts(allPosts, filterType);
//         saveToSessionStorage("newAllPosts", filteredPosts);
    
//     filteredPosts.forEach(post => {
//         createCard(post, post.profileName, post.profileAvatar);
//     });
//     hideLoadingAnimation();
// }

// function initializePosts(){
//     cardsContainer.innerHTML = "";
//     showLoadingAnimation();
//     if (getFromSessionStorage("newAllPosts")) {
//         processAndDisplayPosts();
//     } 
//     else {
//         // getAllProfiles();
//     }
// }
// initializePosts();