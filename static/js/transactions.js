async function handleTransactionDisplay(transaction) {
  const transactionElement = document.createElement("div");
  transactionElement.classList.add(
    "transaction",
    "bg-black/60",
    "to-white/5",
    "rounded-lg",
    "p-2",
    "my-2",
  );

  // Add more structured data display here
  transactionElement.innerHTML = `
      <p>Expiration: ${transaction.expiration}</p>
      <p>Operation Results: ${JSON.stringify(transaction.operation_results)}</p>
      <p>Operations: ${JSON.stringify(transaction.operations)}</p>
      <p>Signatures: ${transaction.signatures.join(", ")}</p>
  `;

  return transactionElement;
}

async function fetchAndDisplayTransactions() {
  try {
    const response = await fetch(`${config.BASE_URL}/api/transactions`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const transactionsDiv = document.getElementById("transactions");

    for (const transaction of data.transactions) {
      const transactionElement = await handleTransactionDisplay(transaction);
      transactionsDiv.appendChild(transactionElement);
    }
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
  }
}

fetchAndDisplayTransactions();
