import authToken from "/js/variables/localStorage.js";
import API_BASE_URL from "/js/variables/apiEndpoints.js";
import { allProfilesUrl } from "/js/variables/apiEndpoints.js";
import { hideLoadingAnimation, showLoadingAnimation } from "/js/components/loadingAnimation.js";
import { createCard } from "/js/posts/allPostsHTML.js";
import { filterPosts } from "/js/posts/filterPosts.js";

let currentFilterType = "newest"; 
let allProfiles = [];
let allPosts = [];
let offset = 0;
const limit = 50;
const cardsContainer = document.querySelector(".card-container");

function saveToSessionStorage(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
}

function getFromSessionStorage(key) {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

async function getAllProfiles() {
    try {
        const response = await fetch(`${allProfilesUrl}?limit=${limit}&offset=${offset}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        const filteredProfiles = data.filter(profile => profile._count.posts >= 1);
        allProfiles = allProfiles.concat(filteredProfiles);

        if (data.length < limit) {
            const promises = allProfiles.map(profile => {
                const { name, avatar } = profile;
                return getPostsOfProfiles(name, avatar); 
            });
            await Promise.all(promises);

            // Process and Display Data only AFTER all fetching is complete
            processAndDisplayPosts();
        } 
        else {
            setTimeout(() => {
                offset += limit;
                getAllProfiles(); // Recursive call
            }, 100);
        }
    } catch (error) {
        console.error("There was an error fetching the profiles:", error);
    }
}

async function getPostsOfProfiles(profileName, profileAvatar) {
    const allPostsByAllProfilesEndpoint = `/social/profiles/${profileName}/posts`;
    const allPostsByAllProfilesUrl = `${API_BASE_URL}${allPostsByAllProfilesEndpoint}`;

    try {
        const response = await fetch(allPostsByAllProfilesUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json",
            }
        });
        
        const data = await response.json();

        // Exclude posts with empty title or body
        const validPosts = data.filter(post => 
        post.title && post.title.trim() !== "" && post.body && post.body.trim() !== "");
        
        validPosts.forEach(post => {
            post.profileName = profileName;
            post.profileAvatar = profileAvatar;
        });
        allPosts.push(...validPosts);

    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

// Function to process and display the posts once all fetching is done
function processAndDisplayPosts() {
    let filteredPosts = getFromSessionStorage("filteredPosts");

    if (!filteredPosts) {
        filteredPosts = filterPosts(allPosts, currentFilterType);
        saveToSessionStorage("filteredPosts", filteredPosts);
    }
    const last30Posts = filteredPosts.slice(-30);

    last30Posts.forEach(post => {
        createCard(post, post.profileName, post.profileAvatar);
    });
    hideLoadingAnimation();
}

function initializePosts(){
    cardsContainer.innerHTML = "";
    showLoadingAnimation();
    if (getFromSessionStorage("filteredPosts")) {
        processAndDisplayPosts();
    } 
    else {
        getAllProfiles();
    }
}
initializePosts();

