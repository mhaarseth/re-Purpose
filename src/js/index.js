import { NOROFF_LISTINGS_ENDPOINT } from "./constants/endpoints.js";
import { searchListings } from "./components/search.js";

async function viewAllListings() {
    try {
      const response = await fetch(NOROFF_LISTINGS_ENDPOINT + "?sort=created&sortOrder=desc");
      const json = await response.json();
      
      
      //console.log(json)
  
      for (let i = 0; i < json.length; i++) {
        const listingsFeed = document.getElementById("listings-feed");
        const listingTitle = json[i].title;
        const listingImage = json[i].media[0];
        const listingId = json[i].id;
  
        listingsFeed.innerHTML += `
        <div class="col">
                  <div class="card shadow-sm">
                    <img src="${listingImage}" class="img-fluid listings-custom-img" alt="Product image">
                    <div class="card-body">
                      <a href="../single-listing-unauth/?id=${listingId}" class="card-text">${listingTitle}</a>
                    </div>
                  </div>
        `;
      }


      const searchForm =  document.getElementById("search-form")
      searchForm.addEventListener("keyup", function search(event) {
          const listingsFeed = document.getElementById("listings-feed");
          listingsFeed.innerHTML = "";
          event.preventDefault();
          const searchInput = document.getElementById("search-value");
          const searchTerm = searchInput.value.toLowerCase();
          const searchResults = json.filter(json => json.title.toLowerCase().includes(searchTerm)).map(json => json);

          for (let i = 0; i < searchResults.length; i++) {
          const listingsFeed = document.getElementById("listings-feed");
          const resultTitle = searchResults[i].title;
          const resultImage = searchResults[i].media[0];
          const resultId = searchResults[i].id;


          listingsFeed.innerHTML += `
          <div class="col">
                    <div class="card shadow-sm">
                      <img src="${resultImage}" class="img-fluid listings-custom-img" alt="Product image">
                      <div class="card-body">
                        <a href="../single-listing-unauth/?id=${resultId}" class="card-text">${resultTitle}</a>
                      </div>
                    </div>
          `;
          }

  })

    } catch (error) {
      console.log(error);
    }
    
  }
  

viewAllListings();
//searchListings();