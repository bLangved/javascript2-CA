import authToken from "/js/variables/localStorage.js";
import { profileUrl, updateProfileUrl } from "/js/variables/apiEndpoints.js";
import { viewProfileAvatar, setProfileAvatar, deleteProfileAvatar, isValidUrl } from "./adjustProfileImage.js";
import { formateUsername } from "/js/formating/formatUsername.js";

async function fetchProfile(profileUrl, authToken){
    try {
        const data = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        };
        const response = await fetch(profileUrl, data);
        const json = await response.json();
        createProfile(json);
    } catch (error) {
        console.log(error)
    }
};

const profileSection = document.querySelector("#profileSection");

function createProfile(profileData){

    const profileImg = document.createElement("img");
    profileImg.classList.add("img-thumbnail", "profile-img");
        if (profileData.avatar) {
            profileImg.src = profileData.avatar;
        } else {
            profileImg.src = "/images/profile/profile-img_default.png";
        }
    profileImg.alt = `${profileData.name.replace("_", " ")}'s profile Image`;
    profileSection.append(profileImg);
    
    const profileImgOptions = document.createElement("div");
    profileImgOptions.classList.add("dropdown-menu", "profile-image_navbar-container", "d-none");
    profileSection.append(profileImgOptions);


    const watchItem = document.createElement("a");
    watchItem.classList.add("dropdown-item");
    watchItem.innerText = "Watch profile Image";
    profileImgOptions.append(watchItem);

    watchItem.addEventListener("click", async () =>{
        const avatarUrl = await viewProfileAvatar(profileUrl, authToken);
        if (avatarUrl) {
            window.open(avatarUrl);
        } 
        else if(!avatarUrl){
            console.log("There is no profile image uploaded");
        }
        else {
            console.log("There was an error displaying the profile image");
        }
    });

    const changeItem = document.createElement("a");
    changeItem.classList.add("dropdown-item");
    changeItem.innerText = "Change profile Image";
    profileImgOptions.append(changeItem);

    changeItem.addEventListener("click", async () => {
        const imageUrl = prompt("Please enter the image URL:");
        if (imageUrl) {
            if (isValidUrl(imageUrl)) {
                profileImg.src = imageUrl;
                await setProfileAvatar(updateProfileUrl, authToken, imageUrl);
            } else {
                alert("Please enter a valid URL.");
            }
        }
    });

    const deleteItem = document.createElement("a");
    deleteItem.classList.add("dropdown-item");
    deleteItem.innerText = "Delete profile image";
    profileImgOptions.append(deleteItem);

    deleteItem.addEventListener("click", async () => {
        const deletePrompt = confirm("Are you sure you want to delete your profile image?");
        if (deletePrompt) {
                await deleteProfileAvatar(updateProfileUrl, authToken);
            }
        }
    );

    /**
     * - document.addEventListener
     * - profileImg.addEventListener
     * Both event listeners for clicking on the profile image / outside the image, and show/hide the container for adjusting it. 
     */
    document.addEventListener("click", (event) => {
        if (
            event.target !== profileImg &&
            event.target !== profileImgOptions
        ) {
            profileImgOptions.classList.add("d-none");
        }
    });
    profileImg.addEventListener("click", () => {
        profileImgOptions.classList.toggle("d-none");
        if(!profileImgOptions.classList.contains("d-none")){
            profileImgOptions.classList.add("d-block");
        }
        else{
            profileImgOptions.classList.remove("d-block");
        }
    });

    const profileName = document.createElement("h1");
    profileName.classList.add("profile-name", "mt-3");
    profileName.innerText = formateUsername(profileData.name);
    profileSection.append(profileName);

    const followButton = document.createElement("button");
    followButton.classList.add("btn", "btn-primary", "mb-3");
    followButton.type = "button";
    followButton.innerText = "Follow";
    followButton.addEventListener("click", () => {
        if(followButton.innerText === "Follow"){
            followButton.innerText = "Unfollow";
        }
        else{
            followButton.innerText = "Follow";
        }
    });
    profileSection.append(followButton);

    const followContainer = document.createElement("div");
    followContainer.classList.add("profile-follow-container");

        const following = document.createElement("span");
        following.classList.add("me-3");
        following.innerText = `${profileData._count.following} Following`;
        followContainer.append(following);

        const followers = document.createElement("span");
        followers.innerText = `${profileData._count.followers} Followers`;
        followContainer.append(followers);

    profileSection.append(followContainer);
}
fetchProfile(profileUrl, authToken);