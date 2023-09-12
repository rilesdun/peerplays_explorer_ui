const ASSET_IDS = {
  "1.3.0": "PPY",
  "1.3.1": "BTFUN",
  "1.3.22": "BTC",
  "1.3.24": "HIVE",
  "1.3.23": "HBD",
};

const OPERATION_MAP = {
  0: "transfer_operation",
  5: "account_create_operation",
  6: "account_update_operation",
  21: "witness_update_operation",
  22: "proposal_create_operation",
  23: "proposal_update_operation",
  33: "vesting_balance_withdraw_operation",
  49: "asset_dividend_distribution_operation",
  104: "son_heartbeat_operation",
  123: "random_number_store_operation",
};

const accountNameCache = {};

async function fetchAccountName(accountId) {
  if (accountNameCache[accountId]) {
    return accountNameCache[accountId];
  }
  const response = await fetch(
    `http://localhost:5000/api/accounts/${accountId}`,
  );
  const data = await response.json();
  accountNameCache[accountId] = data.account_info.name;
  return data.account_info.name;
}

function handleUnrecognizedOperation(operation) {
  const operationElement = document.createElement("div");
  operationElement.classList.add("operation");
  operationElement.innerHTML = `
        <div class="bg-black/60 to-white/5 rounded-lg p-2">
            <p>Operation Number: ${operation.op[0]}</p>
            <p>Block Number: <a href="/blocks?block=${
              operation.block_num
            }" target="_blank">${operation.block_num}</a></p>
            <p>Operation Type: Unrecognized</p>
            <details class="mt-2">
                <summary class="text-red-500 cursor-pointer">View Raw JSON Data</summary>
                <pre class="mt-2 bg-gray-800 p-2 rounded">${JSON.stringify(
                  operation,
                  null,
                  2,
                )}</pre>
            </details>
        </div>
    `;
  return operationElement;
}

async function handleTransferOperation(operation) {
  if (!operation.op[1].amount) {
    console.log("Skipping operation without amount:", operation);
    return;
  }
  const fromAccountName = await fetchAccountName(operation.op[1].from);
  const toAccountName = await fetchAccountName(operation.op[1].to);
  const asset =
    ASSET_IDS[operation.op[1].amount.asset_id] ||
    operation.op[1].amount.asset_id;

  const operationElement = document.createElement("div");
  operationElement.classList.add("operation");
  operationElement.innerHTML = `
    <div class="bg-black/60 to-white/5 rounded-lg p-2">
      <p>Block Number: <a href="/blocks?block=${operation.block_num}">${operation.block_num}</a></p>
      <p>Operation Type: Transfer</p>

      <p>Operation Number: ${operation.op[0]}</p>
      <p>ID: ${operation.id}</p>
      <p>Amount: ${operation.op[1].amount.amount}</p>
      <p>Asset: ${asset}</p>
      <p>From: ${fromAccountName}</p>
      <p>To: ${toAccountName}</p>
    </div>
  `;
  return operationElement;
}

async function handleSonHeartbeatOperation(operation) {
  const ownerAccountName = await fetchAccountName(
    operation.op[1].owner_account,
  );
  const feeAsset =
    ASSET_IDS[operation.op[1].fee.asset_id] || operation.op[1].fee.asset_id;

  const operationElement = document.createElement("div");
  operationElement.classList.add("operation");
  operationElement.innerHTML = `
      <div class="bg-black/60 to-white/5 rounded-lg p-2">
      <p>Block Number: <a href="/blocks?block=${operation.block_num}" target="_blank">${operation.block_num}</a></p>

          <p>Operation Type: SON Heartbeat</p>
          <p>Operation Number: ${operation.op[0]}</p>
          <p>Owner Account: ${ownerAccountName}</p>
          <p>SON ID: ${operation.op[1].son_id}</p>
          <p>Timestamp: ${operation.op[1].ts}</p>
          <p>Fee: ${operation.op[1].fee.amount} ${feeAsset}</p>
      </div>
  `;

  return operationElement;
}

async function handleWitnessUpdateOperation(operation) {
  const witnessAccountName = await fetchAccountName(
    operation.op[1].witness_account,
  );
  const feeAsset =
    ASSET_IDS[operation.op[1].fee.asset_id] || operation.op[1].fee.asset_id;

  const operationElement = document.createElement("div");
  operationElement.classList.add("operation");
  operationElement.innerHTML = `
      <div class="bg-black/60 to-white/5 rounded-lg p-2">
      <p>Block Number: <a href="/blocks?block=${operation.block_num}" target="_blank">${operation.block_num}</a></p>

          <p>Operation Type: Witness Update</p>
          <p>Operation Number: ${operation.op[0]}</p>
          <p>Witness Account: ${witnessAccountName}</p>
          <p>Witness ID: ${operation.op[1].witness}</p>
          <p>New Initial Secret: ${operation.op[1].new_initial_secret}</p>
          <p>New Signing Key: ${operation.op[1].new_signing_key}</p>
          <p>Fee: ${operation.op[1].fee.amount} ${feeAsset}</p>
      </div>
  `;

  return operationElement;
}

