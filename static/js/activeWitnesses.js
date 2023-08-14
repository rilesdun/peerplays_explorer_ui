fetch("http://localhost:5000/api/accounts/witnesses")
  .then((response) => response.json())
  .then((data) => {
    // Now we have the witnesses data, we can create the HTML elements
    const statsDiv = document.getElementById("active-witnesses");

    data.witness_list.forEach((witness) => {
      // Create a new div for each witness
      const witnessDiv = document.createElement("div");
      witnessDiv.classList.add("bg-black/60", "to-white/5", "rounded-lg");

      witnessDiv.innerHTML = `
            <div class="flex flex-col p-2">
                <div class="p-2">
                    <p class="text-gray-53 font-sm">${witness.account_name}</p>
                    <p class="text-gray-500 text-sm"><a href="${witness.witness_data.url}" target="_blank" class="text-blue-400 hover:underline">${witness.witness_data.url}</a></p>
                    <p class="text-sm">Total Votes: ${witness.witness_data.total_votes}</p>
                </div>
            </div>
            <div class="border-t border-white/5 p-4 flex justify-between">
                <button class="details-button bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded transition duration-300 ease-in-out">
                    More Details
                </button>
            </div>
            <div class="witness-details hidden p-4 bg-black/40 text-white">
                <p class="text-sm">Last Aslot: ${witness.witness_data.last_aslot}</p>
                <p class="text-sm">Last Confirmed Block: ${witness.witness_data.last_confirmed_block_num}</p>
                <p class="text-sm">Next Secret Hash: ${witness.witness_data.next_secret_hash}</p>
                <p class="text-sm">Signing Key: ${witness.witness_data.signing_key}</p>
                <p class="text-sm">Total Missed: ${witness.witness_data.total_missed}</p>
                <p class="text-sm">URL: <a href="${witness.witness_data.url}" class="text-blue-400">${witness.witness_data.url}</a></p>
                <p class="text-sm">Vote ID: ${witness.witness_data.vote_id}</p>
            </div>
        `;

      const detailsButton = witnessDiv.querySelector(".details-button");
      const detailsDiv = witnessDiv.querySelector(".witness-details");
      detailsButton.addEventListener("click", () => {
        detailsDiv.classList.toggle("hidden");

        // Toggle the button text based on whether the details are visible or hidden
        if (detailsDiv.classList.contains("hidden")) {
          detailsButton.textContent = "More Details";
        } else {
          detailsButton.textContent = "Less Details";
        }
      });

      // Append the new div to the stats div
      statsDiv.appendChild(witnessDiv);
    });
  })
  .catch((error) => console.error("Error:", error));
