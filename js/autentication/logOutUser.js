const logOutButton = document.querySelector("#logOutUser");
logOutButton.addEventListener("click", () => {
    clearSession();
})
function clearSession() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
}
