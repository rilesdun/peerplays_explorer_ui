function fetchBlockInfo() {
  const blockNumber = document.getElementById("block-number-input").value;
  fetch(`http://localhost:5000/api/block/${blockNumber}`)
    .then((response) => response.json())
    .then((data) => {
      const blockInfo = data.block_info; // Adjust according to the response structure
      const blockInfoDiv = document.getElementById("block-info-display");
      blockInfoDiv.innerHTML = "";
      for (const key in blockInfo) {
        const infoItem = document.createElement("div");
        infoItem.textContent = `${key}: ${JSON.stringify(blockInfo[key])}`;
        blockInfoDiv.appendChild(infoItem);
      }
    })
    .catch((error) => {
      console.error("Error fetching block info:", error);
    });
}