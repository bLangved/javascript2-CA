export function deleteSelectedPost(postId){
    const API_BASE_URL = "https://api.noroff.dev/api/v1";
    const deleteSelectedPostEndpoint = `/social/posts/${postId}`;
    const deletePostUrl = `${API_BASE_URL}${deleteSelectedPostEndpoint}`;
    console.log(postId);
    try {
        const AuthorizationToken = localStorage.getItem("accessToken");
        fetch(deletePostUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AuthorizationToken}`
            },
          }).then((response) => {
            console.log(response);
            if (response.ok) {
                window.location.reload(); // reload the page
            } else {
                throw new Error(`Failed to delete post: ${response.statusText}`);
            }
          });
    } catch (error) {
        console.log(error)
    }
};