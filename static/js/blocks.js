let currentBlockNumber = null;

// get block info button function
function fetchBlockInfo(specificBlockNumber) {
  let blockNumber = specificBlockNumber;
  if (!blockNumber) {
    blockNumber = document.getElementById("block-number-input").value;
  }
  currentBlockNumber = blockNumber; // Update this line
  // Removed the duplicate declaration of blockNumber
  fetch(`http://localhost:5000/api/block/${blockNumber}`)
    .then((response) => response.json())
    .then((data) => {
      const blockInfo = data.block_info;
      const blockInfoContent = document.getElementById("block-info-content");
      blockInfoContent.innerHTML = "";

      for (const key in blockInfo) {
        const row = document.createElement("tr");

        const keyCell = document.createElement("td");
        keyCell.textContent = key;
        keyCell.className = "block-info-item p-4";
        row.appendChild(keyCell);

        const valueCell = document.createElement("td");
        valueCell.textContent = JSON.stringify(blockInfo[key]);
        valueCell.className = "block-info-item p-4";
        row.appendChild(valueCell);

        blockInfoContent.appendChild(row);
      }
    })
    .catch((error) => {
      console.error("Error fetching block info:", error);
    });
}

// get latest block info button function

function fetchLatestBlockInfo() {
  fetch('http://localhost:5000/api/latest_block_num')
    .then((response) => response.json())
    .then((data) => {
      if (data.latest_block_num !== null && data.latest_block_num !== undefined) {
        fetchBlockInfo(data.latest_block_num);
      }
    })
    .catch((error) => {
      console.error('Error fetching latest block number:', error);
    });
}


function fetchNextBlockInfo() {
  if (currentBlockNumber !== null) {
    currentBlockNumber++;
    fetchBlockInfo(currentBlockNumber);
  }
}

function fetchPreviousBlockInfo() {
  if (currentBlockNumber !== null && currentBlockNumber > 0) {
    currentBlockNumber--;
    fetchBlockInfo(currentBlockNumber);
  }
}
