import { NOROFF_AVATAR_ENDPOINT } from "../constants/endpoints.js";

export function editAvatar() {
    const avatarForm = document.getElementById("upload-avatar-form");
    
    avatarForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const avatarUrl = document.getElementById("avatar-url").value;

    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(NOROFF_AVATAR_ENDPOINT, {
        method: "put",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: avatarUrl
        }),
        
    });

      const json = await response.json();

      if (response.ok) {
        window.location.href = "/profile/";
      } else {
        throw new Error(json.errors[0].message);
      }
    } catch (error) {
      const errorMessageField = document.getElementById("error-message-field");
      errorMessageField.innerHTML = `
      ${error}
      `
    }
  }
  );
}