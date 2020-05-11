<?php
require_once "../utils/db.php";

$conn = PoveziSeSaBazom();
if (isset($_POST["korisnicko_ime"]) && isset($_POST["lozinka"])) {
    $korisnicko_ime = $conn->real_escape_string($_POST['korisnicko_ime']);
    $lozinka = $conn->real_escape_string($_POST['lozinka']);

    $query = "SELECT id_korisnika, korisnicko_ime, lozinka, salt FROM korisnici";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            if ($korisnicko_ime == $row["korisnicko_ime"]) {
                if ($lozinka == $row["lozinka"]) {
                    echo $row["id_korisnika"];
                } else {
                    echo "";
                }
            }
        }
        echo "";
    }
} else if (isset($_POST["korisnicko_ime"])) { {
        $korisnicko_ime = $conn->real_escape_string($_POST['korisnicko_ime']);

        $query = "SELECT korisnicko_ime, salt FROM korisnici WHERE korisnicko_ime='$korisnicko_ime'";
        $result = $conn->query($query);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                if ($korisnicko_ime == $row["korisnicko_ime"]) {
                    echo $row["salt"];
                } else {
                    echo "";
                }
            }
            echo "";
        }
    }
}
