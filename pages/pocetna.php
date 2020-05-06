<?php //ovo ce kasnije gore
require_once "../utils/db.php";
require_once "../utils/cookie.php";
require_once "../utils/iputils.php";

$conn = PoveziSeSaBazom();
if (!nadjeni($conn)) {
    echo "ne radi";
    $conn->close();
    postaviHeader("pages/loginpage.php");
}
$conn->close();
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="CSS/style.css">
        <style>
            body {
                background-image: url("media/slike/pocetnapozadina.jpg");
                background-size: 100% 100%;
            }
        </style>
    </head>

    <body>
        <div class="header">
            <div class="pomeridesno">
            <p><?php echo "Korisnik: ".$_COOKIE['korisnicko_ime'] ?></p>
            </div>
        </div>
        <div class="centriraj">
            <table>
                <tr>
                    <td><img src="media/slike/yugilogo.png" alt="slika yugioh" width="954" height="386"> </td>
                </tr>
                <tr>
                    <td>
                        <div class="Pomeridugmice"><a href="izborigre.php" class="button1" style="font-size:3em">&nbsp &nbsp &nbsp &nbsp Igraj &nbsp &nbsp &nbsp &nbsp </a></div>
                    </td>
                </tr>
                <tr>
                    <td><a href="nesto" class="button1" style="font-size:2em">Napravi dek</a></td>
                </tr>
                <tr>
                    <td><a href="nesto" class="button1" style="font-size:2em">Opcije</a></td>
                </tr>
                <tr>
                    <td><a href="../control/logout.php" class="button1" style="font-size:2em">Izloguj se</a></td>
                </tr>
            </table>
        </div>
    </body>
</html>