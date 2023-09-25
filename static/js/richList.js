function updateRichList() {
  fetch(`${config.BASE_URL}/api/accounts`)
    .then((response) => response.json())
    .then((data) => {
      const richListDiv = document.querySelector("#rich-list");
      data.forEach((account) => {
        const accountDiv = document.createElement("div");
        accountDiv.className = "bg-black/60 p-6 rounded-lg";
        accountDiv.innerHTML = `
            <div class="flex flex-col p-2">
              <div class="p-2">
                <p class="text-gray-500 font-sm">${account.name}</p>
                <p class="text-sm">Balance: ${account.balance} ${account.symbol}</p>
              </div>
            </div>
          `;
        richListDiv.appendChild(accountDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching rich list:", error);
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
  updateRichList();
});
