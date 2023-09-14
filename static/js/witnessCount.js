function updateWitnesses() {
  fetch(`${config.BASE_URL}/api/accounts/witness_count`)
    .then((response) => response.json())
    .then((data) => {
      const witnessCount = data.witness_count;
      document.querySelector(".witness-count").innerText = "+" + witnessCount;
    })
    .catch((error) => {
      console.error("Error fetching witnesses:", error);
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
  updateWitnesses();
});
