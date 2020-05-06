<?php
    require_once "../utils/db.php";
    if (isset($_POST["korisnicko_ime"]) && isset($_POST["lozinka"])) {
        //Lose ali radi, za sada te samo vrati na ceo register
        $korisnicko_ime = $_POST["korisnicko_ime"];
        $lozinka = $_POST["lozinka"];
        setcookie ( "korisnicko_ime", $korisnicko_ime, time()+3600*24*10, "/", "localhost");
        setcookie ( "lozinka", $lozinka, time()+3600*24*10, "/", "localhost");
        header("LOCATION: http://localhost/YGH/pages/pocetna.php");


        /*$sql = "INSERT INTO korisnici (korisnicko_ime, mejl, lozinka)
            VALUES ('$korisnicko_ime', '$mejl', '$lozinka')";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        }
        else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
        echo "poslati podaci";*/
    }
    else {
        header("LOCATION: http://localhost/YGH/pages/loginpage.php");
    }
?>