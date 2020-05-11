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
            margin-left: 20%;
        }

        .centrirajlogo {
            top: 0;
            text-align: center;
        }
    </style>
</head>

<body>
    <script src="JS/Biblioteke/Cookies.js"></script>
    <div class="centriraj">
        <table>
            <td>
                <canvas id="KarteDeka" width="500" height="500" style="border:1px solid #000000;">
                </canvas></td>
            <td><canvas id="SveKarte" width="500" height="500" style="border:1px solid #000000;">

                </canvas></td>
            <td>
                <img src="JS/Slike/Karte/1000001.png" id="velikakarta" alt="Greska">
            </td>
        </table>
    </div>
    </div>
    <script src="JS/Biblioteke/jquery-3.5.1.min.js"></script>
    <script src="JS/Model/Karta.js"></script>
    <script src="JS/Model/Dek.js"></script>
    <script src="JS/Deckmaker/Heandleevent.js"></script>
    <script src="JS/Deckmaker/renderzasvekarte.js"></script>
    <script src="JS/Deckmaker/PrebacivanjeK.js"></script>
    <script src="JS/Deckmaker/DodavanjeKarata.js"></script>
    <div class="centriraj">
        <table>
            <td><a href="#" class="button1" onclick="dole1()">\/</a>
                <a href="#" class="button1" onclick="gore1()">/\</a></td>
            <td>
                <p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                    &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                    &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                </p>
            </td>
            <td>
                <p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                    &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp </p>
            <td><a href="#" class="button1" onclick="dole()">\/</a>
                <a href="#" class="button1" onclick="gore()">/\</a></td>
        </table>
        <form>
            <input type="text" id="nazivtb" name="naziv">
            <select name="trenutni_dek" id="izbor_deka">

            </select>
            <a href="#" class="button1" onclick="insertData()">Sacuvaj Dek</a>
        </form>
        <a href="pocetna.php" class="button1" style="font-size:1.5em">&nbsp &nbsp &nbsp Nazad &nbsp &nbsp &nbsp </a>
        <pre id="Debugger"></pre>
    </div>
</body>

</html>