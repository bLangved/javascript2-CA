/**
 * Loads in the first/left container HTML-content located inside firstContainer.html
 */
function loadFirstContainer() {
    fetch("/htmlComponents/firstContainer.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector("#firstContainer").innerHTML = data;
    });
};
loadFirstContainer();

