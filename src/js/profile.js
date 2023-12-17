import { logOut } from "./components/logOut.js";
import { NOROFF_PROFILES_ENDPOINT } from "./constants/endpoints.js";
import { editAvatar } from "./components/editAvatar.js";

const profileName = localStorage.getItem("profileName");
const singleProfile = NOROFF_PROFILES_ENDPOINT + "/" + profileName;
const profileContent = document.getElementById("profile-content");

async function getProfile() {
  try {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(singleProfile, options);
    const json = await response.json();
    console.log(json);
    const profileCredits = json.credits;
    const profileAvatar = json.avatar;

    if (profileAvatar === null) {
      profileContent.innerHTML = `
                                    <div class="text-center">
                                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" width="200px" class="img-thumbnail" alt="Profile avatar">
                                    <p><button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal" id="edit-avatar-button">
  (edit avatar)
</button></p>

            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Upload new avatar</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="input-group mb-3">
      <form id="upload-avatar-form">
  <input type="text" class="form-control" placeholder="Path to new avatar" aria-label="Path to new avatar" aria-describedby="upload-button" id="avatar-url">
  <button class="btn btn-outline-secondary" type="submit" id="upload-button">Upload</button>
  </form>
</div>

      </div>
    </div>
  </div>
</div>
                                
                                    <div class="text-center mt-3">
                                    
                                    <h5 class="mt-4 mb-2">${profileName}</h5>
                                    <div class="mb-5">${profileCredits} credits</div>
                                    </div>
            `;
    } else {
      profileContent.innerHTML = `
            <div class="text-center">
            <img src="${profileAvatar}" width="200px" class="img-thumbnail" alt="Profile avatar">
            <p><button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal" id="edit-avatar-button">
(edit avatar)
</button></p>

</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h1 class="modal-title fs-5" id="exampleModalLabel">Upload new avatar</h1>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<div class="input-group mb-3">
<form id="upload-avatar-form">
<input type="text" class="form-control" placeholder="Path to new avatar" aria-label="Path to new avatar" aria-describedby="upload-button" id="avatar-url">
<button class="btn btn-outline-secondary" type="submit" id="upload-button">Upload</button>
</form>
</div>

</div>
</div>
</div>
</div>
        
            <div class="text-center mt-3">
            
            <h5 class="mt-4 mb-2">${profileName}</h5>
            <div class="mb-5">${profileCredits} credits</div>
            </div>
`;
    }
    const editAvatarButton = document.getElementById("edit-avatar-button");

    editAvatarButton.addEventListener("click", async function (event) {
      console.log("Avatarbutton clicked");
      editAvatar();
    });
  } catch (error) {
    console.log(error);
  }
}
getProfile();
logOut();
