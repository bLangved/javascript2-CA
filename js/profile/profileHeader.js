import { updateProfileImage } from "./updateProfileImage.js";

const username = localStorage.getItem("username");

const API_BASE_URL = "https://api.noroff.dev/api/v1";

const profileEndpoint = `/social/profiles/${username}`;
const profileUrl = `${API_BASE_URL}${profileEndpoint}`;

const updateProfileEndpoint = `/social/profiles/${username}/media`;
const updateProfileUrl = `${API_BASE_URL}${updateProfileEndpoint}`;

const authToken = localStorage.getItem("accessToken");

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
    updateProfileImage(profileImg, updateProfileUrl, authToken) // update / store new profile avatar
    profileSection.append(profileImg);


    const profileName = document.createElement("h1");
    profileName.classList.add("profile-name", "mt-3");
    const nameWithSpace = profileData.name.replace("_", " ");
    const capitalizedName = nameWithSpace.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    profileName.innerText = capitalizedName;
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









