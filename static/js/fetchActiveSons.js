function fetchActiveSons() {
  fetch("http://localhost:5000/api/accounts/active_sons") // replace with your API endpoint
    .then((response) => response.json())
    .then((data) => {
      const statsDiv = document.getElementById("active-sons"); // replace with your div ID

      data.active_sons.forEach((son) => {
        const sonDiv = document.createElement("div");
        sonDiv.classList.add("bg-black/60", "to-white/5", "rounded-lg");

        sonDiv.innerHTML = `
        <div class="flex flex-col p-2">
            <div class="p-2">
                <p class="text-gray-53 font-md">
                  <a href="/accounts/${son.son_account}" class="text-blue-500 hover:text-blue-700 underline font-bold">
                    ${son.son_account}
                  </a>
                </p>
                <p class="text-gray-500 text-md"><a href="${son.url}" target="_blank" class="text-blue-400 hover:underline">${son.url}</a></p>
                <p class="text-gray-53 font-md">ID: ${son.id}</p>
                <p class="text-gray-53 font-md">Total Votes: ${son.total_votes}</p>
                <p class="text-gray-53 font-md">Signing Key: ${son.signing_key}</p>
          
            </div>
        </div>
        <div class="border-t border-white/5 p-4 flex justify-between">
          <button class="details-button bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200 ease-in">
              More Details
          </button>
        </div>
        <div class="son-details hidden p-4">
          <p class="text-gray-53 font-md">Deposit: ${son.deposit}</p>
          <p class="text-gray-53 font-md">Vote ID: ${son.vote_id}</p>
          <p class="text-gray-53 font-md">Status: ${son.status}</p>
        </div>
        `;

        const detailsButton = sonDiv.querySelector(".details-button");
        const detailsDiv = sonDiv.querySelector(".son-details");

        detailsButton.addEventListener("click", () => {
          detailsDiv.classList.toggle("hidden");

          if (detailsDiv.classList.contains("hidden")) {
            detailsButton.textContent = "More Details";
          } else {
            detailsButton.textContent = "Less Details";
          }
        });

        statsDiv.appendChild(sonDiv);
      });
    })
    .catch((error) => console.error("Error:", error));
}

fetchActiveSons();
