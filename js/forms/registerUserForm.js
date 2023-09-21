import { checkLength, validateNoroffEmail} from "../validation/inputCheck.js";
import { registerUser } from "../autentication/createUser.js";

const API_BASE_URL = "https://api.noroff.dev/api/v1";
const registerEndpoint = "/social/auth/register";

const form = document.querySelector("#createForm");
const formErrorMessage = document.querySelector("#createUserErrorMessage");

const firstName = document.querySelector("#createFirstName");
const lastName = document.querySelector("#createLastName");
const email = document.querySelector("#createEmail");
const emailType = document.querySelector("#emailType");
const password = document.querySelector("#createPassword");
const passwordConfirm = document.querySelector("#createPasswordConfirm");
const submitButton = document.querySelector("#submitButton");

const firstNameErrorMessage = document.querySelector("#firstNameErrorMessage");
const lastNameErrorMessage = document.querySelector("#lastNameErrorMessage")
const emailErrorMessage = document.querySelector("#emailErrorMessage");
const passwordErrorMessage = document.querySelector("#passwordErrorMessage");
const passwordConfirmErrorMessage = document.querySelector("#passwordConfirmErrorMessage");

const iconFirstNameSucsess = document.querySelector("#createFirstNameSucsess");
const iconFirstNameError = document.querySelector("#createFirstNameError");
const iconLastNameSucsess = document.querySelector("#createLastNameSucsess");
const iconLastNameError = document.querySelector("#createLastNameError");
const iconMailSucsess = document.querySelector("#createEmailSucsess");
const iconMailError = document.querySelector("#createEmailError");
const iconPasswordSucsess = document.querySelector("#createPasswordSucsess");
const iconPasswordError = document.querySelector("#createPasswordError");
const iconPasswordConfirmSucsess = document.querySelector("#createPasswordConfirmSucsess");
const iconPasswordConfirmError = document.querySelector("#createPasswordConfirmError");

const requiredFields = [firstName, lastName, email, password, passwordConfirm];

function validateForm() {
    console.clear();
    
    // Validation: Makes else-statements invalid for enabling submit-button
    let validationPassed = true;

    // First name
    // Checks name input-value, to check if it matches pattern
    if (checkLength(firstName.value, 2) === true) {
        iconFirstNameSucsess.classList.remove("d-none");
        iconFirstNameError.classList.add("d-none");
        firstNameErrorMessage.textContent = "";
    } 
    else {
        if(firstName.targeted){
            iconFirstNameSucsess.classList.add("d-none");
            iconFirstNameError.classList.remove("d-none");
            firstNameErrorMessage.textContent = "Invalid name";
        }
        validationPassed = false;
    }
    // Last name
    if (checkLength(lastName.value, 2) === true) {
        iconLastNameSucsess.classList.remove("d-none");
        iconLastNameError.classList.add("d-none");
        lastNameErrorMessage.textContent = "";
    } 
    else {
        if(lastName.targeted){
            iconLastNameSucsess.classList.add("d-none");
            iconLastNameError.classList.remove("d-none");
            lastNameErrorMessage.textContent = "Invalid name";
        }
        validationPassed = false;
    }
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

    // Autogenerates an email for the user that matches the email pattern required by the API. 

    function updateEmailBasedOnName() {
        const first = firstName.value;
        const last = lastName.value;
        
        // Get the selected email type
        const selectedEmailType = emailType.value;
        
        // Combine the first name and last name, separated by a '.'
        const combined = `${first}.${last}`;
        
        // Update the email field based on the selected email type
        email.value = combined + "@" + selectedEmailType;
    }

    // updates the inputs in real time when typing in the textfields
    firstName.addEventListener("input", updateEmailBasedOnName);
    lastName.addEventListener("input", updateEmailBasedOnName);
    emailType.addEventListener("change", updateEmailBasedOnName);

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
    // Confirm password
    // Checks if the confirmation password matches the original password
    if (passwordConfirm.value !== password.value) {
        if (passwordConfirm.targeted) {
            iconPasswordConfirmSucsess.classList.add("d-none");
            iconPasswordConfirmError.classList.remove("d-none");
            passwordConfirmErrorMessage.textContent = "Needs to match password above";
        }
        validationPassed = false;
    } else if (checkLength(passwordConfirm.value, 8) !== true) {
        if (passwordConfirm.targeted) {
            iconPasswordConfirmSucsess.classList.add("d-none");
            iconPasswordConfirmError.classList.remove("d-none");
        }
        validationPassed = false;
    } else {
        iconPasswordConfirmSucsess.classList.remove("d-none");
        iconPasswordConfirmError.classList.add("d-none");
        passwordConfirmErrorMessage.textContent = "";
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
            console.log("First name: " + firstName.value);
            console.log("Last name: " + lastName.value);
            console.log("Email: " + email.value);
            console.log("Password: " + password.value);
            console.log("Confirmed password: " + passwordConfirm.value);
        }
        else {
            submitButton.style.backgroundColor = ""; // Removes the sucsess validation color on the button if it does not meet requirements anymore. 
        }
    });
});

// This block handles the form submission event
submitButton.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent the form from submitting by default
    const isValidationPassed = validateForm();
    if (!isValidationPassed) {
        formErrorMessage.classList.remove("d-none");
        formErrorMessage.textContent = "Please ensure all fields are valid before proceeding!";
    } else {
        formErrorMessage.textContent = ""; // Clear any existing error messages

        // Concatinates first and last name with an "_" between them.
        const fullName = `${firstName.value}_${lastName.value}`;

        const userToRegister = {
            name: fullName, 
            email: email.value, 
            password: password.value, 
        };
        const registerUrl = `${API_BASE_URL}${registerEndpoint}`;
        form.classList.add("d-none");
        await registerUser(registerUrl, userToRegister);
        // TODO: Handle the form submission process after the API call
    }
});