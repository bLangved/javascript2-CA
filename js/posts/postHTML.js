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
                userImg.src = "/IMAGES/people_thumbnails/person1.jpeg";
                userImg.alt = "Your profile-image";
                topSection.append(userImg);
            
                // User name & post date
                const topText = document.createElement("div");
                topText.classList.add("card-top-text", "d-flex", "flex-column");

                    const userName = document.createElement("span");
                    userName.innerText = "Your name";
                    topText.append(userName);

                    const postDate = document.createElement("span");
                    postDate.innerText = objectData.created;
                    topText.append(postDate);

            topSection.append(topText); 
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

                const commentContainer = document.createElement("div");
                commentContainer.classList.add("card-comment-section", "d-flex", "align-items-center");

                    // User image - comment
                    const commentUserImg = document.createElement("img");
                    commentUserImg.classList.add("me-3");
                    commentUserImg.src = "/IMAGES/people_thumbnails/person1.jpeg";
                    commentUserImg.alt = "Your profile-image";
                commentContainer.append(commentUserImg);

                    const commentSubContainer = document.createElement("div");
                    commentSubContainer.classList.add("card-comment");

                        const commentName = document.createElement("span");
                        commentName.innerText = "This is a placeholder for the user"
                    commentSubContainer.append(commentName);    

                        const commentParagraph = document.createElement("p");
                        commentParagraph.classList.add("p-2");
                        commentParagraph.innerText = "This is a placeholder for the comment";
                    commentSubContainer.append(commentParagraph);    

                commentContainer.append(commentSubContainer);
            commentSectionContainer.append(commentContainer);
        cardBody.append(commentSectionContainer);

            // --- Write a comment on post
            const writeCommentContainer = document.createElement("div");
            writeCommentContainer.classList.add("col", "mt-3");

                const writeCommentInput = document.createElement("input");
                writeCommentInput.classList.add("form-control");
                writeCommentInput.type = "text";
                writeCommentInput.placeholder = "Write a comment...";

            writeCommentContainer.append(writeCommentInput);
        cardBody.append(writeCommentContainer);

    
    card.append(cardBody);
    cardsContainer.append(card);
};

