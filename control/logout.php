<?php
require_once "../utils/iputils.php";

setcookie("korisnicko_ime", "", time(), "/");
setcookie("lozinka", "", time(), "/");
postaviHeader("pages/pocetna.php");
