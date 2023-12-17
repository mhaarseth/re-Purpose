import { NOROFF_REGISTER_ENDPOINT } from "./constants/endpoints.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());

  try {
    const response = await registerNewUser(userData);
  } catch (error) {
    const errorMessageField = document.getElementById("error-message-field");
      errorMessageField.innerHTML = `
      ${error}
      `
  }
});

async function registerNewUser(userData) {
  const registerUrl = `${NOROFF_REGISTER_ENDPOINT}`;
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  const response = await fetch(registerUrl, postOptions);
  const json = await response.json();

  if (response.ok === true) {
    return json;
  }

  throw new Error(json.errors[0].message);
}
