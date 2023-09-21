
const createSucsessfulContainer = document.querySelector("#createUserSucsessful");
const createErrorContainer = document.querySelector("#createUserError");

/**
 * API call that registers the user to the database
 * @param {string} url 
 * @param {any} userData 
 * ```js
 * registerUser(registerUrl, userToRegister)
 * ```
 */
export async function registerUser(url, userData){
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
        createSucsessfulContainer.classList.toggle("d-none");
    } catch (error) {
        console.log(error)
        createErrorContainer.classList.toggle("d-none");
    }
};