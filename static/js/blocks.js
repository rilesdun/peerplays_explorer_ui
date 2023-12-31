let currentBlockNumber = null;

// get block info button function
function fetchBlockInfo(specificBlockNumber) {
  let blockNumber = specificBlockNumber;
  if (!blockNumber) {
    blockNumber = document.getElementById("block-number-input").value;
  }
  currentBlockNumber = blockNumber;
  return fetch(`${config.BASE_URL}/api/block/${blockNumber}`)
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
      throw error; // Re-throw the error to allow it to be caught by calling code
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const blockNumberInput = document.getElementById("block-number-input");
  const submitButton = document.querySelector(
    "button[onclick='fetchBlockInfo()']",
  );

  blockNumberInput.addEventListener("input", function () {
    if (blockNumberInput.value === "") {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  });

  // Initially disable the button
  submitButton.disabled = true;

  // Check if a specific block number is provided in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const blockNumber = urlParams.get("block");

  if (blockNumber) {
    fetchBlockInfo(blockNumber);
  } else {
    fetchLatestBlockInfo();
  }
});
// get latest block info button function

function fetchLatestBlockInfo() {
  fetch(`${config.BASE_URL}/api/latest_block_num`)
    .then((response) => response.json())
    .then((data) => {
      if (
        data.latest_block_num !== null &&
        data.latest_block_num !== undefined
      ) {
        fetchBlockInfo(data.latest_block_num);
      }
    })
    .catch((error) => {
      console.error("Error fetching latest block number:", error);
    });
}

function fetchNextBlockInfo() {
  if (currentBlockNumber !== null) {
    currentBlockNumber++;
    fetchBlockInfo(currentBlockNumber).catch((error) => {
      currentBlockNumber--;
      showPopup(
        "Error fetching next block - You are likely on the latest block already",
      );
      console.error(error);
    });
  }
}

function fetchPreviousBlockInfo() {
  if (currentBlockNumber !== null && currentBlockNumber > 0) {
    currentBlockNumber--;
    fetchBlockInfo(currentBlockNumber);
  }
}

function showPopup(message, timeout = 2750) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  popupMessage.textContent = message;
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
  }, timeout);
}
