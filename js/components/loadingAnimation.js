const loadingContainer = document.querySelector(".loadingContainer");

// Function to show the loading animation
export function showLoadingAnimation() {
    loadingContainer.classList.remove("d-none");
}
// Function to hide the loading animation
export function hideLoadingAnimation() {
    loadingContainer.classList.add("d-none");
}


// Function to update loading text with dots
function updateLoadingText(loadingText, dotCount) {
    loadingText.innerText = `Loading${".".repeat(dotCount)}`;
}

// Attach event listener to each loading animation element
const loadingAnimations = document.querySelectorAll(".loadingContainer .loadingAnimation");
loadingAnimations.forEach((animation) => {
    let dotCount = 0;
    const loadingText = animation.previousElementSibling;
    updateLoadingText(loadingText, dotCount);

    animation.addEventListener("animationiteration", () => {
        dotCount = (dotCount + 1) % 4;
        updateLoadingText(loadingText, dotCount);
    });
});