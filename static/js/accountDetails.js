function fetchAccountDetails() {
  const accountName = window.location.pathname.split("/").pop();

  fetch(`http://localhost:5000/api/accounts/${accountName}`)
    .then((response) => response.json())
    .then((data) => {
      const accountDiv = document.getElementById("account-details");
      const account = data.account_info;

      accountDiv.innerHTML = `
          <div class="bg-black/60 to-white/5 rounded-lg p-2">
            <p class="text-gray-53 font-sm">${account.name}</p>
            <p class="text-md">Account ID: ${account.id}</p>
            <p class="text-md">Memo Key: ${account.options.memo_key}</p>
            <p class="text-md">Active Key: ${account.active.key_auths[0][0]}</p>
            <p class="text-md">Owner Key: ${account.owner.key_auths[0][0]}</p>
          </div>
        `;
    })
    .catch((error) => console.error("Error:", error));
}

fetchAccountDetails();
