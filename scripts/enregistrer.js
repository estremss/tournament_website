var playersList = [];

// Fonction pour peupler le select avec les matchs disponibles
function peuplerSelectMatchs() {
    var selectMatch = document.getElementById("selectMatch");
    var matchListe = JSON.parse(sessionStorage.getItem('matchList')) || [];
    matchListe.forEach(function (match, index) {
        var option = document.createElement("option");
        option.value = index;
        var joueur1 = match.joueur1;
        var joueur2 = match.joueur2;
        option.textContent = joueur1.nom + " " + joueur1.prenom + " VS " + joueur2.nom + " " + joueur2.prenom;
        selectMatch.appendChild(option);
    });
}

// Fonction pour afficher les boutons radio après la sélection d'un match
function afficherBoutonsRadio() {
    var selectMatch = document.getElementById("selectMatch");
    var indexMatchSelectionne = parseInt(selectMatch.value);
    var boutonsRadioDiv = document.getElementById("boutonsRadio");

    // Afficher les boutons radio seulement si un match est sélectionné
    if (!isNaN(indexMatchSelectionne)) {
        var matchSelectionne = JSON.parse(sessionStorage.getItem('matchList'))[indexMatchSelectionne];
        var joueur1 = matchSelectionne.joueur1;
        var joueur2 = matchSelectionne.joueur2;

        var joueur1Label = document.querySelector('label[for="joueur1"]');
        var joueur2Label = document.querySelector('label[for="joueur2"]');

        joueur1Label.textContent = joueur1.nom + " " + joueur1.prenom;
        joueur2Label.textContent = joueur2.nom + " " + joueur2.prenom;

        boutonsRadioDiv.style.display = "block";
    } else {
        boutonsRadioDiv.style.display = "none";
    }
}

// Fonction pour enregistrer le vainqueur du match
function enregistrerVainqueur() {
    var selectMatch = document.getElementById("selectMatch");
    var indexMatchSelectionne = parseInt(selectMatch.value);
    let matches = JSON.parse(sessionStorage.getItem('matchList'));
    let Match = matches[indexMatchSelectionne];
    let resultat;

    // Vérifier quel bouton radio est sélectionné
    var joueur1RadioButton = document.getElementById("joueur1");
    var joueur2RadioButton = document.getElementById("joueur2");
    if (joueur1RadioButton.checked) {
        resultat = {
            vainqueur: Match.joueur1,
            perdant: Match.joueur2,
        };
    } else if (joueur2RadioButton.checked) {
        resultat = {
            vainqueur: Match.joueur2,
            perdant: Match.joueur1,
        };
    }

    addPlayer(resultat);

    matches.splice(indexMatchSelectionne, 1);

    // Mettre à jour la liste de matches dans le sessionStorage
    sessionStorage.setItem('matchList', JSON.stringify(matches));
}

// Fonction pour récupérer la liste de joueurs depuis sessionStorage
function getPlayersListFromSessionStorage() {
    // Si la liste existe dans sessionStorage, la récupérer et la parser en tant qu'objet JavaScript
    // Sinon, retourner une liste vide
    return JSON.parse(sessionStorage.getItem('resultatList')) || [];
}

// Fonction pour sauvegarder la liste de joueurs dans sessionStorage
function savePlayersListToSessionStorage(playersList) {
    // Convertir la liste de joueurs en chaîne JSON et la sauvegarder dans sessionStorage
    sessionStorage.setItem('resultatList', JSON.stringify(playersList));
}

// Fonction pour ajouter un joueur à la liste de joueurs
function addPlayer(player) {
    // Récupérer la liste de joueurs depuis sessionStorage
    let playersList = getPlayersListFromSessionStorage();
    // Ajouter le nouveau joueur à la liste
    playersList.push(player);
    // Sauvegarder la liste mise à jour dans sessionStorage
    savePlayersListToSessionStorage(playersList);
}

// Fonction pour afficher les joueurs
function afficherJoueurs() {
    // Sélectionne l'élément où les joueurs seront affichés
    var listeJoueurs = document.getElementById("listeJoueurs");

    // Vide l'élément pour éviter d'afficher les joueurs en double
    listeJoueurs.innerHTML = "";

    // Récupérer la liste des joueurs depuis le sessionStorage
    var joueursListe = JSON.parse(sessionStorage.getItem('resultatList')) || [];

    // Affiche chaque joueur dans la liste des joueurs
    joueursListe.forEach(function (joueur) {
        var joueurDiv = document.createElement("div");
        console.log(joueur);
        joueurDiv.innerHTML = "<strong>" + joueur.vainqueur.nom[0] + ". " + joueur.vainqueur.prenom +
        " </strong>VS<strong> " + joueur.perdant.nom[0] + ". " + joueur.perdant.prenom + "</strong><br>" +
        "<u>Vainqueur :</u> " + joueur.vainqueur.nom[0] + ". " + joueur.vainqueur.prenom + "<br><br>";
        listeJoueurs.appendChild(joueurDiv);
    });
}

// Appeler la fonction pour peupler le select lors du chargement de la page
peuplerSelectMatchs();
afficherJoueurs();
