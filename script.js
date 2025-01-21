// Initial votes
const votes = {
  "Bœuf Bourguignon": 0,
  "Blanquette de Veau": 0,
  "Ají de Gallina": 0,
};

let totalVotes = 0; // Compteur de votes total
let hasVoted = false; // Vérifie si l'utilisateur a déjà voté

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

// Fonction pour alerter et envoyer un email
function alertAndSendEmail() {
  alert("Le seuil de 11 votes a été atteint ! Un email sera envoyé à chacun.");
  
  // Envoi d'une requête au serveur pour envoyer des emails
  fetch("http://votre-serveur-api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Le seuil de 11 votes a été atteint !",
      recipients: [
        "email1@cesi.fr",
        "email2@cesi.fr",
        "email3@cesi.fr", // Ajoutez ici tous les emails
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Emails envoyés avec succès :", data);
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi des emails :", error);
    });
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
    updateResults();
    alert(`Merci pour votre vote ! Vous avez choisi : ${choice}`);
    hasVoted = true;

    // Vérifie si le seuil est atteint
    if (totalVotes === 11) {
      alertAndSendEmail();
    }

    event.stopPropagation();
  });
});

// Initialisation des résultats affichés
updateResults();

