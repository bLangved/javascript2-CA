import { imageNavBar } from "./profileImageNavbar.js";

export function updateProfileImage(profileImg, updateProfileUrl, authToken) {
    profileImg.addEventListener("click", () => {
        imageNavBar(profileImg, updateProfileUrl, authToken);
    });
}



