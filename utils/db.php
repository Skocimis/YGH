<?php
    $username = "root";
    $password = "";
    $db = "yugioh";
    $adr = "localhost";

    $tableName = "korisnici";

    $conn = new mysqli($adr, $username, $password, $db);
    if ($conn->connect_error) {
        die("Drečun je presekao kabal.");
    }
?>