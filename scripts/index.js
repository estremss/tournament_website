function Redirection() {
    var loggedIn = sessionStorage.getItem('connected') || 'false';

    if(loggedIn === 'false'){
        window.location.href = "connexion.html";
    } else{
        window.location.href = "menu.html";
    }
}