document.getElementById("boutonCommencer").addEventListener("click", function () { location.href = "../pages/connexion.html"; });

function validateForm() {
    var username = document.getElementById("username").value;
    var userInput = document.getElementById('captchaInput').value.toLowerCase();
    var monExprRegLetter = /^[A-Za-z]+$/

    if (!username.match(monExprRegLetter)) {
        document.getElementById("usernameError").innerHTML = "Le nom d'utilisateur doit contenir uniquement des lettres.";
        return false;
    } else {
        document.getElementById("usernameError").innerHTML = "";
    }

    if (userInput != 'smwm') {
        alert('Captcha incorrect. Veuillez réessayer.');
        return false
    }
    else {
        document.getElementById("usernameError").innerHTML = "";
    }
}