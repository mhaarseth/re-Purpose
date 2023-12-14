export const NOROFF_BASE_API = "https://api.noroff.dev/api/v1/auction";
export const NOROFF_LISTINGS_ENDPOINT = NOROFF_BASE_API + "/listings";
export const NOROFF_REGISTER_ENDPOINT = NOROFF_BASE_API + "/auth/register";
export const NOROFF_LOGIN_ENDPOINT = NOROFF_BASE_API + "/auth/login";
export const NOROFF_PROFILES_ENDPOINT = NOROFF_BASE_API + "/profiles";

const profileName = localStorage.getItem("profileName");
export const NOROFF_AVATAR_ENDPOINT = NOROFF_BASE_API + "/profiles/" + `${profileName}` + "/media";
export const NOROFF_YOUR_LISTINGS_ENDPOINT = NOROFF_BASE_API + "/profiles/" + `${profileName}`;
export const NOROFF_YOUR_BIDS_ENDPOINT = NOROFF_BASE_API + "/profiles/" + `${profileName}` + "/bids";