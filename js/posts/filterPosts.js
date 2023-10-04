/**
 * Used to sort elements in an array in a specific order (ex. ascending / descending).
 * 
 * @param {any} data JSON containing all posts thats rendered on the page
 * @param {string} filterType HTML data-filter for categorizing array-order
 * ```js
 * filterPosts(data, filterType)
 * ```
 */

// Data is an array of posts. The content of the arrays gets sorted in reverse as default, so newest entries gets displayed first. 
export function filterPosts(data, filterType) {
    if (filterType === "newest") {
        return data.sort((a, b) => new Date(a.created) - new Date(b.created)); // Sort by date descending
    } 
    else if (filterType === "oldest") {
        return data.sort((a, b) => new Date(b.created) - new Date(a.created)); // Sort by date ascending
    }
    else {
        // Default: sort by newest
        return data.sort((a, b) => new Date(a.created) - new Date(b.created)); 
    }
}
