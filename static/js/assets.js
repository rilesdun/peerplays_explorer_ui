function fetchAndDisplayAssets() {
  // need to rewrite this to loop through all asset objects 1.3.x
  const endpoints = [
    `${config.BASE_URL}/api/supply/ppy`,
    `${config.BASE_URL}/api/supply/btfun`,
    `${config.BASE_URL}/api/supply/bitcoin`,
    `${config.BASE_URL}/api/supply/hive`,
    `${config.BASE_URL}/api/supply/hbd`,
  ];

  const assetsDiv = document.getElementById("assets");

  endpoints.forEach((endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const assetDiv = document.createElement("div");
        assetDiv.classList.add("bg-black/60", "to-white/5", "rounded-lg");

        assetDiv.innerHTML = `
            <div class="flex flex-col p-2">
              <div class="p-2">
                <p class="text-gray-53 font-md">${data.symbol}</p>
                <p class="text-md">Circulating: ${data.circulating}</p>
                <p class="text-md">Maximum: ${data.maximum}</p>
                <p class="text-md">Total: ${data.total}</p>
              </div>
            </div>
            <div class="border-t border-white/5 p-4 flex justify-between">
            </div>
          `;

        assetsDiv.appendChild(assetDiv);
      });
  });
}

// Call the function
fetchAndDisplayAssets();
