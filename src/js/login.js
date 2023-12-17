import { NOROFF_LOGIN_ENDPOINT } from "./constants/endpoints.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const loginCredentials = Object.fromEntries(formData.entries());

  try {
    const response = await loginUser(loginCredentials);
    window.location.href = "/all-listings/";
  } catch (error) {
    const errorMessageField = document.getElementById("error-message-field");
      errorMessageField.innerHTML = `
      ${error}
      `
  }
});

async function loginUser(loginCredentials) {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginCredentials),
  };

  const response = await fetch(NOROFF_LOGIN_ENDPOINT, postOptions);
  const json = await response.json();
  const token = json.accessToken;
  localStorage.setItem("token", token);
  const profileName = json.name;
  localStorage.setItem("profileName", profileName);

  if (response.ok === true) {
    return json;
  }
  throw new Error(json.errors[0].message);
}
