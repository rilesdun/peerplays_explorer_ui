function fetchActiveWitnesses() {
  fetch("http://localhost:5000/api/accounts/witnesses")
    .then((response) => response.json())
    .then((data) => {
      const statsDiv = document.getElementById("active-witnesses");

      data.witness_list.forEach((witness) => {
        const witnessDiv = document.createElement("div");
        witnessDiv.classList.add("bg-black/60", "to-white/5", "rounded-lg");

        witnessDiv.innerHTML = `
        <div class="flex flex-col p-2">
            <div class="p-2">
                <p class="text-gray-53 font-md">
                  <a href="/accounts/${witness.account_name}" class="text-blue-500 hover:text-blue-700 underline font-bold">
                    ${witness.account_name}
                  </a>
                </p>
                <p class="text-gray-500 text-md"><a href="${witness.witness_data.url}" target="_blank" class="text-blue-400 hover:underline">${witness.witness_data.url}</a></p>
                <p class="text-gray-53 font-md">Total Missed: ${witness.witness_data.total_missed}</p>
                <p class="text-md">Last Confirmed Block:
                <a href="/blocks?block=${witness.witness_data.last_confirmed_block_num}" class="text-blue-500 hover:text-blue-700 underline font-bold">
                  ${witness.witness_data.last_confirmed_block_num}
                </a>
                  </p>
                  <p class="text-md">Total Votes: ${witness.witness_data.total_votes}</p>

              </div>
          </div>
          <div class="border-t border-white/5 p-4 flex justify-between">
          <button class="details-button bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200 ease-in">
              More Details
          </button>
          </div>
          <div class="witness-details hidden p-4">
    <p class="text-gray-53 font-md">Last Aslot: ${witness.witness_data.last_aslot}</p>

          <p class="text-gray-53 font-md">Next Secret Hash: ${witness.witness_data.next_secret_hash}</p>
          <p class="text-gray-53 font-md">Signing Key: ${witness.witness_data.signing_key}</p>
          <p class="text-gray-53 font-md">Vote ID: ${witness.witness_data.vote_id}</p>
        </div>
      `;

        const detailsButton = witnessDiv.querySelector(".details-button");
        const detailsDiv = witnessDiv.querySelector(".witness-details");

        detailsButton.addEventListener("click", () => {
          detailsDiv.classList.toggle("hidden");

          if (detailsDiv.classList.contains("hidden")) {
            detailsButton.textContent = "More Details";
          } else {
            detailsButton.textContent = "Less Details";
          }
        });

        statsDiv.appendChild(witnessDiv);
      });
    })
    .catch((error) => console.error("Error:", error));
}

fetchActiveWitnesses();
