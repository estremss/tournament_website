function Deconnexion() {
    var confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");

    if (confirmation) {
        return true;
    }

    return false;
}