async function handleProposalUpdateOperation(operation) {
  const feePayingAccountName = await fetchAccountName(
    operation.op[1].fee_paying_account,
  );
  const feeAsset =
    ASSET_IDS[operation.op[1].fee.asset_id] || operation.op[1].fee.asset_id;

  const activeApprovalsToAddNames = await Promise.all(
    operation.op[1].active_approvals_to_add.map(fetchAccountName),
  );
  const activeApprovalsToRemoveNames = await Promise.all(
    operation.op[1].active_approvals_to_remove.map(fetchAccountName),
  );

  const operationElement = document.createElement("div");
  operationElement.classList.add("operation");
  operationElement.innerHTML = `
      <div class="bg-black/60 to-white/5 rounded-lg p-2">
      <p>Block Number: <a href="/blocks?block=${
        operation.block_num
      }" target="_blank">${operation.block_num}</a></p>

          <p>Operation Type: Proposal Update</p>
          <p>Operation Number: ${operation.op[0]}</p>
          <p>Fee Paying Account: ${feePayingAccountName}</p>
          <p>Proposal ID: ${operation.op[1].proposal}</p>
          <p>Active Approvals to Add: ${activeApprovalsToAddNames.join(
            ", ",
          )}</p>
          <p>Active Approvals to Remove: ${activeApprovalsToRemoveNames.join(
            ", ",
          )}</p>
          <p>Fee: ${operation.op[1].fee.amount} ${feeAsset}</p>
      </div>
  `;

  return operationElement;
}

async function handleProposalCreateOperation(operation) {
  const feePayingAccountName = await fetchAccountName(
    operation.op[1].fee_paying_account,
  );
  const feeAsset =
    ASSET_IDS[operation.op[1].fee.asset_id] || operation.op[1].fee.asset_id;

  // only first proposed operation ff there are multiple proposed, we should loop through
  const proposedOperationType =
    OPERATION_MAP[operation.op[1].proposed_ops[0].op[0]];
  const proposedOperationData = operation.op[1].proposed_ops[0].op[1];

  // You can further process the proposedOperationData based on its type if needed.

  const operationElement = document.createElement("div");
  operationElement.classList.add("operation");
  operationElement.innerHTML = `
      <div class="bg-black/60 to-white/5 rounded-lg p-2">
      <p>Block Number: <a href="/blocks?block=${operation.block_num}" target="_blank">${operation.block_num}</a></p>

          <p>Operation Type: Proposal Create</p>
          <p>Operation Number: ${operation.op[0]}</p>
          <p>Fee Paying Account: ${feePayingAccountName}</p>
          <p>Expiration Time: ${operation.op[1].expiration_time}</p>
          <p>Proposed Operation Type: ${proposedOperationType}</p>
          <p>Fee: ${operation.op[1].fee.amount} ${feeAsset}</p>
          <!--  add more details about the proposed operation here -->
      </div>
  `;

  return operationElement;
}

async function handleAssetDividendDistributionOperation(operation) {
  const accountId = operation.op[1].account_id;
  const accountName = await fetchAccountName(accountId);
  const dividendAsset =
    ASSET_IDS[operation.op[1].dividend_asset_id] ||
    operation.op[1].dividend_asset_id;

  let amountsText = operation.op[1].amounts
    .map((amountObj) => {
      const asset = ASSET_IDS[amountObj.asset_id] || amountObj.asset_id;
      return `${amountObj.amount} ${asset}`;
    })
    .join(", ");

  const operationElement = document.createElement("div");
  operationElement.classList.add("operation");
  operationElement.innerHTML = `
    <div class="bg-black/60 to-white/5 rounded-lg p-2">
      <p>Block Number: <a href="/blocks?block=${operation.block_num}" target="_blank">${operation.block_num}</a></p>
      <p>Operation Type: Asset Dividend Distribution</p>
      <p>Operation Number: ${operation.op[0]}</p>
      <p>Account: ${accountName}</p>
      <p>Dividend Asset: ${dividendAsset}</p>
      <p>Received Dividends: ${amountsText}</p>
    </div>
  `;
  return operationElement;
}

async function handleAccountUpdateOperation(operation) {
  const accountName = await fetchAccountName(operation.op[1].account);
  const feeAsset =
    ASSET_IDS[operation.op[1].fee.asset_id] || operation.op[1].fee.asset_id;

  const activeKeyAuths =
    operation.op[1].active && operation.op[1].active.key_auths
      ? operation.op[1].active.key_auths
      : [];
  const ownerKeyAuths =
    operation.op[1].owner && operation.op[1].owner.key_auths
      ? operation.op[1].owner.key_auths
      : [];

  const operationElement = document.createElement("div");
  operationElement.classList.add("operation");
  operationElement.innerHTML = `
  <div class="bg-black/60 to-white/5 rounded-lg p-2">
      <p>Operation Number: ${operation.op[0]}</p>
      <p>Block Number: <a href="/blocks?block=${
        operation.block_num
      }" target="_blank">${operation.block_num}</a></p>
      <p>Operation Type: Account Update</p>
      <p>Account: ${accountName}</p>
      <p>Active Key Auths: ${activeKeyAuths
        .map((auth) => auth[0])
        .join(", ")}</p>
      <p>Owner Key Auths: ${ownerKeyAuths.map((auth) => auth[0]).join(", ")}</p>
      <p>Memo Key: ${operation.op[1].new_options.memo_key}</p>
      <p>Votes: ${operation.op[1].new_options.votes.join(", ")}</p>
      <p>Voting Account: ${await fetchAccountName(
        operation.op[1].new_options.voting_account,
      )}</p>
      <p>Fee: ${operation.op[1].fee.amount} ${feeAsset}</p>
  </div>
`;

  return operationElement;
}

