<?php
require_once "utils/db.php";
require_once "utils/cookie.php";

if(nadjeni($conn)) {
    header("LOCATION: http://localhost/YGH/pages/pocetna.php");
}
else {
    header("LOCATION: http://localhost/YGH/pages/loginpage.php");
}
?>