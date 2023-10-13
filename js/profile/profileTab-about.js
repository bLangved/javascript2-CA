import { username, email } from "/js/variables/localStorage.js";
import { formateUsername } from "/js/formating/formatUsername.js";

const aboutContainer = document.querySelector(".profile-about-container");

export function createAboutSection() {
    const profileName = document.createElement("span");
    profileName.innerText = `Full Name: ${formateUsername(username)}`;
    aboutContainer.append(profileName);

    const profileEmail = document.createElement("span");
    profileEmail.innerText = `Email address: ${email}`;
    aboutContainer.append(profileEmail);
}