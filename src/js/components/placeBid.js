import { NOROFF_PLACE_BID_ENDPOINT } from "../constants/endpoints.js";

export function placeBid() {
  const placeBidButton = document.getElementById("place-bid-button");

  placeBidButton.addEventListener("click", async function placeBid() {
    try {
      const bidValue = document.getElementById("bid-value").value;
      const bidNumber = Number(bidValue);
      const token = localStorage.getItem("token");

      const response = await fetch(NOROFF_PLACE_BID_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: bidNumber,
        }),
      });

      if (response.ok === true) {
        window.location.reload();
        //return json;
      } else {
        const error = await response.json();
        throw new Error(error.errors[0].message);
      }

    } catch (error) {
      const errorMessageField = document.getElementById("error-message-field");
      errorMessageField.innerHTML = `
      ${error}
      `
    }
  });
}
