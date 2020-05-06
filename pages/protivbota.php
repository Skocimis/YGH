<?php
require_once "../utils/db.php";
require_once "../utils/cookie.php";

if(!nadjeni($conn)) {
    header("LOCATION: http://localhost/YGH/pages/loginpage.php");
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset = "utf-8" />
        <title>YUGIOH</title>
    </head>

    <body>
        <table>
            <tr>
                <td>
                    <canvas id="platno" width="800" height="600"></canvas>
                </td>
                <td>
                    <img src="Slike/Karte/pozadina.png" id="velikakarta" alt="Greska">
                </td>
            </tr>
        </table>
        <pre id = "Debugger">Debug komande:</pre>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="Igra/Deklaracije.js"></script>
        <script src="Igra/Opcija.js"></script>
        <script src="Igra/PopUp.js"></script>
        <script src="Model/Karta.js"></script>
        <script src="Model/Dek.js"></script>
        <script src="Model/InstancaKarte.js"></script>
        <script src="Model/SkupKarata.js"></script>
        <script src="Igra/Initialize.js"></script>
        <script src="Igra/Update.js"></script>
        <script src="Igra/Render.js"></script>
        <script src="Igra/HandleEvents.js"></script>
        <script src="Igra/TokIgre.js"></script>
        <script src="Igra/FilterZaSelekciju.js"></script>
        <script src="Igra.js"></script>
    </body>
</html>