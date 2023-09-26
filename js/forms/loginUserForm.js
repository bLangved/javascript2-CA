import { checkLength, validateNoroffEmail} from "../validation/inputCheck.js";
import { loginUser } from "../autentication/loginUser.js";
import { showLoadingAnimation } from "../components/loadingAnimation.js";


const API_BASE_URL = "https://api.noroff.dev";
const loginEndpoint = "/api/v1/social/auth/login";

const textLogin = document.querySelector("#textLogin");

const formContainer = document.querySelector("#formContainer")
const form = document.querySelector("#loginForm");
const formErrorMessage = document.querySelector("#loginUserErrorMessage");

const email = document.querySelector("#emailLogin");
const password = document.querySelector("#passwordLogin");
const submitButton = document.querySelector("#submitButtonLogin");

const emailErrorMessage = document.querySelector("#emailErrorMessage");
const passwordErrorMessage = document.querySelector("#passwordErrorMessage");

const iconMailSucsess = document.querySelector("#emailLoginSucsess");
const iconMailError = document.querySelector("#emailLoginError");
const iconPasswordSucsess = document.querySelector("#passwordLoginSucsess");
const iconPasswordError = document.querySelector("#passwordLoginError");


const requiredFields = [email, password];

function validateForm() {
    console.clear();
    
    // Validation: Makes else-statements invalid for enabling submit-button
    let validationPassed = true;

    // Email
    // Checks email input-value, to check if it matches email-pattern
    if (validateNoroffEmail(email.value) === true) {
        iconMailSucsess.classList.remove("d-none");
        iconMailError.classList.add("d-none");
        emailErrorMessage.textContent = "";
    } 
    else {
        if(email.targeted){
            iconMailSucsess.classList.add("d-none");
            iconMailError.classList.remove("d-none");
            emailErrorMessage.textContent = "Should be firstname.lastname@stud.noroff.no / @noroff.no";
        }
        validationPassed = false;
    }
    // Password
    // Checks password input-value, to check so it does not contain spaces and required length
    if(checkLength(password.value, 8) === true) {
        iconPasswordSucsess.classList.remove("d-none");
        iconPasswordError.classList.add("d-none");
        passwordErrorMessage.textContent = "";
    }
    else{
        if(password.targeted){
            iconPasswordSucsess.classList.add("d-none");
            iconPasswordError.classList.remove("d-none");
            passwordErrorMessage.textContent = "Password needs to be at least 8 characters";
        }
        validationPassed = false;
    }
    return validationPassed;
}

const submitReady = {
    backgroundColor: "green"
};

// This block validates the form in real-time as the user types into the input fields
requiredFields.forEach((field) => {
    // Does not show error message if input-field is not targeted
    field.targeted = false;
    field.addEventListener("input", () => {
        field.targeted = true;
        const isValidationPassed = validateForm();
        if (isValidationPassed) {
            Object.assign(submitButton.style, submitReady);
            console.log("Email: " + email.value);
            console.log("Password: " + password.value);
        }
        else {
            submitButton.style.backgroundColor = ""; // Removes the sucsess validation color on the button if it does not meet requirements anymore. 
        }
    });
});

// This block handles the form submission event
submitButton.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent the form from submitting by default
    const isValidationPassed = validateForm();
    if (!isValidationPassed) {
        formErrorMessage.classList.remove("d-none");
        formErrorMessage.textContent = "Please ensure all fields are valid before proceeding!";
    } else {
        formErrorMessage.textContent = ""; // Clear any existing error messages

        const userToLogin = {
            email: email.value, 
            password: password.value, 
        };
        textLogin.textContent = "Logging inn to Chatably"
        formContainer.classList.add("d-none");
        showLoadingAnimation();
        const loginUrl = `${API_BASE_URL}${loginEndpoint}`;
        loginUser(loginUrl, userToLogin);
    }
});