import { NOROFF_LISTINGS_ENDPOINT } from "./constants/endpoints.js";
import { addImageField } from "./components/addField.js";

export function addListing() {
  const listingForm = document.getElementById("add-listing-form");

  listingForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const auctionEnd = document.getElementById("auction-end");
    const endsAt = new Date(auctionEnd.value);

    const listingImages = document.getElementsByClassName("listing-image");
    let media = [];
    for (let i = 0; i < listingImages.length; i++) {
      const imageURL = listingImages[i].value;
      media.push(imageURL);
    }

    const tags = [];
    const listingTags = document.querySelector("input.listing-tag:checked");
    const listingTag = listingTags.value;
    tags.push(listingTag);

    try {
      const token = localStorage.getItem("token");

      const title = document.getElementById("listingTitle").value;
      const description = document.getElementById("listingDescription").value;

      const response = await fetch(NOROFF_LISTINGS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          tags: tags,
          endsAt: endsAt,
          media: media,
        }),
      });

      if (response.ok === true) {
            window.location.href = "../your-listings/";
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

addListing();
addImageField();
