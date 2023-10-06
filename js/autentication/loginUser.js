import { hideLoadingAnimation } from "../components/loadingAnimation.js";

const API_BASE_URL = "https://api.noroff.dev";
const getAllPostsEndpoint = "/api/v1/social/posts";

const loginSucsessfulContainer = document.querySelector("#loginUserSucsessful");
const loginErrorContainer = document.querySelector("#loginUserError");


/**
 * API call that Login user to client
 * @param {string} url 
 * @param {any} userData 
 * ```js
 * loginUser(loginUrl, userToLogin)
 * ```
 */

// -- Login user to database -- //
export async function loginUser(url, userData){
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
        // console.log(response);
        const json = await response.json();
        // console.log(json);
        const accessToken = json.accessToken;
        localStorage.setItem("accessToken", accessToken);
        const username = json.name;
        localStorage.setItem("username", username);
        // console.log(accessToken);
        AuthorizeToken(`${API_BASE_URL}${getAllPostsEndpoint}`);
    } catch (error) {
        console.log(error);
    }
};


// -- Autorize token and login -- //

export async function AuthorizeToken(url){
    try {
        // console.log(url);
        const token = localStorage.getItem("accessToken");
        // console.log(token);
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
        const respons = await fetch(url, fetchOptions);
        // console.log(respons);
        const json = await respons.json();
        // console.log(json);
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