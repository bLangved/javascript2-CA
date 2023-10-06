export function imageNavBar(profileImg, updateProfileUrl, authToken) {
    // Check if the container already exists
    let container = document.querySelector(".profile-image_navbar-container");

    // If the container doesn't exist, create it
    if (!container) {
        container = document.createElement("div");
        container.classList.add("dropdown-menu", "profile-image_navbar-container", "d-none");

        const watchItem = document.createElement("a");
        watchItem.classList.add("dropdown-item");
        watchItem.href = "#";
        watchItem.innerText = "Watch profile Image";
        container.append(watchItem);

        const changeItem = document.createElement("a");
        changeItem.classList.add("dropdown-item");
        changeItem.href = "#";
        changeItem.innerText = "Change profile Image";
        container.append(changeItem);

        changeItem.addEventListener("click", async () => {
            const imageUrl = prompt("Please enter the image URL:");
            if (imageUrl) {
                if (isValidUrl(imageUrl)) {
                    profileImg.src = imageUrl;
                    await setProfileAvatar(updateProfileUrl, authToken, imageUrl);
                } else {
                    alert("Please enter a valid URL.");
                }
            }
        });

        const deleteItem = document.createElement("a");
        deleteItem.classList.add("dropdown-item");
        deleteItem.href = "#";
        deleteItem.innerText = "Delete profile image";
        container.append(deleteItem);

        document.body.append(container);
    }

    profileImg.addEventListener("click", () => {
        container.classList.toggle("d-none");
    });

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
}



async function setProfileAvatar(updateProfileUrl, authToken, imageUrl) {
    try {
        const data = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ avatar: imageUrl })
        };

        const response = await fetch(updateProfileUrl, data);
        if (!response.ok) {
            throw new Error("Failed to update profile avatar.");
        }
        await response.json();
    } catch (error) {
        console.log(error);
    }
}
