function validateForm() {
    var username = document.getElementById("username").value;
    var userInput = document.getElementById('captchaInput').value.toLowerCase();
    var monExprRegLetter = /^[A-Za-z]+$/;

    if (!username.match(monExprRegLetter)) {
        document.getElementById("usernameError").innerHTML = "N'utilisez que des lettres.";
        setTimeout(function () {
            document.getElementById("usernameError").innerHTML = "";
        }, 3000);
        return false;
    }

    if (userInput !== 'smwm') {
        var errorMessage = 'Captcha incorrect';
        document.getElementById("captchaError").innerHTML = errorMessage;
        setTimeout(function () {
            document.getElementById("captchaError").innerHTML = "";
        }, 3000);
        return false;
    }

    window.location.href = "../pages/menu.html";
    return false;
}

function Redirection() {
    location.href = "../pages/connexion.html";
}

function Deconnexion() {
        // event.preventDefault();

        var confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");

        if (confirmation) {
            //window.location.href = deconnexionLink.href;
            return true;
        }

        return false;
    }