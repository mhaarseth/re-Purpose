import { NOROFF_REGISTER_ENDPOINT } from "./constants/endpoints.js";

const form = document.getElementById("registerForm");
//console.log(NOROFF_REGISTER_ENDPOINT);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());
  //const message = document.getElementById("message");

  try {
    const response = await registerNewUser(userData);

    /*message.innerHTML = `<a href="../index.html" class="d-flex justify-content-center mt-5">Registration success, click to log in.</a>`;
    message.setAttribute(
      "class",
      "text-success d-flex justify-content-center mt-5"
    );*/
  } catch (error) {
    /*message.innerHTML = error.message;
    message.setAttribute(
      "class",
      "text-danger d-flex justify-content-center mt-5"
    );*/
    console.log(error);
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