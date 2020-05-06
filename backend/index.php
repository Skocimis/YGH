<?php
if (isset($_COOKIE['korisnicko_ime']) && isset($_COOKIE['lozinka'])) {
    $korisnicko_ime = $_COOKIE['korisnicko_ime'];
    $lozinka = $_COOKIE['lozinka'];

    $username = "root";
    $password = "";
    $db = "yugioh";
    $adr = "localhost";

    $tableName = "korisnici";

    $conn = new mysqli($adr, $username, $password, $db);

    if ($conn->connect_error) {
        die("Nije moguce povezati se na bazu");
    }

    $query = "SELECT korisnicko_ime, lozinka FROM " . $tableName;
    $result = $conn->query($query);
    echo "zdravo svete";
    if ($result->num_rows > 0) {                          // row["year"] = 4, row["class_index"] = 2, row["id] = 2, row["teacher_id"]
        while ($row = $result->fetch_assoc()) {
            if($korisnicko_ime==$row["korisnicko_ime"])
            {
                if($lozinka==$row["lozinka"])
                {
                    echo "Dobra lozinka";
                    //Usmeravanje na pocetnu ili nastavak rada stranice
                }
                else
                {
                    echo "Pogresna lozinka";
                    //USMERAVANJE NA LOGIN
                }
            }
            echo $row["korisnicko_ime"];
            echo "<br>";
        }
    } else {
        echo "Nema redova u tabeli.";
    }

    $conn->close();
}
else
{
    header("LOCATION: http://localhost/YGH/backend/loginpage.php");
}
?>