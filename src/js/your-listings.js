import { NOROFF_YOUR_LISTINGS_ENDPOINT } from "./constants/endpoints.js";

export async function yourListings() {
  try {
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const url = new URL(NOROFF_YOUR_LISTINGS_ENDPOINT);
    url.searchParams.append("_listings", "true");

    const response = await fetch(url, options);
    const json = await response.json();
    const reversedListings = json.listings.reverse();
 

    for (let i = 0; i < json.listings.length; i++) {
      const yourListingsFeed = document.getElementById("your-listings-feed");
      const listingsTitle = reversedListings[i].title;
      const listingsImage = reversedListings[i].media[0];
      const listingsId = reversedListings[i].id;

      yourListingsFeed.innerHTML += `
            <div class="col">
                      <div class="card shadow-sm">
                        <img src="${listingsImage}" class="img-fluid listings-custom-img" alt="Product image">
                        <div class="card-body">
                          <a href="../single-listing/?id=${listingsId}" class="card-text fw-bold fs-5">${listingsTitle}</a>
                        </div>
                      </div>
            `;
    }
  } catch (error) {
    console.log(error);
  }
}

yourListings();
