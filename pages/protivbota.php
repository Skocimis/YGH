<?php
require_once "../utils/db.php";
require_once "../utils/cookie.php";
require_once "../utils/iputils.php";

$conn = PoveziSeSaBazom();
if (!nadjeni($conn)) {
    $conn->close();
    postaviHeader("pages/loginpage.php?option=login&poruka=Netačni podaci!");
}
$conn->close();
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="CSS/style.css">
    <title>YUGIOH</title>
    <style>
        html {

            width: 100%;
            height: 100%;
        }

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

        #dizajnzapobedu {
            width: 100%;
            padding: 50px 0;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.5);
            top: 50%;
            left: 0;
            display: none;
            position: fixed;
        }

        #dizajnzaporaz {
            width: 100%;
            padding: 50px 0;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.5);
            top: 40%;
            left: 0;
            display: none;
            position: fixed;
        }

        .Pomeridugmice2 {
            margin-top: 3%;
        }
    </style>
</head>

<body>
    <script src="JS/Biblioteke/Cookies.js"></script>
    <script src="JS/Biblioteke/HTTP.js"></script>
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
    <div id="dizajnzapobedu">

        <img src="media/slike/yugilogo.png" alt="slika yugioh" width="424" height="171">
        <br>
        <div class="Pomeridugmice2">
            <a href="izborigre.php" class="button1" style="font-size:1.5em">&nbsp &nbsp &nbsp Pobedaaaaa! &nbsp &nbsp &nbsp </a>
        </div>
    </div>
    <div id="dizajnzaporaz">

        <img src="media/slike/yugilogo.png" alt="slika yugioh" width="424" height="171">
        <br>
        <div class="Pomeridugmice2">
            <a href="izborigre.php" class="button1" style="font-size:1.5em">&nbsp &nbsp &nbsp Jooooooj ne &nbsp &nbsp &nbsp </a>
        </div>
    </div>
    <pre id="Debugger">Debug komande:</pre>
    <script src="JS/Biblioteke/jquery-3.5.1.min.js"></script>
    <script>
        var postParams = findGetParameter("dek");
        if (postParams == null || postParams == "") {
            postParams = -1;
        }
        postParams = parseInt(postParams);
    </script>
    <script type="application/javascript" src="JS/Igra/Deklaracije.js"></script>
    <script type="application/javascript" src="JS/Igra/Opcija.js"></script>
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