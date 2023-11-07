import { setAvatarThumbnail } from "/js/htmlComponentsScripts/loadHeader.js";
/**
 * @param {string} url 
 * @returns {boolean} true / false
 * @example
    isValidUrl("https://www.example.com") would return true.
    isValidUrl("not a url") would return false.
 */
export function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * @param {string} updateProfileUrl - API endpoint for retrieving API user object
 * @param {string} authToken - accessToken from localStorage (from when user logged in)
 */
export async function viewProfileAvatar(profileUrl, authToken) {
    try {
        const data = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        };
        const response = await fetch(profileUrl, data);
        if (!response.ok) {
            throw new Error("Failed to fetch profile avatar.");
        }
        const json = await response.json();
        return json.avatar || null;
    } catch (error) {
        console.log(error);
    }
}
/**
 * @param {string} updateProfileUrl - API endpoint for updating entry media on profiles
 * @param {string} authToken - accessToken from localStorage (from when user logged in)
 * @param {string} imageUrl - URL where image is stored 
 */
export async function setProfileAvatar(updateProfileUrl, authToken, imageUrl) {
    try {
        const data = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ avatar: imageUrl })
        };
        const response = await fetch(updateProfileUrl, data);
            if (!response.ok) {
                throw new Error("Failed to update profile avatar.");
            }
        setAvatarThumbnail(imageUrl);
        await response.json();
        setTimeout(() => location.reload(), 250);
    } catch (error) {
        console.log(error);
    }
}
/**
 * @param {string} updateProfileUrl - API endpoint for updating entry media on profiles
 * @param {string} authToken - accessToken from localStorage (from when user logged in)
 * 
 * This does not actually "delete" the profile avatar, but rather empties the url string referencing the location of the image
 */
export async function deleteProfileAvatar(updateProfileUrl, authToken) {
    try {
        const data = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ avatar: "" })
        };
        const response = await fetch(updateProfileUrl, data);
            if (!response.ok) {
                throw new Error("Failed to delete profile avatar.");
            }
        setAvatarThumbnail("/images/profile/profile-img_default.png");
        await response.json();
        setTimeout(() => location.reload(), 250);
    } catch (error) {
        console.log(error);
    }
}