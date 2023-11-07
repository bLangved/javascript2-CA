import { createAboutSection } from "/js/profile/profileTab-about.js";

document.addEventListener("DOMContentLoaded", function() {
    const listGroupButtons = document.querySelectorAll(".list-group-item-action");
    const sections = document.querySelectorAll(".feed-posts-section, .about-section, .friends-section, .photos-section");
    const createPostForms = document.querySelectorAll(".post-topSection-profile");

    listGroupButtons.forEach(button => {
        button.addEventListener("click", function() {
            listGroupButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.removeAttribute("aria-current");
            });

            sections.forEach(section => {
                section.classList.add("d-none");
            });

            // Hide all the createPostForm elements by default
            createPostForms.forEach(form => {
                form.classList.add("d-none");
            });

            button.classList.add("active");
            button.setAttribute("aria-current", "true");

            let sectionClass;
            switch(button.textContent.trim().toLowerCase()) {
                case "feed":
                    sectionClass = "feed-posts-section";
                    // Display all the createPostForm elements when 'feed' is selected
                    createPostForms.forEach(form => {
                        form.classList.remove("d-none");
                    });
                    break;
                case "about":
                    sectionClass = "about-section";
                    break;
                case "friends":
                    sectionClass = "friends-section";
                    break;
                case "photos":
                    sectionClass = "photos-section";
                    break;
            }

            const sectionToShow = document.querySelector("." + sectionClass);
            if (sectionToShow) {
                sectionToShow.classList.remove("d-none");
            }
        });
    });
});
createAboutSection();
