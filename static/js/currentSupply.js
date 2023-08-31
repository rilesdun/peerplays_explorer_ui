function updateCurrentSupply() {
  fetch("http://localhost:5000/api/circulating_supply/ppy")
    .then((response) => response.text())
    .then((supply) => {
      const formattedSupply = `${parseFloat(supply).toFixed(2)}`; // Parse the text as a float
      document.querySelector(".current-supply span").textContent =
        formattedSupply;
    })
    .catch((error) => {
      console.error("Error fetching current supply:", error);
    });
}
document.addEventListener("DOMContentLoaded", updateCurrentSupply);
