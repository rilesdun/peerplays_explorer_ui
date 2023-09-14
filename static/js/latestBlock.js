function fetchLatestBlockNum() {
  fetch("http://localhost:5000/api/latest_block_num")
    .then((response) => response.json())
    .then((data) => {
      if (data.latest_block_num !== null && data.latest_block_num !== undefined) {
        document.getElementById("currentBlock").innerText = +data.latest_block_num;
      }
    })
    .catch((error) => {
      console.error("Error fetching latest block number:", error);
    });
}

fetchLatestBlockNum();