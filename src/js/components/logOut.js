export function logOut() {
    const logOutButton = document.getElementById("log-out-button");

    logOutButton.addEventListener("click", function() {
        localStorage.removeItem("token");
        localStorage.removeItem("profileName");
        window.location.href = "/login/";
       });
}


   