async function handleAccountCreateOperation(operation) {
  const registrarName = await fetchAccountName(operation.op[1].registrar);
  const referrerName = await fetchAccountName(operation.op[1].referrer);
  const feeAsset =
    ASSET_IDS[operation.op[1].fee.asset_id] || operation.op[1].fee.asset_id;

  const operationElement = document.createElement("div");
  operationElement.classList.add("operation");
  operationElement.innerHTML = `
      <div class="bg-black/60 to-white/5 rounded-lg p-2">
          <p>Operation Number: ${operation.op[0]}</p>
          <p>Block Number: <a href="/blocks?block=${
            operation.block_num
          }" target="_blank">${operation.block_num}</a></p>
          <p>Operation Type: Account Create</p>
          <p>Account Name: ${operation.op[1].name}</p>
          <p>Active Key Auths: ${operation.op[1].active.key_auths
            .map((auth) => auth[0])
            .join(", ")}</p>
          <p>Owner Key Auths: ${operation.op[1].owner.key_auths
            .map((auth) => auth[0])
            .join(", ")}</p>
          <p>Memo Key: ${operation.op[1].options.memo_key}</p>
          <p>Registrar: ${registrarName}</p>
          <p>Referrer: ${referrerName}</p>
          <p>Fee: ${operation.op[1].fee.amount} ${feeAsset}</p>
      </div>
  `;

  return operationElement;
}

async function handleVestingBalanceWithdrawOperation(operation) {
  const ownerAccountName = await fetchAccountName(operation.op[1].owner);
  const feeAsset =
    ASSET_IDS[operation.op[1].fee.asset_id] || operation.op[1].fee.asset_id;
  const amountAsset =
    ASSET_IDS[operation.op[1].amount.asset_id] ||
    operation.op[1].amount.asset_id;

  const operationElement = document.createElement("div");
  operationElement.classList.add("operation");
  operationElement.innerHTML = `
      <div class="bg-black/60 to-white/5 rounded-lg p-2">
      <p>Block Number: <a href="/blocks?block=${
        operation.block_num
      }" target="_blank">${operation.block_num}</a></p>
          <p>Operation Type: Vesting Balance Withdraw</p>
          <p>Owner Account: ${ownerAccountName}</p>
          <p>Vesting Balance ID: ${operation.op[1].vesting_balance}</p>
          <p>Amount: ${
            operation.op[1].amount.amount / 100000
          } ${amountAsset}</p> <!-- Assuming 5 decimal places for the asset -->
          <p>Fee: ${
            operation.op[1].fee.amount / 100000
          } ${feeAsset}</p> <!-- Assuming 5 decimal places for the asset -->
      </div>
  `;

  return operationElement;
}

async function fetchAccountOperations(accountName) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/account_history/${accountName}`,
    );
    const data = await response.json();
    const operationsDiv = document.getElementById("account-operations");

    for (const operation of data) {
      const operationType = OPERATION_MAP[operation.op[0]];
      let operationElement;

      switch (operationType) {
        case "transfer_operation":
          operationElement = await handleTransferOperation(operation);
          break;
        case "son_heartbeat_operation":
          operationElement = await handleSonHeartbeatOperation(operation);
          break;
        case "witness_update_operation":
          operationElement = await handleWitnessUpdateOperation(operation);
          break;
        case "proposal_update_operation":
          operationElement = await handleProposalUpdateOperation(operation);
          break;
        case "proposal_create_operation":
          operationElement = await handleProposalCreateOperation(operation);
          break;
        case "asset_dividend_distribution_operation":
          operationElement = await handleAssetDividendDistributionOperation(
            operation,
          );
          break;
        case "account_update_operation":
          operationElement = await handleAccountUpdateOperation(operation);
          break;
        case "account_create_operation":
          operationElement = await handleAccountCreateOperation(operation);
          break;
        case "vesting_balance_withdraw_operation":
          operationElement = await handleVestingBalanceWithdrawOperation(
            operation,
          );
          break;
        // Addition point for other operations
        default:
          operationElement = handleUnrecognizedOperation(operation);
          break;
      }

      if (operationElement) {
        operationsDiv.appendChild(operationElement);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const accountName = window.location.pathname.split("/").pop();
fetchAccountOperations(accountName);
