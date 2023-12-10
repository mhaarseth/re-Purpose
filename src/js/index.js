import { NOROFF_LISTINGS_ENDPOINT } from "./constants/endpoints.js";

async function viewAllListings() {
    try {
      const response = await fetch(NOROFF_LISTINGS_ENDPOINT);
      //console.log(response);
      const json = await response.json();
      console.log(json[0].media[0]);
  
      for (let i = 0; i < json.length; i++) {
        const listingsFeed = document.getElementById("listings-feed");
        const listingTitle = json[i].title;
        const listingImage = json[i].media[0];
        const listingId = json[i].id;
        // const id = json[i].id;
  
        listingsFeed.innerHTML += `
        <div class="col">
                  <div class="card shadow-sm">
                    <img src="${listingImage}" class="img-fluid listings-custom-img" alt="Product image">
                    <div class="card-body">
                      <a href="../single-listing/?id=${listingId}" class="card-text">${listingTitle}</a>
                    </div>
                  </div>
        `;
      }
    } catch (error) {
      console.log(error);
    }
  }
  

viewAllListings();
