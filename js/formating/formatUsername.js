export function formateUsername(username) {
    if (/^[a-zA-Z0-9]+$/.test(username)) {
        return username;
    }
    else {
    const nameWithSpace = username.replace(/[_\.]/g, " ");
    const capitalizedName = nameWithSpace.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return capitalizedName;
}};

