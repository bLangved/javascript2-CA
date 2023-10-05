const API_BASE_URL = "https://api.noroff.dev/api/v1";
const profileEndpoint = "/social/profiles/bjornar_heian";
const endpointUrl = `${API_BASE_URL}${profileEndpoint}`;

const AuthorizationToken = localStorage.getItem("accessToken");

async function fetchProfile(endpointUrl, AuthorizationToken){
    try {
        const data = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AuthorizationToken}`
            }
        };
        const response = await fetch(endpointUrl, data);
        const json = await response.json();
        createProfile(json);
        console.log(json);
    } catch (error) {
        console.log(error)
    }
};


const profileSection = document.querySelector("#profileSection");

function createProfile(profileData){

    const profileImg = document.createElement("img");
    profileImg.classList.add("img-thumbnail", "profile-img");
    profileImg.src = profileData.avatar;
    profileImg.alt = `${profileData.name}'s profile Image`;
    profileSection.append(profileImg);

    const profileName = document.createElement("h1");
    profileName.classList.add("profile-name", "mt-3");
    profileName.innerText = profileData.name;
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
fetchProfile(endpointUrl, AuthorizationToken);









