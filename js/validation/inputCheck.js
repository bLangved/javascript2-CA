// Checking the length of the value passed in. 
export function checkLength(value, length) {
    if(value.trim().length >= length){
        return true;
    }
    else{
        return false;
    }
}

// Checking the email passed in, to see if if passes validation. 
export function validateEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    const patternMatches = regex.test(email);
    return patternMatches;
}

// Checks for valid noroff email pattern
export function validateNoroffEmail(email) {
    const regex = /^.+@(stud\.noroff\.no|noroff\.no)$/;
    const patternMatches = regex.test(email);
    return patternMatches;
}