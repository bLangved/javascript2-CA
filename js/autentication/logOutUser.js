export function initializeLogOut() {
    const logOutButton = document.querySelector(".log-out-user");
    logOutButton.addEventListener("click", () => {
        window.location.href = "/index.html";
        clearStorage();
    });
}
function clearStorage() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    sessionStorage.removeItem("filteredPosts");
    sessionStorage.removeItem("allPosts");
    // sessionStorage.removeItem("newAllPosts")
}