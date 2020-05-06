<?php //ovo ce kasnije gore
require_once "../utils/db.php";
require_once "../utils/cookie.php";

if (!nadjeni($conn)) {
    echo "ne radi";
    header("LOCATION: http://localhost/YGH/pages/loginpage.php");
}
?>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="CSS/style.css">
        <style>
            body {
            background-image: url("media/slike/crnadevojka.jpg" );
            background-size: 100%;
        }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="pomeridesno"><p>Naziv</p></div>
        </div>
        <div class="centriraj2">
            <td><img src="media/slike/yugilogo.png" alt="slika yugioh" width="954" height="386">
            <div class="pomeriudesno">
                <table>
                    <tr>
                        <td><div class="Pomeridugmice"><a href="nesto" class="button1" style="font-size:3.5em">&nbsp &nbsp &nbsp &nbsp PvPC &nbsp &nbsp &nbsp &nbsp </td></div>
                        </tr><td><a href="nesto" class="button1" style="font-size:3.5em">&nbsp &nbsp &nbsp &nbsp PvP &nbsp &nbsp &nbsp &nbsp </a></td></tr>
                    <tr><td><a href="pocetna.php" class="button1" style="font-size:3em">&nbsp &nbsp &nbsp Nazad &nbsp &nbsp &nbsp </a></td></tr>
                </table>
            </div>
        </div>
    </body>
</html>