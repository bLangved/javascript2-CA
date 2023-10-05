/**
 * Loads in the Footer HTML-content located inside websiteFooter.html
 */
function loadFooter() {
    fetch("/htmlComponents/websiteFooter.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector("#websiteFooter").innerHTML = data;
    });
};
loadFooter();