<?php
require_once "../utils/db.php";
require_once "../utils/cookie.php";
require_once "../utils/iputils.php";

$conn = PoveziSeSaBazom();
if (!nadjeni($conn)) {
    $conn->close();
    postaviHeader("pages/loginpage.php");
}
$conn->close();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>YUGIOH</title>
        <style>
            body {
                background-image: url("https://cdn.discordapp.com/attachments/707582164354727950/708021884603596901/ljubicastapozadina.jpg");
                background-size: 100% 100%;
            }

            .centriraj {
                margin-left: 20%;
                margin-top: 2%;
            }

            .centrirajlogo {
                top: 0;
                text-align: center;
            }
        </style>
    </head>

    <body>
        <div class="centrirajlogo">

            <img src="media/slike/yugilogo.png" alt="slika yugioh" width="424" height="171">

            <div class="centriraj">
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
            </div>
        </div>
        <pre id="Debugger">Debug komande:</pre>
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