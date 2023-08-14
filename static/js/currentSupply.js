function updateCurrentSupply() {
  fetch("http://localhost:5000/api/supply") // Make sure the URL is correct
    .then((response) => response.json())
    .then((data) => {
      const supply = data.circulating;
      const formattedSupply = `${parseFloat(supply).toFixed(2)}`;
      document.querySelector(".current-supply span").textContent =
        formattedSupply;
    })

    .catch((error) => {
      console.error("Error fetching current supply:", error);
    });
}
document.addEventListener("DOMContentLoaded", updateCurrentSupply);
