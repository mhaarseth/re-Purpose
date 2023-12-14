import { NOROFF_AVATAR_ENDPOINT } from "../constants/endpoints.js";

export function editAvatar() {
    const avatarForm = document.getElementById("upload-avatar-form");
    
    avatarForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const avatarUrl = document.getElementById("avatar-url").value;

    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(NOROFF_AVATAR_ENDPOINT, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: avatarUrl
        }),
        
    });

      if (response.ok) {

        await response.json();
        window.location.href = "/profile/";
      }
    } catch (error) {

      console.log(error);
    }
  }
  );
}