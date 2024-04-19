document.getElementById("boutonCommencer").addEventListener("click", function () { location.href = "../pages/connexion.html"; });

function validateForm() {
    var username = document.getElementById("username").value;
    var userInput = document.getElementById('captchaInput').value.toLowerCase();
    var monExprRegLetter = /^[A-Za-z]+$/

    if (!username.match(monExprRegLetter)) {
        document.getElementById("usernameError").innerHTML = "N'utilisez que des lettres.";
        setTimeout(function() {
            document.getElementById("usernameError").innerHTML = "";
        }, 2000);
        return false;
    }

    if (userInput !== 'smwm') {
        var errorMessage = 'Captcha incorrect';
        document.getElementById("captchaError").innerHTML = errorMessage;
        setTimeout(function() {
            document.getElementById("captchaError").innerHTML = "";
        }, 2000);
        return false;
    }
}
