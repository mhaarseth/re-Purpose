import { NOROFF_LISTINGS_ENDPOINT } from "./constants/endpoints.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const url = NOROFF_LISTINGS_ENDPOINT + "/" + id;

async function viewSingleListing(url) {
  try {
    const bidsUrl = new URL(url);
    bidsUrl.searchParams.append("_bids", "true");

    const response = await fetch(bidsUrl);
    const json = await response.json();
    
    for (let i = 0; i < json.media.length; i++) {
      const listingImages = document.getElementById("listing-images");
      const listingImage = json.media[i];
      
      listingImages.innerHTML += `
            <div class="carousel-item active">
          <img src="${listingImage}" class="d-block w-100 carousel-custom-img" alt="product image">
        </div>
        
            `;    
    }

    const singleListingDescriptionAndBid = document.getElementById("single-listing-description-and-bid",);
    const singleListingTitle = document.getElementById("single-listing-title");
    const listingDescription = json.description;
    const listingTitle = json.title;

    singleListingTitle.innerHTML += `
            ${listingTitle}
            `;

    singleListingDescriptionAndBid.innerHTML += `
      <h3 class="mb-3">Description</h3>
      <p>${listingDescription}</p>
      <div class="row mt-5">
      <div class="mb-4" id="listing-tags"></div>
      <div class="mb-4" id="timer-field"></div>
      <div class ="mb-4 fw-bold" id="highest-bid"></div>
      <p class="fw-bold"><a href="">Register</a> and <a href="">log in</a> to place bids.<p></div>
        `;

        function countdown(targetDate) {
          let now = new Date().getTime();
          let difference = targetDate.getTime() - now;
          let days = Math.floor(difference / (1000 * 60 * 60 * 24));
          let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
          const timer = (days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
          const timerField = document.getElementById("timer-field")

          if (difference <= 0) {
            timerField.innerHTML += `
            <span class="fw-bold text-danger">Auction ended</span>
          `;
          } else {
            timerField.innerHTML += `
            Auction ends: ${timer}
          `;
          //setInterval(countdown, 1000);
          }
        }
        
        let targetDate = new Date(json.endsAt);
        countdown(targetDate);

        for (let i = 0; i < json.tags.length; i++) {
          const listingTags = document.getElementById("listing-tags");
          const tags = json.tags[i];
    
          listingTags.innerHTML += `
              <div class="fst-italic">#${tags}</div>
              `;
        }

        function findObjectWithHighestAmount(data) {
          const maxAmount = Math.max(...data.map((item) => item.amount));
          return data.find((item) => item.amount === maxAmount);
        }
  
        const highestBidField = document.getElementById("highest-bid")
        const highestBid = findObjectWithHighestAmount(json.bids)
        
        if (highestBid === undefined) {
          highestBidField.innerHTML += `
          No bids yet!
          `;
        } else {
          const highestBidAmount = highestBid.amount;
          highestBidField.innerHTML += `
          Highest bid: ${highestBidAmount} credits
          `;
        }

    for (let i = 0; i < json.bids.length; i++) {
      const listingBidHistory = document.getElementById("listing-bid-history");
      const listingBidHistoryBidder = json.bids[i].bidderName;
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

  } catch (error) {
    console.log(error);
    const errorMessageField = document.getElementById("error-message-field")

  }
}

viewSingleListing(url);