export function searchListings() {
  const searchForm = document.getElementById("search-form");

  searchForm.addEventListener("keyup", async function search(event) {
    try {
      const listings = await viewAllListings();
      console.log(listings);
    } catch (error) {
      console.error("Error:", error);
    }

    event.preventDefault();
    const searchInput = document.getElementById("search-value");
    const searchTerm = searchInput.value.toLowerCase();
    console.log(searchTerm);
  });
}

/*
try {
    const response = await fetch(NOROFF_LISTINGS_ENDPOINT);
    const json = await response.json();

    for (let i = 0; i < json.length; i++) {
      const listingsFeed = document.getElementById("listings-feed");
      const listingTitle = json[i].title;
      const listingImage = json[i].media[0];
      const listingId = json[i].id;

      listingsFeed.innerHTML += `
      
      `;
    }
  } catch (error) {
    console.log(error);
  }*/
