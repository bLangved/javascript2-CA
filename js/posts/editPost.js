// The actual form, and button for showing form
const editPostForm = document.querySelector(".create-post-form");
const editPostBtn = document.querySelector(".create-post-btn");
// input fields and submit button
const postTitle = document.querySelector("#postTitle");
const postBody = document.querySelector("#postBody");
const postSubmit = document.querySelector("#postSubmit"); // The submit button used for createPost (will be hidden)
const postEditSubmit = document.querySelector("#postEditSubmit"); // The submit button used for editsPost


export async function editSelectedPost(postId){
    const API_BASE_URL = "https://api.noroff.dev/api/v1";
    const editSelectedPostEndpoint = `/social/posts/${postId}`;
    const editPostUrl = `${API_BASE_URL}${editSelectedPostEndpoint}`;
    const AuthorizationToken = localStorage.getItem("accessToken");

    // Select all posts, and hide non selected posts
    const allPosts = document.querySelectorAll(".card");
    allPosts.forEach(post => {
        if (post.dataset.id !== postId) {
            post.classList.add("d-none");
        } else {
            post.classList.add("d-block");
        }
    });

    // Fetch post details and show them in the form
    try {
        const response = await fetch(editPostUrl, {
            headers: {
                "Authorization": `Bearer ${AuthorizationToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch post details: ${response.statusText}`);
        }

        const post = await response.json();
        postTitle.value = post.title;
        postBody.value = post.body;
        
        // Show the form
        editPostForm.classList.remove("d-none");
        postSubmit.classList.toggle("d-none");
        postEditSubmit.classList.toggle("d-none");
        editPostBtn.innerText = "Close form";

        // Toggle visibility of unslected posts
        editPostBtn.addEventListener("click", () => {
            allPosts.forEach(post => {
                if (post.dataset.id !== postId) {
                    post.classList.remove("d-none");
                }
        })});
        
        postEditSubmit.addEventListener("click", (e) => handlePostSubmit(e, editPostUrl, AuthorizationToken));

    } catch (error) {
        console.error(error);
    }
};


async function handlePostSubmit(e, editPostUrl, AuthorizationToken) {
    e.preventDefault();
    const userData = {
        title: postTitle.value,
        body: postBody.value
    };
    try {
        const response = await fetch(editPostUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AuthorizationToken}`
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            postTitle.value = "";
            postBody.value = "";
            window.location.reload(); // reload the page
        } else {
            throw new Error(`Failed to update post: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
    }
};