// static/js/accountOperations.js

const ASSET_IDS = {
    "1.3.0": "PPY",
    "1.3.1": "BTFUN",
    "1.3.22": "BTC",
    "1.3.24": "HIVE",
    "1.3.23": "HBD"
};

function fetchAccountName(accountId) {
    return fetch(`http://localhost:5000/api/accounts/${accountId}`)
        .then(response => response.json())
        .then(data => data.account_info.name);
}

function fetchAccountOperations(accountName) {
    fetch(`http://localhost:5000/api/account_history/${accountName}`)
        .then((response) => response.json())
        .then((data) => {
            const operationsDiv = document.getElementById("account-operations");

            data.forEach((operation) => {
                console.log('operation:', operation);
                console.log('operation.op:', operation.op);
                console.log('operation.op[1]:', operation.op[1]);
                console.log('operation.op[1].amount:', operation.op[1].amount);

                const operationElement = document.createElement("div");
                operationElement.classList.add("operation");
                const assetId = operation.op[1].amount.asset_id;
                const asset = ASSET_IDS[assetId] || assetId;

                Promise.all([
                    fetchAccountName(operation.op[1].from),
                    fetchAccountName(operation.op[1].to)
                ]).then(([fromAccountName, toAccountName]) => {
                    operationElement.innerHTML = `
                        <div class="bg-black/60 to-white/5 rounded-lg p-2">
                            <p>Block Number: ${operation.block_num}</p>
                            <p>ID: ${operation.id}</p>
                            <p>Amount: ${operation.op[1].amount.amount}</p>
                            <p>Asset: ${asset}</p>
                            <p>From: ${fromAccountName}</p>
                            <p>To: ${toAccountName}</p>
                        </div>
                    `;
                    operationsDiv.appendChild(operationElement);
                });
            });
        })
        .catch((error) => console.error("Error:", error));
}
const accountName = window.location.pathname.split("/").pop();
fetchAccountOperations(accountName);