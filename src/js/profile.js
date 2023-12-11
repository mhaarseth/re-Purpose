import { logOut } from "./components/logOut.js";
import { NOROFF_PROFILES_ENDPOINT } from "./constants/endpoints.js";

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
        const profileCredits = json.credits;
        const profileAvatar = json.avatar;

        if (profileAvatar === null) {
            profileContent.innerHTML = `
                                    <div class="text-center">
                                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" width="200px" class="img-thumbnail" alt="Profile avatar">
                                    <p><a href="#">(edit avatar)</a></p>
                                    </div>
                                
                                    <div class="text-center mt-3">
                                    
                                    <h5 class="mt-4 mb-2">${profileName}</h5>
                                    <div class="mb-5">${profileCredits} credits</div>
                                    </div>
            `;
            } else {profileContent.innerHTML = `
            <div class="text-center">
            <img src="${profileAvatar}" class="img-thumbnail" alt="Profile avatar">
            <p><a href="#">(edit avatar)</a></p>
            </div>
        
            <div class="text-center mt-3">
            
            <h5 class="mt-4 mb-2">${profileName}</h5>
            <div class="mb-5">${profileCredits} credits</div>
            </div>
        `;
        }
    } catch (error) {
      console.log(error);
    }
  }
getProfile();
logOut();
