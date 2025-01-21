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

// Fonction pour afficher les détails dans une popup
function showDetails(title, description, imageUrl) {
  const popup = document.getElementById("popup");
  const popupTitle = document.getElementById("popup-title");
  const popupDescription = document.getElementById("popup-description");
  const popupImage = document.getElementById("popup-image");

  // Mise à jour des éléments de la popup
  popupTitle.textContent = title;
  popupDescription.textContent = description;
  popupImage.src = imageUrl;

  // Affiche la popup
  popup.classList.remove("hidden");
}

// Fonction pour fermer la popup
function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("hidden");
}

// Gestion des clics sur les boutons de vote
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
      alert("Seuil de 11 votes atteint !");
    }

    event.stopPropagation(); // Empêche le clic sur le bouton d'affecter la card
  });
});

// Gestion des clics sur les cards pour afficher la popup
document.querySelectorAll(".menu-card").forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector(".card-title").textContent;
    const description = card.getAttribute("data-description");
    const imageUrl = card.querySelector(".card-img-top").src;

    showDetails(title, description, imageUrl);
  });
});

// Initialisation des résultats affichés
updateResults();
