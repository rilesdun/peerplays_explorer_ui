// Define a function to fetch witnesses and update the UI
function updateWitnesses() {
    fetch('http://localhost:5000/api/accounts/witness_count')
      .then(response => response.json())
      .then(data => {
        // Update the UI with the witness count
        const witnessCount = data.witness_count;
        document.querySelector('.witness-count').innerText = '+' + witnessCount;
      })
      .catch(error => {
        console.error('Error fetching witnesses:', error);
      });
  }
  
  // Call the update function every 60 seconds (adjust the interval as needed)
  setInterval(updateWitnesses, 60000);
  
  // Call the function once immediately to get the initial data
  updateWitnesses();