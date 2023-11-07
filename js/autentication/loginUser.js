import { allPostsUrl } from "/js/variables/apiEndpoints.js";
import { hideLoadingAnimation } from "/js/components/loadingAnimation.js";

const loginSucsessfulContainer = document.querySelector("#loginUserSucsessful");
const loginErrorContainer = document.querySelector("#loginUserError");
const loginErrorMessage = document.querySelector("#errorMessage");

/**
 * @param {string} url login api endpoint 
 * @param {any} userData user object
 * @description Login user to database
 * @description User authToken, username and avatar gets "set" in localStorage here. Gets exported from localStorage.js as variables.
 */
export async function loginUser(url, userData) {
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
        // console.log(json);
        if (response.ok){
            const accessToken = json.accessToken;
            const username = json.name;
            const avatar = json.avatar;
            const email = json.email;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("username", username);
            localStorage.setItem("avatar", avatar);
            localStorage.setItem("email", email);
            AuthorizeToken(allPostsUrl);
        }   
        else if(response.status === 401){
            loginErrorContainer.classList.remove("d-none");
            loginErrorMessage.innerText = "Wrong login credentials. Please try again";
            hideLoadingAnimation();
        }
        else if(response.status === 429){
            loginErrorContainer.classList.remove("d-none");
            loginErrorMessage.innerText = "Too many login attempts in a short amount of time. Please wait a few minutes before trying again";
            hideLoadingAnimation();
        }
        else{
            loginErrorContainer.classList.remove("d-none");
            loginErrorMessage.innerText = "Some error during login. Try again later, og contact administrator if problem persist";
            hideLoadingAnimation();
        }
    } 
    catch (error) {
        console.log(error);
    }
};

/**
 * @param {string} url Displaying all user posts endpoint
 * @description Autorize token from server and login user
 */
async function AuthorizeToken(url){
    try {
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
        const response = await fetch(url, fetchOptions);
        const json = await response.json();
        // console.log(json);

        if (response.ok) {
            loginSucsessfulContainer.classList.remove("d-none");
            // I have been doing this the complicated way all along, and not thought about how I could just pass the json from the initial request here, and work with that data.
            // I will keep this commented out, and see how I can improve my code later on. 
            // sessionStorage.setItem("newAllPosts", JSON.stringify(json));
            setTimeout(() => {
                hideLoadingAnimation();
                window.location.href = "/feed/index.html";
            }, 3000)
            
        }
        else if(response.status === 500){
            loginErrorContainer.classList.remove("d-none");
            loginErrorMessage.innerText = "Wrong login credentials. Please try again";
            hideLoadingAnimation();
        }
        else {
            loginErrorContainer.classList.remove("d-none");
            console.error("Token validation failed.");
            hideLoadingAnimation();
        }
    } 
    catch (error) {
        loginErrorContainer.classList.remove("d-none");
        console.log(error)
    }
}