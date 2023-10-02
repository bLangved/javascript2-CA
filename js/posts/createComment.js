const API_BASE_URL = "https://api.noroff.dev/api/v1";

export async function createNewComment(postId, commentText, AuthorizationToken) {
    const createCommentEndpoint = `/social/posts/${postId}/comment`;
    const createCommentUrl = `${API_BASE_URL}${createCommentEndpoint}`;
    console.log(postId);
    console.log(commentText);

    // Make the POST request to the API to save the comment
    const response = await fetch(createCommentUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AuthorizationToken}`
        },
        body: JSON.stringify({
            body: commentText
            // if you were replying to another comment you'd add the replyToId here
        })
    });

    // Check if response is ok before trying to parse the body
    if (!response.ok) {
        throw new Error("Failed to save comment");
    }

    const data = await response.json();

    // Create the DOM element for the new comment
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("card-comment-section", "d-flex", "align-items-center");

    const commentUserImg = document.createElement("img");
    commentUserImg.classList.add("me-3");
    commentUserImg.src = data.author.avatar || "/IMAGES/people_thumbnails/person1.jpeg"; // use the avatar from the response / or default pic
    commentUserImg.alt = "User profile-image";
    commentContainer.append(commentUserImg);

    const commentSubContainer = document.createElement("div");
    commentSubContainer.classList.add("card-comment");

    const commentName = document.createElement("span");
    commentName.innerText = data.author.name || "Default name"; // use the name from the response
    commentSubContainer.append(commentName);

    const commentParagraph = document.createElement("p");
    commentParagraph.classList.add("p-2");
    commentParagraph.innerText = data.body; // use the comment body from the response
    commentSubContainer.append(commentParagraph);

    commentContainer.append(commentSubContainer);

    return commentContainer;
}