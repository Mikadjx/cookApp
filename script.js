// Initial votes
const votes = {
  "Bœuf Bourguignon": 0,
  "Blanquette de Veau": 0,
  "Ají de Gallina": 0,
};

// Update the results display
function updateResults() {
  const resultList = document.getElementById("result-list");
  resultList.innerHTML = ""; // Clear the list

  for (const [choice, count] of Object.entries(votes)) {
    const listItem = document.createElement("li");
    listItem.textContent = `${choice}: ${count} vote(s)`;
    resultList.appendChild(listItem);
  }
}

// Show details in popup
function showDetails(title, description, imageUrl) {
  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-description").textContent = description;
  document.getElementById("popup-image").src = imageUrl;

  document.getElementById("popup").classList.remove("hidden");
}

// Close popup
function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

// Add click event to vote buttons
document.querySelectorAll(".vote-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const choice = button.dataset.choice;
    votes[choice]++;
    updateResults();
    alert(`Merci pour votre vote ! Vous avez choisi : ${choice}`);
    event.stopPropagation(); // Prevent triggering card click
  });
});

// Initialize results display
updateResults();
