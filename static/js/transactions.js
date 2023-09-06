fetch("http://localhost:5000/api/transactions")
  .then((response) => response.json())
  .then((data) => {
    const transactionsDiv = document.getElementById("transactions");

    data.transactions.forEach((transaction) => {
      const transactionDiv = document.createElement("div");
      transactionDiv.classList.add(
        "bg-black/60",
        "to-white/5",
        "rounded-lg",
        "p-2",
        "my-2",
      );

      ["expiration", "operation_results", "operations", "signatures"].forEach(
        (key) => {
          const p = document.createElement("p");
          p.textContent = `${key}: ${JSON.stringify(transaction[key])}`;
          p.classList.add("text-gray-53", "font-md");
          transactionDiv.appendChild(p);
        },
      );

      transactionsDiv.appendChild(transactionDiv);
    });
  });
