/**
 * Loads in the third/right container HTML-content located inside thirdContainer.html
 */
function loadThirdContainer() {
    fetch("/htmlComponents/thirdContainer.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector("#thirdContainer").innerHTML = data;
    });
};
loadThirdContainer();

