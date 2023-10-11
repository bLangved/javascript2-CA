export function initializeLogOut() {
    const logOutButton = document.querySelector(".log-out-user");
    logOutButton.addEventListener("click", () => {
        window.location.href = "/index.html";
        clearSession();
    });
}

function clearSession() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
}