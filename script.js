// Initialisation des votes
let votes = JSON.parse(localStorage.getItem("votes")) || {
  "Bœuf Bourguignon": 0,
  "Blanquette de Veau": 0,
  "Ají de Gallina": 0,
};

let totalVotes = parseInt(localStorage.getItem("totalVotes")) || 0;
let hasVoted = localStorage.getItem("hasVoted") === "true"; // Vérifie si l'utilisateur a déjà voté

// Mise à jour des résultats affichés
function updateResults() {
  const resultList = document.getElementById("result-list");
  resultList.innerHTML = "";

  for (const [choice, count] of Object.entries(votes)) {
    const listItem = document.createElement("li");
    listItem.textContent = `${choice}: ${count} vote(s)`;
    resultList.appendChild(listItem);
  }
}


// Événement pour les boutons de vote
document.querySelectorAll(".vote-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (hasVoted) {
      alert("Vous avez déjà voté. Merci pour votre participation !");
      return;
    }

    const choice = button.dataset.choice;
    votes[choice]++;
    totalVotes++;
    hasVoted = true;

    // Stocker les résultats localement
    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("totalVotes", totalVotes);
    localStorage.setItem("hasVoted", "true");

    updateResults();

    alert(`Merci pour votre vote ! Vous avez choisi : ${choice}`);

    // Vérifie si le seuil de votes est atteint
    if (totalVotes === 11) {
      alertAndSendEmail();
    }

    event.stopPropagation();
  });
});

// Initialisation des résultats affichés
updateResults();
