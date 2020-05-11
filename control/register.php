<?php
require_once "../utils/db.php";
require_once "../utils/iputils.php";

$conn = PoveziSeSaBazom();
if (isset($_POST["korisnicko_ime"]) && isset($_POST["lozinka"]) && isset($_POST["mejl"]) && isset($_POST["salt"])) {
    $korisnicko_ime = $conn->real_escape_string($_POST["korisnicko_ime"]);
    $lozinka = $conn->real_escape_string($_POST["lozinka"]);
    $salt = $conn->real_escape_string($_POST["salt"]);
    $mejl = $conn->real_escape_string($_POST["mejl"]);

    $sql = "INSERT INTO korisnici (korisnicko_ime, mejl, lozinka, salt)
                VALUES ('$korisnicko_ime', '$mejl', '$lozinka', '$salt')";

    if ($conn->query($sql) === TRUE) {
        $conn->close();
        setcookie("korisnicko_ime", $korisnicko_ime, time() + 3600 * 24 * 10, "/");
        setcookie("lozinka", $lozinka, time() + 3600 * 24 * 10, "/");
        $conn->close();
        postaviHeader("pages/pocetna.php");
    } else {
        postaviHeader("pages/loginpage.php?option=register&poruka=Već je registrovan nalog sa datim mejlom ili korisničkim imenom");
    }
} else {
    postaviHeader("pages/loginpage.php?option=register");
}
