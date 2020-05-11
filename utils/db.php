<?php
function PoveziSeSaBazom()
{
    $username = "root";
    $password = "";
    $db = "yugioh";
    $adr = "localhost";

    $conn = new mysqli($adr, $username, $password, $db);
    if ($conn->connect_error) {
        die("Drečun je presekao kabal.");
    }
    return $conn;
}
