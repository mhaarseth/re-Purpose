import { NOROFF_LISTINGS_ENDPOINT } from "./constants/endpoints.js";

export function addListing() {
    const listingForm = document.getElementById("add-listing-form");

        listingForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const auctionEnd = document.getElementById("auction-end");
            //const form = event.target;
            //const formData = new FormData(form);

            const endsAt = new Date(auctionEnd.value);
            //formData.append("endsAt", endsAt);


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

            /*
            let tags = [];
            for (let i = 0; i < listingTags.length; i++) {
                const listingTag = listingTags[i].value
                tags.push(listingTag);
            }
            console.log(tags)*/

            //console.log(media);
            //formData.append("media", JSON.stringify(media));
            //console.log(media);
            //console.log(JSON.stringify(media));
            //console.log(formData);

            //const listingDetails = Object.fromEntries(formData.entries());
            //console.log(listingDetails);

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
                        media: media
                      }),
                    
                });

                if (response.ok === true) {
                    console.log(json);
                    return json;
                }
                } catch (error) {
                console.log(error);
                }
    }
    );
}

addListing();