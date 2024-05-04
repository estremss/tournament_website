function Deconnexion() {
    var confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");

    if (confirmation) {
        sessionStorage.setItem('connected', false);
        return true;
    }

    return false;
}

document.addEventListener("DOMContentLoaded", function() {
    // Récupérer la valeur de loggedIn dans le sessionStorage
    var loggedIn = sessionStorage.getItem('connected') || 'false';

    // Sélectionner les éléments à activer ou désactiver
    var connexion = document.getElementById('connexion');
    var deconnexion = document.getElementById('deconnexion');

    // Vérifier si l'utilisateur est connecté
    if (loggedIn === 'true') {
        // Activer #login-header et désactiver #logout-header
        connexion.style.display = 'none';
        deconnexion.style.display = 'inline';
    } else {
        // Désactiver #login-header et activer #logout-header
        connexion.style.display = 'inline';
        deconnexion.style.display = 'none';
    }
});