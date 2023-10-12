import { createCard } from "./postHTML.js";

// The actual form, and button for showing form
const createPostForm = document.querySelector(".create-post-form");
const createPostBtn = document.querySelector(".create-post-btn");
// input fields and submit button
const postTitle = document.querySelector("#postTitle");
const postBody = document.querySelector("#postBody");
const postMedia = document.querySelector("#postMedia")
const postSubmit = document.querySelector("#postSubmit");

const API_BASE_URL = "https://api.noroff.dev/api/v1";
const createPostEndpoint = "/social/posts";
const createPostUrl = `${API_BASE_URL}${createPostEndpoint}`;


// Toggle visibility of post form-section on top of feed-section //
createPostBtn.addEventListener("click", () => {
    createPostForm.classList.toggle("d-none");
    if(createPostForm.classList.contains("d-none")){
        createPostBtn.innerText = "Create new post";
    }
    else if(!createPostForm.classList.contains("d-none")){
        createPostBtn.innerText = "Close form";
    }
});


postSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    const postContent = {
            title: postTitle.value, 
            body: postBody.value,
            media: postMedia.value  
    }
    const AuthorizationToken = localStorage.getItem("accessToken");
    await createPost(createPostUrl, postContent, AuthorizationToken)
    // Clears input fields, close the form and change button text
    postTitle.value = "";
    postBody.value = "";
    createPostBtn.innerText = "Create new post";
    createPostForm.classList.toggle("d-none");
});

/**
 * API call that creates a user post. This function recieves the token from local storage. 
 * @param {string} url API endpoint for social posts
 * @param {any} postContent At least title and body content
 * @param {string} AuthorizationToken Retrieved from local storage
 * ```js
 * createPost(url, postContent, AuthorizationToken)
 * ```
 */
async function createPost(url, postContent, AuthorizationToken){
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AuthorizationToken}`
            },
            body: JSON.stringify(postContent), 
        };
        const response = await fetch(url, postData);
        const json = await response.json();
        createCard(json);
    } catch (error) {
        console.log(error)
    }
};


