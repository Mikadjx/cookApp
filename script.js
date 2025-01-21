// Initial votes
const votes = {
    "Bœuf Bourguignon": 0,
    "Blanquette de Veau": 0,
    "Ají de Gallina": 0,
  };
  
  // Update results display
  function updateResults() {
    const resultList = document.getElementById("result-list");
    resultList.innerHTML = "";
  
    for (const [key, value] of Object.entries(votes)) {
      const listItem = document.createElement("li");
      listItem.textContent = `${key}: ${value} votes`;
      resultList.appendChild(listItem);
    }
  }
  
  // Handle vote button click
  document.querySelectorAll(".vote-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const choice = event.target.closest(".option").dataset.choice;
      votes[choice]++;
      updateResults();
      alert(`Merci d'avoir voté pour ${choice} !`);
    });
  });
  
  // Initialize results on load
  updateResults();
  