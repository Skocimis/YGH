<?php
require_once "utils/db.php";
require_once "utils/cookie.php";
require_once "utils/iputils.php";

$conn = PoveziSeSaBazom();

if (nadjeni($conn)) {
    postaviHeader("pages/pocetna.php");
} else {
    postaviHeader("pages/loginpage.php");
}
