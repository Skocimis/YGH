<?php
    require_once "../utils/db.php";
    require_once "../utils/iputils.php";
    $conn = PoveziSeSaBazom();
    if (isset($_POST["korisnicko_ime"]) && isset($_POST["lozinka"]) && isset($_POST["mejl"])) {
        $korisnicko_ime = $conn->real_escape_string($_POST["korisnicko_ime"]);
        $lozinka = $conn->real_escape_string($_POST["lozinka"]);
        $mejl = $conn->real_escape_string($_POST["mejl"]);

        $sql = "INSERT INTO korisnici (korisnicko_ime, mejl, lozinka)
                VALUES ('$korisnicko_ime', '$mejl', '$lozinka')";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
        setcookie("korisnicko_ime", $korisnicko_ime, time() + 3600 * 24 * 10, "/");
        setcookie("lozinka", $lozinka, time() + 3600 * 24 * 10, "/");
        $conn->close();
        postaviHeader("pages/pocetna.php");
    } else {
        $conn->close();
        postaviHeader("pages/loginpage.php");
    }
?>