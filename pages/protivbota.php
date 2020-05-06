<?php
require_once "../utils/db.php";
require_once "../utils/cookie.php";
require_once "../utils/iputils.php";

$conn = PoveziSeSaBazom();
if(!nadjeni($conn)) {
    $conn->close();
    postaviHeader("pages/loginpage.php");
}
$conn->close();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset = "utf-8" />
        <title>YUGIOH</title>
        <style>
          body {
            background-image: url("media/slike/crnadevojka.jpg");
            background-size: 100% 100%;
        }

        </style>
    </head>

    <body>
        <table>
            <tr>
                <td>
                    <canvas id="platno" width="800" height="600"></canvas>
                </td>
                <td>
                    <img src="JS/Slike/Karte/pozadina.png" id="velikakarta" alt="Greska">
                </td>
            </tr>
        </table>
        <pre id = "Debugger">Debug komande:</pre>
        <script type="application/javascript" src="JS/Igra/Deklaracije.js"></script>
        <script type="application/javascript" src="JS/Igra/Opcija.js"></script>
        <script type="application/javascript" src="JS/Igra/PopUp.js"></script>
        <script type="application/javascript" src="JS/Model/Karta.js"></script>
        <script type="application/javascript" src="JS/Model/Dek.js"></script>
        <script type="application/javascript" src="JS/Model/InstancaKarte.js"></script>
        <script type="application/javascript" src="JS/Model/SkupKarata.js"></script>
        <script type="application/javascript" src="JS/Igra/Initialize.js"></script>
        <script type="application/javascript" src="JS/Igra/Render.js"></script>
        <script type="application/javascript" src="JS/Igra/HandleEvents.js"></script>
        <script type="application/javascript" src="JS/Igra/TokIgre.js"></script>
        <script type="application/javascript" src="JS/Igra/FilterZaSelekciju.js"></script>
        <script type="application/javascript" src="JS/Igra.js"></script>
    </body>
</html>