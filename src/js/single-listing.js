import { NOROFF_LISTINGS_ENDPOINT } from "./constants/endpoints.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const url = NOROFF_LISTINGS_ENDPOINT + "/" + id;

async function viewSingleListing(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
  
        const singleListingDescriptionAndBid = document.getElementById("single-listing-description-and-bid");
        const singleListingTitle = document.getElementById("single-listing-title");
        const listingDescription = json.description;
        const listingTitle = json.title;

        singleListingTitle.innerHTML += `
            ${listingTitle}
            `;

        for (let i = 0; i < json.media.length; i++) {
            const listingImages = document.getElementById("listing-images");
            const listingImage = json.media[i];
      
            listingImages.innerHTML += `
            <div class="carousel-item active">
          <img src="${listingImage}" class="d-block w-100 carousel-custom-img" alt="product image">
        </div>
        
            `;
          }  
  
        singleListingDescriptionAndBid.innerHTML += `
        <h3 class="mb-3">Description</h3>
      <p>${listingDescription}</p>
      <div class="row mt-5">
        <div class="col-6">
          <input type="number" min="0" max="1000" step="10" class="form-control" id="numberInput">
        </div>
        <div class="col-6">
          <button type="button" class="btn btn-success">Place bid</button>
        </div>
      </div>
        `;
    } catch (error) {
      console.log(error);
    }
  }

  viewSingleListing(url);