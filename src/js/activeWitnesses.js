
fetch('http://localhost:5000/api/accounts/witnesses')
    .then(response => response.json())
    .then(data => {
        // Now we have the witnesses data, we can create the HTML elements
        const statsDiv = document.getElementById('active-witnesses');

        data.witness_list.forEach(witness => {
            // Create a new div for each witness
            const witnessDiv = document.createElement('div');
            witnessDiv.classList.add('bg-black/60', 'to-white/5', 'rounded-lg');

            // Add the HTML for the witness
            witnessDiv.innerHTML = `
                <div class="flex flex-col p-2">
                
                    <div class="p-2">
                        <p class="text-gray-53 font-sm">${witness.account_name}</p>           
                        <p class="text-gray-500 text-sm">${witness.witness_data.url}</p>
                        <p class="text-sm ">Total Votes: ${witness.witness_data.total_votes} </p>
                        <p></p>
                    </div>
                </div>
                <div class="border-t border-white/5 p-4">
                <button class="info-button inline-flex space-x-2 items-center text-center">

                    <a href="#" class="inline-flex space-x-2 items-center text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        <span>Info</span>                                      
                    </a>
                </div>
            `;
// Get the info button inside the witnessDiv
const infoButton = witnessDiv.querySelector('.info-button');

// Add a click event listener to the info button
infoButton.addEventListener('click', () => {
    const witnessId = infoButton.getAttribute('data-witness-id');

    // Now you have the specific witness ID, and you can use it to fetch or display the detailed information
    displayWitnessDetails(witnessId); // A function you define to handle the display logic
});
            // Append the new div to the stats div
            statsDiv.appendChild(witnessDiv);
        });
    })
    .catch(error => console.error('Error:', error));