<?php //ovo ce kasnije gore
require_once "../utils/db.php";
require_once "../utils/cookie.php";
require_once "../utils/iputils.php";

$conn = PoveziSeSaBazom();
if (!nadjeni($conn)) {
    echo "ne radi";
    $conn->close();
    postaviHeader("pages/loginpage.php?option=login&poruka=Netačni podaci!");
}
$conn->close();
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="CSS/style.css">
    <style>
        html {

            width: 100%;
            height: 100%;
        }

        body {
            background-image: url("media/slike/crnadevojka.jpg");
            background-size: 100% 100%;
        }

        .centriraj {
            margin-left: 25%;

        }

        .centrirajdole {
            margin-top: 7%;
        }
    </style>
</head>

<body>
    <script src="JS/Biblioteke/Cookies.js"></script>
    <div class="header">
        <div class="pomeridesno">
            <p id="korisnickoime">Niste prijavljeni</p>
            <script>
                var korisnickoimep = document.getElementById("korisnickoime");
                korisnickoimep.innerHTML = "Korisnik: " + getCookie("korisnicko_ime");
            </script>
        </div>
    </div>
    <div class="centriraj">
        <img src="media/slike/yugilogo.png" alt="slika yugioh" width="954" height="386">

        <div class="centrirajdole">
            <a href="pocetna.php" class="button1" style="font-size:3em">&nbsp &nbsp &nbsp &nbsp Projekat radili: &nbsp &nbsp &nbsp &nbsp <br>
                &nbsp &nbsp &nbsp &nbsp Bogdan Tomic &nbsp &nbsp &nbsp &nbsp<br>&nbsp &nbsp &nbsp &nbsp Aleksandar Spremo &nbsp &nbsp &nbsp &nbsp<br>
                &nbsp &nbsp &nbsp &nbsp Aleksa Buncic &nbsp &nbsp &nbsp &nbsp<br>&nbsp &nbsp &nbsp &nbsp Andrija Colakovic &nbsp &nbsp &nbsp &nbsp </a>
        </div>
        </table>
    </div>
</body>

</html>