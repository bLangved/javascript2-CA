const API_BASE_URL = "https://api.noroff.dev";
const regiserEndpoint = "/api/v1/social/auth/register";
const loginEndpoint = "/api/v1/social/auth/login";
const getAllPostsEndpoint = "/api/v1/social/posts";

// -- Registers user to database -- //
/**
 * API call that registers the user
 * @param {string} url 
 * @param {any} userData 
 * ```js
 * registerUser(registerUrl, userToRegister)
 * ```
 */
async function registerUser(url, userData){
    console.log(url, userData);
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData), 
        };
        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error)
    }
};

const userToRegister = {
    name: "bhl_test_1", // Required
    email: "bhl_test_1.last@stud.noroff.no", // Required
    password: "bhl123lan", // Required
};


const registerUrl = `${API_BASE_URL}${regiserEndpoint}`;
// registerUser(registerUrl, userToRegister)


// -- -- -- -- -- -- -- -- -- -- -- -- -- -- //


// -- Login user to database -- //
async function loginUser(url, userData){
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
    } catch (error) {
        console.log(error);
    }
};

const userToLogin ={
    email: "bhl_test_1.last@stud.noroff.no", // Required
    password: "bhl123lan", // Required
};


const loginUrl = `${API_BASE_URL}${loginEndpoint}`;
// loginUser(loginUrl, userToLogin);


// -- -- -- -- -- -- -- -- -- -- -- -- -- -- //

// -- Request with token -- //

async function getWithToken(url){
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
    } catch (error) {
        console.log(error)
    }
}



const postUrl = `${API_BASE_URL}${getAllPostsEndpoint}`;
// getWithToken(postUrl);