import { NOROFF_PLACE_BID_ENDPOINT } from "../constants/endpoints.js";

export function placeBid() {
    const placeBidButton = document.getElementById("place-bid-button");
   
    placeBidButton.addEventListener("click", async function placeBid () {
        try {
            const bidValue = document.getElementById("bid-value").value;
            const bidNumber = Number(bidValue);
            const token = localStorage.getItem("token");

            const response = await fetch(NOROFF_PLACE_BID_ENDPOINT, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    amount: bidNumber
                  }),
                
            });

            if (response.ok === true) {
                console.log(json);
                return json;
            }
            } catch (error) {
            console.log(error);
            }

    

    })
}