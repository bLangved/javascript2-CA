const createPostBtn = document.querySelector(".create-post-btn");
const createPostForm = document.querySelector(".create-post-form");

// Toggle visibility of post form-section on top of feed-section //
createPostBtn.addEventListener("click", function(){
    createPostForm.classList.toggle("d-none");
    if(createPostForm.classList.contains("d-none")){
        createPostBtn.innerText = "Create new post";
    }
    else if(!createPostForm.classList.contains("d-none")){
        createPostBtn.innerText = "Close form";
    }
});