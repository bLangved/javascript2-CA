
import { deleteSelectedPost } from "/js/posts/deletePost.js";
import { editSelectedPost } from "/js/posts/editPost.js";
import { createNewComment } from "/js/posts/createComment.js";
import { formatDate } from "/js/formating/formateDate.js";
import { formateUsername } from "/js/formating/formatUsername.js";

const cardsContainer = document.querySelector(".card-container")


export function createCard(objectData){
    // Create the card for the post

    const card = document.createElement("div");
    card.classList.add("mb-3", "card")
    // Set the data-id attribute to the card element
    card.dataset.id = objectData.id;


        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        
            // --- Top section of post
            const topSection = document.createElement("div");
            topSection.classList.add("mb-3", "d-flex", "align-items-center", "card-top-section");
            
                // User image
                const userImg = document.createElement("img");
                userImg.classList.add("me-3");
                userImg.src = localStorage.getItem("avatar");
                userImg.alt = "Your profile-image";
                topSection.append(userImg);
            
                // User name & post date
                const topText = document.createElement("div");
                topText.classList.add("card-top-text", "d-flex", "flex-column");

                    const userName = document.createElement("span");
                    userName.innerText = formateUsername(localStorage.getItem("username"));
                    topText.append(userName);

                    // sends the date retrieved from the json (creation time of post) into formateDate() for better date-formatting. 
                    const postDate = document.createElement("span");
                    const formattedPostDate = new Date(objectData.created);
                    postDate.innerText = formatDate(formattedPostDate);
                    topText.append(postDate);

            topSection.append(topText); 

                // Post options (delete post option)
                const postSettingsDropdown = document.createElement("div");
                postSettingsDropdown.classList.add("dropdown", "card-post-options");

                    const postSettingsButton = document.createElement("button");
                    postSettingsButton.classList.add("btn", "btn-primary", "btn-sm");
                    postSettingsButton.id = "dropdownMenuButton";
                    postSettingsButton.setAttribute("data-bs-toggle", "dropdown");
                    postSettingsButton.setAttribute("aria-expanded", "false");
                    postSettingsButton.innerText = "..."; // Three dots

                    const postSettingsMenu = document.createElement("div");
                    postSettingsMenu.classList.add("dropdown-menu");
                    postSettingsMenu.setAttribute("aria-labelledby", "dropdownMenuButton");

                    const deleteOption = document.createElement("a");
                    deleteOption.classList.add("dropdown-item");
                    deleteOption.href = "#";
                    deleteOption.innerText = "Delete Post";
                    // Eventlistener for deleting post, but the user needs to confirm their action.
                    deleteOption.addEventListener("click", function(e) {
                        e.preventDefault();
                        const userConfirmation = confirm("Are you sure you want to delete this post?");
                        if (userConfirmation) {
                            deleteSelectedPost(card.dataset.id);
                        }
                    });
                    
                postSettingsMenu.append(deleteOption);

                    const editOption = document.createElement("a");
                    editOption.classList.add("dropdown-item");
                    editOption.href = "#";
                    editOption.innerText = "Edit Post";
                    editOption.addEventListener("click", function(e) {
                        e.preventDefault();
                        editSelectedPost(card.dataset.id)
                    });
                postSettingsMenu.append(editOption);

                postSettingsDropdown.append(postSettingsButton, postSettingsMenu);
                topSection.append(postSettingsDropdown);

                    

        cardBody.append(topSection);

            // Body with the content of the post
            const bodyText = document.createElement("div");
            
                const bodyTitle = document.createElement("h3");
                bodyTitle.classList.add("card-title", "post-title");
                bodyTitle.innerText = objectData.title;
                bodyText.append(bodyTitle);

                const bodyParagraph = document.createElement("p");
                bodyParagraph.classList.add("card-text");
                bodyParagraph.innerText = objectData.body;
                bodyText.append(bodyParagraph);

        cardBody.append(bodyText);

        if (objectData.media) {
            const bodyMedia = document.createElement("img");
            bodyMedia.classList.add("card-img");
            bodyMedia.src = objectData.media;
            cardBody.append(bodyMedia);
            bodyMedia.addEventListener("click", () => {
                window.open(bodyMedia.src, '_blank');
            });
        }

            const hr1 = document.createElement("hr");
        cardBody.append(hr1);


            // --- Bottom section of post
            const bottomSection = document.createElement("div");
            bottomSection.classList.add("card-bottom-section", "mt-3", "mb-3");

                const interactionRowContainer = document.createElement("div");
                interactionRowContainer.classList.add("row", "row-vertical");

                    const interactionElement1 = document.createElement("div");
                    interactionElement1.classList.add("col-4", "text-center");
                        const likeIcon = document.createElement("i");
                        likeIcon.classList.add("fa-solid", "fa-thumbs-up", "pe-1");
                        const likeText = document.createElement("span");
                        likeText.innerText = "Like";
                        interactionElement1.append(likeIcon, likeText);
                        interactionElement1.addEventListener("click", () => {
                            if(!interactionElement1.style.color || interactionElement1.style.color === "initial"){
                                interactionElement1.style.color = "#216db3";
                            }
                            else{
                                interactionElement1.style.color = "initial";
                            }
                        });

                    const interactionElement2 = document.createElement("div");
                    interactionElement2.classList.add("col-4", "text-center");
                        const commentIcon = document.createElement("i");
                        commentIcon.classList.add("fa-solid", "fa-comment", "pe-1");
                        const commentText = document.createElement("span");
                        commentText.innerText = "Comment";
                    interactionElement2.append(commentIcon, commentText);

                    const interactionElement3 = document.createElement("div");
                    interactionElement3.classList.add("col-4", "text-center");
                        const shareIcon = document.createElement("i");
                        shareIcon.classList.add("fa-solid", "fa-share", "pe-1");
                        const shareText = document.createElement("span");
                        shareText.innerText = "Share";
                    interactionElement3.append(shareIcon, shareText);

                interactionRowContainer.append(interactionElement1, interactionElement2, interactionElement3);
            bottomSection.append(interactionRowContainer);
        cardBody.append(bottomSection);

            const hr2 = document.createElement("hr");
        cardBody.append(hr2);


                // --- Comments on post
            const commentSectionContainer = document.createElement("div");
            cardBody.append(commentSectionContainer);

            // --- Write a comment on post
            const writeCommentContainer = document.createElement("div");
            writeCommentContainer.classList.add("col", "mt-3");

            const writeCommentInput = document.createElement("input");
            writeCommentInput.classList.add("form-control");
            writeCommentInput.type = "text";
            writeCommentInput.placeholder = "Write a comment...";

            writeCommentInput.addEventListener("keyup", async function(event) {
                const AuthorizationToken = localStorage.getItem("accessToken");
                if (event.key === "Enter" && this.value.trim() !== "") {
                    try {
                        const newComment = await createNewComment(card.dataset.id, this.value.trim(), AuthorizationToken);
                        commentSectionContainer.append(newComment);
                        this.value = "";
                    } catch (error) {
                        console.error("Failed to post comment:", error);
                        // handle the error, maybe display a message to the user
                    }
                }
            });
        writeCommentContainer.append(writeCommentInput);
        cardBody.append(writeCommentContainer);


    card.append(cardBody);
    // prepend the card, so it gets displayed at the top of the feed on the initial publish
    cardsContainer.prepend(card);
};

