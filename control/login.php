<?php
    require_once "../utils/iputils.php";

    if (isset($_POST["korisnicko_ime"]) && isset($_POST["lozinka"])) {
        //Lose ali radi, za sada te samo vrati na ceo register
        $korisnicko_ime = $_POST["korisnicko_ime"];
        $lozinka = $_POST["lozinka"];
        setcookie ( "korisnicko_ime", $korisnicko_ime, time()+3600*24*10, "/");
        setcookie ( "lozinka", $lozinka, time()+3600*24*10, "/");
        postaviHeader("pages/pocetna.php");
    }
    else {
        postaviHeader("pages/loginpage.php?option=login&poruka=Unesite korisničko ime i lozinku!");
    }
?>