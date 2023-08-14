// Define a function to fetch witnesses and update the UI
function updateWitnesses() {
  fetch("http://localhost:5000/api/accounts/witness_count")
    .then((response) => response.json())
    .then((data) => {
      const witnessCount = data.witness_count;
      document.querySelector(".witness-count").innerText = "+" + witnessCount;
    })
    .catch((error) => {
      console.error("Error fetching witnesses:", error);
    });
}

setInterval(updateWitnesses, 50000);
updateWitnesses();
