import { checkLength, validateEmail} from "../validation/inputCheck.js";

// const loginForm = document.querySelector(".login-form")
const inputEmail = document.querySelector("#loginEmail");
const inputPassword = document.querySelector("#loginPassword");
const submitButton = document.querySelector("#loginButton");

const iconMailSucsess = document.querySelector("#loginEmailSucsess");
const iconMailError = document.querySelector("#loginEmailError");
const iconPasswordSucsess = document.querySelector("#loginPasswordSucsess");
const iconPasswordError = document.querySelector("#loginPasswordError");

const requiredFields = [inputEmail, inputPassword];

function validateForm() {
    console.clear();
    
    // Validation: Makes else-statements invalid for enabling submit-button
    let validationPassed = true;

    // Email
    // Checks email input-value, to check if it matches email-pattern
    if (validateEmail(inputEmail.value) === true) {
        iconMailSucsess.classList.remove("d-none");
        iconMailError.classList.add("d-none");
    } 
    else {
        if(inputEmail.targeted){
            iconMailSucsess.classList.add("d-none");
            iconMailError.classList.remove("d-none");
        }
        validationPassed = false;
    }
    // Password
    // Checks password input-value, to check so it does not contain spaces and required length
    if(checkLength(inputPassword.value, 8) === true) {
        iconPasswordSucsess.classList.remove("d-none");
        iconPasswordError.classList.add("d-none");
    }
    else{
        if(inputPassword.targeted){
            iconPasswordSucsess.classList.add("d-none");
            iconPasswordError.classList.remove("d-none");
        }
        validationPassed = false;
    }

    return validationPassed;

}

const submitReady = {
    backgroundColor: "green"
};
const submitNotReady = {
    backgroundColor: "Initial"
};

requiredFields.forEach((field) => {

    // Does not show error message if input-field is not targeted
    field.targeted = false;

    field.addEventListener("input", () => {
        field.targeted = true;
        const isValidationPassed = validateForm();
        if (isValidationPassed) {
            Object.assign(submitButton.style, submitReady);
        }
        else {
            submitButton.style.backgroundColor = ""; // Removes the sucsess validation color on the button if it does not meet requirements anymore. 
        }
    });
});
