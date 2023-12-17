import { NOROFF_YOUR_BIDS_ENDPOINT } from "./constants/endpoints.js";

export async function yourBids() {
  try {
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const url = new URL(NOROFF_YOUR_BIDS_ENDPOINT);
    url.searchParams.append("_listings", "true");

    const response = await fetch(url, options);
    const json = await response.json();

    for (let i = 0; i < json.length; i++) {
      const yourBidsFeed = document.getElementById("your-bids-feed");
      const bidTitle = json[i].listing.title;
      const bidImage = json[i].listing.media[0];
      const bidId = json[i].listing.id;

      yourBidsFeed.innerHTML += `
            <div class="col">
                      <div class="card shadow-sm">
                        <img src="${bidImage}" class="img-fluid listings-custom-img" alt="Product image">
                        <div class="card-body">
                          <a href="../single-listing/?id=${bidId}" class="card-text">${bidTitle}</a>
                        </div>
                      </div>
            `;
    }
  } catch (error) {
    console.log(error);
  }
}

yourBids();
