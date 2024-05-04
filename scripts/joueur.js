// Déclare des listes pour stocker les données
var joueurListe = [];

// Récupère le formulaire par son ID
var formulaire = document.getElementById("formulaire-joueur");

// Ajoute un écouteur d'événement pour le soumission du formulaire
formulaire.addEventListener("submit", function (event) {
    // Empêche le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();

    // Récupère les valeurs des champs
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var personnage = document.getElementById("personnage").value;
    var nationalite = document.getElementById("nationalite").value;

    // Récupère la valeur de la manette sélectionnée
    var manetteSelectionne = document.querySelector('input[name="manette"]:checked');
    var manette = manetteSelectionne ? manetteSelectionne.value : null;

    var nomValide = /^[a-zA-Z]+$/.test(nom);
    var prenomValide = /^[a-zA-Z]+$/.test(prenom);

    if (!prenomValide) {
        document.getElementById("erreur-prenom").innerHTML = "N'utilisez que des lettres.";
        setTimeout(function () {
            document.getElementById("erreur-prenom").innerHTML = "";
        }, 3000);
        return; // Arrête l'exécution de la fonction
    }

    if (!nomValide) {
        document.getElementById("erreur-nom").innerHTML = "N'utilisez que des lettres.";
        setTimeout(function () {
            document.getElementById("erreur-nom").innerHTML = "";
        }, 3000);
        return; // Arrête l'exécution de la fonction
    }

    let nouveauJoueur = {
        prenom: prenom,
        nom: nom,
        personnage: personnage,
        manette: manette,
        nationalite: nationalite,
    };

    joueurListe.push({ nom: nom, prenom: prenom, personnage: personnage, manette: manette, nationalite: nationalite });
    addPlayer(nouveauJoueur);

    afficherJoueurs();

    // Efface les valeurs des champs après submit
    document.getElementById("nom").value = "";
    document.getElementById("prenom").value = "";
    document.getElementById("nationalite").value = "Nationalité";
    document.getElementById("personnage").value = "Personnage";

    // Affiche les listes de données dans la console
    //console.log("Joueurs:", joueurListe);

});

// Fonction pour récupérer la liste de joueurs depuis sessionStorage
function getPlayersListFromSessionStorage() {
    // Si la liste existe dans sessionStorage, la récupérer et la parser en tant qu'objet JavaScript
    // Sinon, retourner une liste vide
    return JSON.parse(sessionStorage.getItem('playersList')) || [];
}

// Fonction pour sauvegarder la liste de joueurs dans sessionStorage
function savePlayersListToSessionStorage(playersList) {
    // Convertir la liste de joueurs en chaîne JSON et la sauvegarder dans sessionStorage
    sessionStorage.setItem('playersList', JSON.stringify(playersList));
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
    var joueursListe = JSON.parse(sessionStorage.getItem('playersList')) || [];

    // Affiche chaque joueur dans la liste des joueurs
    joueursListe.forEach(function (joueur, index) {
        var joueurDiv = document.createElement("div");
        joueurDiv.innerHTML = "<strong>Joueur " + (index + 1) + "</strong><br>" +
            "Nom: " + joueur.prenom + " " + joueur.nom + "<br>" +
            "Personnage: " + joueur.personnage + "<br>" +
            "Manette: " + joueur.manette + "<br>" +
            "Nationalité: " + joueur.nationalite + "<br><br>";
        listeJoueurs.appendChild(joueurDiv);
    });
}

// Appelle la fonction pour afficher les joueurs initialement
afficherJoueurs();