// static/js/activeAccounts.js
fetch("http://localhost:5000/api/rich_list")
  .then((response) => response.json())
  .then((data) => {
    const statsDiv = document.getElementById("active-accounts");

    data.forEach((account) => {
      const accountDiv = document.createElement("div");
      accountDiv.classList.add("bg-black/60", "to-white/5", "rounded-lg");

      accountDiv.innerHTML = `
            <div class="flex flex-col p-2">
                <div class="p-2">
                    <p class="text-gray-53 font-sm">${account.name}</p>
                    <p class="text-sm">Account ID: ${account.account_id}</p>
                    <p class="text-sm">Balance: ${account.balance} ${account.symbol}</p>
                </div>
                <div class="p-2">
                    <button onclick="window.location.href='/account/${account.name}'" class="btn btn-primary">View Details</button>
                </div>
            </div>
            <div class="border-t border-white/5 p-4 flex justify-between">
        </div>
        `;

      statsDiv.appendChild(accountDiv);
    });
  })
  .catch((error) => console.error("Error:", error));