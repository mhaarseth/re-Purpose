import { NOROFF_LISTINGS_ENDPOINT } from "./constants/endpoints.js";
//import { getDateAndTime } from "./components/getDateAndTime.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const url = NOROFF_LISTINGS_ENDPOINT + "/" + id;

async function viewSingleListing(url) {

    try {

      const bidsUrl = new URL(url);
      bidsUrl.searchParams.append('_bids', 'true');

      const response = await fetch(bidsUrl);
      const json = await response.json();
      console.log(json);

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
      <div class="mb-5" id="listing-tags"></div>
        <p class="fw-bold"><a href="">Register</a> and <a href="">log in</a> to place bids.<p>
    </div>
        `;
    
        for (let i = 0; i < json.bids.length; i++) {
          const listingBidHistory = document.getElementById("listing-bid-history");
          const listingBidHistoryBidder = json.bids[i].bidderName;
          const listingBidHistoryDate = json.bids[i].created;
          const listingBidHistoryDateShort = listingBidHistoryDate.slice(0, 10);
          const listingBidHistoryAmount = json.bids[i].amount;
    
          listingBidHistory.innerHTML += `
          <li class="d-flex justify-content-between align-items-start ps-0">
          <div class="ms-2 me-auto">
          <div class="fw-bold mb-2">${listingBidHistoryBidder}</div>
        </div>
        <span>${listingBidHistoryAmount} credits</span>
      </li>
    

      
          `;
        }

        for (let i = 0; i < json.tags.length; i++) {
          const listingTags = document.getElementById("listing-tags");
          const tags = json.tags[i];
          //console.log(json.tags[i]);
    
          listingTags.innerHTML += `
          <div class="fst-italic">#${tags}</div>
          `;
        }  

    } catch (error) {
      console.log(error);
    }
  }

  viewSingleListing(url);
  //getDateAndTime(json);