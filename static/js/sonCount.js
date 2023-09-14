async function updateSONs() {
  try {
    const response = await fetch(
      `${config.BASE_URL}/api/accounts/active_sons`,
    );
    const data = await response.json();
    const sonCount = data.son_count;
    document.querySelector(".son-count").innerText = "+" + sonCount;
  } catch (error) {
    console.error("Error fetching SONs:", error);
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  updateSONs();
});
