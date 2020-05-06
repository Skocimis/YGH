<?php
require_once "utils/db.php";
require_once "utils/cookie.php";

if(nadjeni($conn)) {
    header("LOCATION: http://178.222.115.22:25565/YGH/pages/pocetna.php");
}
else {
    header("LOCATION: http://178.222.115.22:25565/YGH/pages/loginpage.php");
}
?>