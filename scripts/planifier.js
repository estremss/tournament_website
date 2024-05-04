populatePlayersSelect();
populateCommentatorSelect();

// Déclare des listes pour stocker les données
var joueurListe = [];

// Récupère le formulaire par son ID
var formulaire = document.getElementById("formulaire-joueur");

function displayImage() {
    var selectBox = document.getElementById("select-option");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    var image = document.getElementById("displayed-image");

    if (selectedValue === "") {
        image.style.display = "none";
    } else {
        image.src = selectedValue + ".avif";
        image.style.display = "block";
    }
}

// Fonction pour peupler les selects des joueurs
function populatePlayersSelect() {
    let playersList = JSON.parse(sessionStorage.getItem('playersList')) || [];
    let selectElement1 = document.getElementById('player1Select');
    let selectElement2 = document.getElementById('player2Select');

    playersList.forEach(function(player, index) {
        let option1 = document.createElement('option');
        option1.value = index;
        option1.text = player.prenom + ' ' + player.nom;
        selectElement1.appendChild(option1);

        let option2 = document.createElement('option');
        option2.value = index;
        option2.text = player.prenom + ' ' + player.nom;
        selectElement2.appendChild(option2);
    });
}

function populateCommentatorSelect() {
    let commentateurList = JSON.parse(sessionStorage.getItem('commentatorList')) || [];
    let commentateurSelect = document.getElementById('commentateur');

    commentateurList.forEach(function(player, index) {
        let option = document.createElement('option');
        option.value = index;
        option.text = player.prenom + ' ' + player.nom;
        commentateurSelect.appendChild(option);
    });
}

// Fonction pour mettre à jour les options du select du joueur 2
function updatePlayer2Options() {
    let selectElement2 = document.getElementById('player2Select');
    
    // Récupérer la liste des options du select du joueur 2
    let options = selectElement2.options;

    // Récupérer l'index du joueur sélectionné dans le select du joueur 1
    let player1OptionIndex = parseInt(document.getElementById('player1Select').selectedIndex);

    // Parcourir les options du select du joueur 2 et désactiver l'option correspondante au joueur sélectionné dans le select du joueur 1
    for (let i = 1; i < options.length; i++) {
        options[i].disabled = (i === player1OptionIndex);
    }
}

function updatePlayer1Options() {
    let selectElement1 = document.getElementById('player1Select');
    
    // Récupérer la liste des options du select du joueur 2
    let options = selectElement1.options;

    // Récupérer l'index du joueur sélectionné dans le select du joueur 1
    let player1OptionIndex = parseInt(document.getElementById('player2Select').selectedIndex);

    // Parcourir les options du select du joueur 2 et désactiver l'option correspondante au joueur sélectionné dans le select du joueur 1
    for (let i = 1; i < options.length; i++) {
        options[i].disabled = (i === player1OptionIndex);
    }
}

formulaire.addEventListener("submit", function (event) {
    // Empêche le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();

    // Récupère les valeurs des champs
    var joueur1Index = parseInt(document.getElementById("player1Select").value);
    var joueur2Index = parseInt(document.getElementById("player2Select").value);
    var commentateurIndex = parseInt(document.getElementById("commentateur").value);
    var arene = document.getElementById("select-option").value;
    var date = document.getElementById("date").value;
    let ListeDeJoueur = JSON.parse(sessionStorage.getItem('playersList'));
    let ListeDeCommentateur = JSON.parse(sessionStorage.getItem('commentatorList'));

    let nouveauMatch = {
        joueur1: ListeDeJoueur[joueur1Index],
        joueur2: ListeDeJoueur[joueur2Index],
        commentateur: ListeDeCommentateur[commentateurIndex],
        arene: arene,
        date: date,
    };

    addPlayer(nouveauMatch);

    afficherJoueurs();

    // Efface les valeurs des champs après submit
    document.getElementById("player1Select").value = "";
    document.getElementById("player2Select").value = "";
    document.getElementById("commentateur").value = "";
    document.getElementById("select-option").value = "";
    document.getElementById("date").value = "2024-05-06";

    // Affiche les listes de données dans la console
    //console.log("Joueurs:", joueurListe);

});

// Fonction pour récupérer la liste de joueurs depuis sessionStorage
function getPlayersListFromSessionStorage() {
    // Si la liste existe dans sessionStorage, la récupérer et la parser en tant qu'objet JavaScript
    // Sinon, retourner une liste vide
    return JSON.parse(sessionStorage.getItem('matchList')) || [];
}

// Fonction pour sauvegarder la liste de joueurs dans sessionStorage
function savePlayersListToSessionStorage(playersList) {
    // Convertir la liste de joueurs en chaîne JSON et la sauvegarder dans sessionStorage
    sessionStorage.setItem('matchList', JSON.stringify(playersList));
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
    var joueursListe = JSON.parse(sessionStorage.getItem('matchList')) || [];

    // Affiche chaque joueur dans la liste des joueurs
    joueursListe.forEach(function (joueur, index) {
        var joueurDiv = document.createElement("div");
        joueurDiv.innerHTML = "<strong><u>Match " + (index + 1) + "</u></strong> (" + joueur.date + ")<br>" +
            "<strong>" + joueur.joueur1.prenom + " " + joueur.joueur1.nom + "</strong> (" + joueur.joueur1.nationalite + ")<br>" +
            "(" + joueur.joueur1.personnage + ", " + joueur.joueur1.manette + ")<br>" +
            "VS<br>" +
            "<strong>" + joueur.joueur2.prenom + " " + joueur.joueur2.nom + "</strong> (" + joueur.joueur2.nationalite + ")<br>" +
            "(" + joueur.joueur2.personnage + ", " + joueur.joueur2.manette + ")<br>" +
            "commenté par " + joueur.commentateur.prenom + " " + joueur.commentateur.nom + "<br><br>"
        listeJoueurs.appendChild(joueurDiv);
    });
}

// Appeler la fonction pour peupler les selects lors du chargement de la page
afficherJoueurs();
