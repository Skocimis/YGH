<?php
require_once "../utils/db.php";
require_once "../utils/cookie.php";
require_once "../utils/iputils.php";

$conn = PoveziSeSaBazom();
if (nadjeni($conn)) {
    $conn->close();
    postaviHeader("pages/pocetna.php");
}
$conn->close();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="UTF-8">
        <link rel="stylesheet" href="CSS/loginstyle.css">
    </head>

    <body>

        <video autoplay muted loop id="myVideo">
            <source src="media/videja/PozadinaLogin2.mp4" type="video/mp4">
            Ne moze da ucita sliku.
        </video>
        <div class="popravi">
            <img src="media/slike/yugilogo.png" alt="greska" class="centrirajsliku">

            <div class="centriraj">
                <fieldset>
                    <h2>Registar</h2>
                    <p>-U slučaju da još nemate svoj nalog idite na registar gde ćete napraviti nalog.</p>
                    <p>-Pravljenje naloga je besplatno i lako, dugmetom nazad možete prekinuti taj proces bilo kada.</p>
                    <p>-Da bi ste napravili nalog potrebno je da imate gmail atresu.</p>
                    <a href="?option=login">
                    <button onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Ulogij se</button></a>
                    <a href="?option=register">
                    <button onclick="document.getElementById('id02').style.display='block'" style="width:auto;">Registruj se</button> </a>   
                </fieldset>
            </div>
        </div>
        <?php
        if (isset($_GET["option"])) {
            $opcija = $_GET["option"];
            if ($opcija == "login") {
                echo
                "<div id=\"id01\" class=\"modal\">
                    <form class=\"modal-content animate\" action=\"/YGH/control/login.php\" method=\"post\">
                        <div class=\"imgcontainer\">
                        <a href = \"?\">
                            <span onclick=\"document.getElementById('id01').style.display='none'\" class=\"close\" title=\"Close Modal\">&times;</span></a>
                        </div>
        
                        <div class=\"container\">
                            <label for=\"uname\"><b>Porisničko ime</b></label>
                            <input type=\"text\" placeholder=\"Enter Username\" name=\"korisnicko_ime\" required>
            
                            <label for=\"psw\"><b>Šifra</b></label>
                            <input type=\"password\" placeholder=\"Enter Password\" name=\"lozinka\" required>
            
                            <button type=\"submit\">Uloguj se</button>
                            <label>
                                <input type=\"checkbox\" checked=\"checked\" name=\"mejl\"> Upamti me
                            </label>
                        </div>
                        <div class=\"container\" style=\"background-color:#f1f1f1\">
                            <a href = \"?\">
                            <button type=\"button\" onclick=\"document.getElementById('id01').style.display='none'\" class=\"cancelbtn\">Odustani</button></a>
                            <span class=\"psw\">Resetuj <a href=\"#\">šifru</a></span>
                        </div>
                    </form>
                </div>";
            }
            else if ($opcija == "register") {
                echo
                "<div id=\"id02\" class=\"modal\">
                    <form class=\"modal-content animate\" action=\"/YGH/control/register.php\" method=\"post\">
                        <div class=\"imgcontainer\">
                        <a href = \"?\">
                            <span onclick=\"document.getElementById('id02').style.display='none'\" class=\"close\" title=\"Close Modal\">&times;</span></a>
                        </div><>
            
                        <div class=\"container\">
                            <label for=\"uname\"><b>Korisnočko ime</b></label>
                            <input type=\"text\" placeholder=\"Enter Username\" name=\"korisnicko_ime\" required>
            
                            <label for=\"gmail\"><b>Gmail</b></label>
                            <input type=\"text\" placeholder=\"Enter Username\" name=\"mejl\" required>
            
                            <label for=\"psw\"><b>Šifra</b></label>
                            <input type=\"password\" placeholder=\"Enter Password\" name=\"lozinka\" required>
            
                            <label for=\"rippsw\"><b>Ponovi šifru</b></label>
                            <input type=\"password\" placeholder=\"Enter Password\" name=\"rippsw\" required>
            
                            <button type=\"submit\">Registruj se</button>
                        </div>
                        <div class=\"container\" style=\"background-color:#f1f1f1\">
                        <a href = \"?\">
                            <button type=\"button\" onclick=\"document.getElementById('id02').style.display='none'\" class=\"cancelbtn\">Odustani</button></a>
                        </div>
                    </form>
                </div>";
            }
        }
        ?>
        
        <script>
            var modal = document.getElementById('id01');

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        </script>
    </body>
</html>