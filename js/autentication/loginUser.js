import authToken from "/js/variables/localStorage.js";
import { allPostsUrl } from "/js/variables/apiEndpoints.js";
import { hideLoadingAnimation } from "/js/components/loadingAnimation.js";
 

const loginSucsessfulContainer = document.querySelector("#loginUserSucsessful");
const loginErrorContainer = document.querySelector("#loginUserError");

/**
 * @param {string} url login api endpoint 
 * @param {any} userData user object
 * @description Login user to database
 * @description User authToken, username and avatar gets "set" in localStorage here. Gets exported from localStorage.js as variables.
 */
export async function loginUser(url, userData) {
    // console.log(url, userData);
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData), 
        };
        const response = await fetch(url, postData);
        const json = await response.json();
        const accessToken = json.accessToken;
        const username = json.name;
        const avatar = json.avatar;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", avatar);
        AuthorizeToken(allPostsUrl);
    } catch (error) {
        console.log(error);
    }
};

/**
 * @param {string} url Displaying all user posts endpoint
 * @description Autorize token from server and login user
 */
export async function AuthorizeToken(url){
    try {
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        }
        const respons = await fetch(url, fetchOptions);
        const json = await respons.json();
        if (respons.ok) {
            // This is ONLY for testing purpose atm. I want to check the console before it takes me further. 
            setTimeout(() => {
                hideLoadingAnimation();
                window.location.href = "/feed/index.html";
            }, 3000)
            
        } else {
            // Handle the unsuccessful response here (e.g., show an error message to the user)
            console.error("Token validation failed.");
        }
    } catch (error) {
        console.log(error)
    }
}