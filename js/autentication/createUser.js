const createErrorContainer = document.querySelector("#createUserError");
const createSucsessfulContainer = document.querySelector("#createUserSucsessful");
const createErrorMessage = document.querySelector("#createUserErrorMessage");
/**
 * API call that registers the user to the database
 * @param {string} url Register api endpoint
 * @param {any} userData User object
 * @description Register user to the database
 */
export async function registerUser(url, userData) {
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

        // Registration was successful. Redirects user to index.html after 5 seconds
        if (response.status >= 200 && response.status < 300) {
            createSucsessfulContainer.classList.remove("d-none");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 5000);
        }
        // Client-side error response
        else if (response.status >= 400 && response.status < 500) {
            createErrorContainer.classList.remove("d-none");
            createErrorMessage.innerText = `Registration failed due to the following issues:\n`;
            if (json.errors) {
                json.errors.forEach((error) => {
                    createErrorMessage.innerText += `- ${error.message}\n`;
                });
            } else {
                console.error(`JSON response does not contain an "errors" property:`, json);
            }
        }
        // Server-side error response
        else if (response.status >= 500 && response.status < 600){
            createErrorContainer.classList.remove("d-none");
            createErrorMessage.innerText = `Registration failed due to server related issues. Contact administrator, or try again later`;
        }
        // Information responses & Redirection messages
        else {
            createErrorContainer.classList.remove("d-none");
            createErrorMessage.innerText = `Registration failed: ${response.statusText}`;
            json.errors.forEach((error) => {
                createErrorMessage.innerText += `- ${error.message}\n`;
            });
        }
    } 
    // Log any unexpected errors to the console
    catch (error) {
        console.error("Unexpected error:", error);
    }
}