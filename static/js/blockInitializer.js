document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const blockNumber = urlParams.get("block");
  if (blockNumber) {
    fetchBlockInfo(blockNumber);
  } else {
    fetchLatestBlockInfo();
  }
});
