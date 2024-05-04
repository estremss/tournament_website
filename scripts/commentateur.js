// Déclare des listes pour stocker les données
var commentateurListe = [];

// Récupère le formulaire par son ID
var formulaire = document.getElementById("formulaire-joueur");

// Ajoute un écouteur d'événement pour le soumission du formulaire
formulaire.addEventListener("submit", function (event) {
    // Empêche le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();

    // Récupère les valeurs des champs
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var nationalite = document.getElementById("nationalite").value;

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

    let nouveauCommentateur = {
        prenom: prenom,
        nom : nom,
        nationalite: nationalite,
    };

    commentateurListe.push({ nom: nom, prenom: prenom, nationalite: nationalite });
    addPlayer(nouveauCommentateur);

    afficherJoueurs();

    // Efface les valeurs des champs après soumission
    document.getElementById("nom").value = "";
    document.getElementById("prenom").value = "";
    document.getElementById("nationalite").value = "Nationalité";

    // Affiche les listes de données (à des fins de démonstration)
    console.log("Commentateurs:", commentateurListe);
});

// Fonction pour afficher les joueurs
function afficherJoueurs() {
    // Sélectionne l'élément où les joueurs seront affichés
    var listeJoueurs = document.getElementById("listeJoueurs");

    // Vide l'élément pour éviter d'afficher les joueurs en double
    listeJoueurs.innerHTML = "";

    // Récupérer la liste des joueurs depuis le sessionStorage
    var joueursListe = JSON.parse(sessionStorage.getItem('commentatorList')) || [];

    // Affiche chaque joueur dans la liste des joueurs
    joueursListe.forEach(function (joueur, index) {
        var joueurDiv = document.createElement("div");
        joueurDiv.innerHTML = "<strong>Commentateur " + (index + 1) + "</strong><br>" +
            "Nom: " + joueur.nom + " " + joueur.prenom + "<br>" +
            "Nationalité: " + joueur.nationalite + "<br><br>";
        listeJoueurs.appendChild(joueurDiv);
    });
}


// Fonction pour récupérer la liste de joueurs depuis sessionStorage
function getPlayersListFromSessionStorage() {
    // Si la liste existe dans sessionStorage, la récupérer et la parser en tant qu'objet JavaScript
    // Sinon, retourner une liste vide
    return JSON.parse(sessionStorage.getItem('commentatorList')) || [];
}

// Fonction pour sauvegarder la liste de joueurs dans sessionStorage
function savePlayersListToSessionStorage(playersList) {
    // Convertir la liste de joueurs en chaîne JSON et la sauvegarder dans sessionStorage
    sessionStorage.setItem('commentatorList', JSON.stringify(playersList));
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

// Appelle la fonction pour afficher les joueurs initialement
afficherJoueurs();