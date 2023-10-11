// const createSucsessfulContainer = document.querySelector("#createUserSucsessful");
// const createErrorContainer = document.querySelector("#createUserError");

/**
 * API call that registers the user to the database
 * @param {string} url Register api endpoint
 * @param {any} userData User object
 * @description Register user to the database
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
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error)
    }
};