// Déclare des listes pour stocker les données
var hommesListe = [];
var femmesListe = [];

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

    // Récupère la valeur du sexe sélectionné
    var sexeSelectionne = document.querySelector('input[name="sexe"]:checked');
    var sexe = sexeSelectionne ? sexeSelectionne.value : null;

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

    // Vérifie si le sexe est sélectionné
    if (sexe) {
        // Stocke les données dans la liste appropriée en fonction du sexe
        if (sexe === "homme") {
            hommesListe.push({ nom: nom, prenom: prenom, nationalite: nationalite });
        } else if (sexe === "femme") {
            femmesListe.push({ nom: nom, prenom: prenom, nationalite: nationalite });
        }

        afficherJoueurs();

        // Efface les valeurs des champs après soumission
        document.getElementById("nom").value = "";
        document.getElementById("prenom").value = "";
        document.getElementById("nationalite").value = "Nationalité";

        // Affiche les listes de données (à des fins de démonstration)
        console.log("Hommes:", hommesListe);
        console.log("Femmes:", femmesListe);
    }
});

// Fonction pour afficher les joueurs
function afficherJoueurs() {
    // Sélectionne l'élément où les joueurs seront affichés
    var listeJoueurs = document.getElementById("listeJoueurs");

    // Vide l'élément pour éviter d'afficher les joueurs en double
    listeJoueurs.innerHTML = "";

    // Affiche chaque joueur dans la liste des hommes
    hommesListe.forEach(function (joueur, index) {
        var joueurDiv = document.createElement("div");
        joueurDiv.innerHTML = "<strong>Commentateur " + (index + 1) + " (Homme)</strong><br>" +
            "Nom: " + joueur.nom + " " + joueur.prenom + "<br>" +
            "Nationalité: " + joueur.nationalite + "<br><br>";
        listeJoueurs.appendChild(joueurDiv);
    });

    // Affiche chaque joueur dans la liste des femmes
    femmesListe.forEach(function (joueur, index) {
        var joueurDiv = document.createElement("div");
        joueurDiv.innerHTML = "<strong>Commentateur " + (index + 1) + " (Femme)</strong><br>" +
        "Nom: " + joueur.nom + " " + joueur.prenom + "<br>" +
        "Nationalité: " + joueur.nationalite + "<br><br>";
        listeJoueurs.appendChild(joueurDiv);
    });
}

// Appelle la fonction pour afficher les joueurs initialement
afficherJoueurs();