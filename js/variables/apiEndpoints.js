import { username } from "/js/variables/localStorage.js";

/**
 * @param {string} API_BASE_URL Base URL for API. All other endpoints goes after this.
 */
const API_BASE_URL = "https://api.noroff.dev/api/v1";
export default API_BASE_URL;


const loginEndpoint = "/social/auth/login";
/**
 * @param {string} API_BASE_URL Base URL
 * @param {string} loginEndpoint Used in POST requests for logging in registered user.
 * @description concatenates the value of API_BASE_URL and loginEndpoint.
 */
export const loginUrl = `${API_BASE_URL}${loginEndpoint}`;


const registerEndpoint = "/social/auth/register";
/**
 * @param {string} API_BASE_URL Base URL
 * @param {string} registerEndpoint Used in POST requests for registering a user to the database.
 * @description concatenates the value of API_BASE_URL and registerEndpoint.
 */
export const registerUrl = `${API_BASE_URL}${registerEndpoint}`;


const allPostsEndpoint = "/social/posts";
/**
 * @param {string} API_BASE_URL Base URL
 * @param {string} allPostsEndpoint Used in GET requests for retrieving all posts in API
 * @description concatenates the value of API_BASE_URL and allPostsEndpoint.
 */
export const allPostsUrl = `${API_BASE_URL}${allPostsEndpoint}`;


const allProfileEndpoint = `/social/profiles`;
/**
 * @param {string} API_BASE_URL Base URL
 * @param {string} allProfileEndpoint Used in GET requests for retrieving all API profile related data in user object
 * @description concatenates the value of API_BASE_URL and allProfileEndpoint.
 */
export const allProfilesUrl = `${API_BASE_URL}${allProfileEndpoint}`;


const profileEndpoint = `/social/profiles/${username}`;
/**
 * @param {string} API_BASE_URL Base URL
 * @param {string} profileEndpoint Used in GET requests for retrieving profile related data in user object
 * @description concatenates the value of API_BASE_URL and profileEndpoint.
 */
export const profileUrl = `${API_BASE_URL}${profileEndpoint}`;


const allPostsByProfileEndpoint = `/social/profiles/${username}/posts`;
/**
 * @param {string} API_BASE_URL Base URL
 * @param {string} allPostsByProfileEndpoint Used in GET requests for retrieving all profile posts in user object
 * @description concatenates the value of API_BASE_URL and allPostsByProfileEndpoint.
 */
export const AllPostsByProfileUrl = `${API_BASE_URL}${allPostsByProfileEndpoint}`;


const updateProfileEndpoint = `/social/profiles/${username}/media`;
/**
 * @param {string} API_BASE_URL Base URL
 * @param {string} updateProfileEndpoint Used in PUT requests for modifying user object
 * @description concatenates the value of API_BASE_URL and updateProfileEndpoint.
 */
export const updateProfileUrl = `${API_BASE_URL}${updateProfileEndpoint}`;