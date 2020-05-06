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
                    $conn->close();
                    exit();
                }
                else
                {
                    echo "Pogresna lozinka. ";
                    //Nastavak na stranicu
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
?>
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    <link rel="stylesheet" href="loginstyle.css">
</head>

<body>

    <video autoplay muted loop id="myVideo">
        <source src="PozadinaLogin2.mp4" type="video/mp4">
        Ne moze da ucita sliku.
    </video>
    <div class="popravi">
        <img src="yugilogo.png" alt="greska" class="centrirajsliku">

        <div class="centriraj">
            <fieldset>
                <h2>Registar</h2>
                <p>-U slučaju da još nemate svoj nalog idite na registar gde ćete napraviti nalog.</p>
                <p>-Pravljenje naloga je besplatno i lako, dugmetom nazad možete prekinuti taj proces bilo kada.</p>
                <p>-Da bi ste napravili nalog potrebno je da imate gmail atresu.</p>
                <button onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Ulogij
                    se</button>
                <button onclick="document.getElementById('id02').style.display='block'" style="width:auto;">Registruj
                    se</button>
        </div>
    </div>
    </fieldset>
    <div id="id01" class="modal">

        <form class="modal-content animate" action="/login.php" method="post">
            <div class="imgcontainer">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
            </div>

            <div class="container">
                <label for="uname"><b>Porisničko ime</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required>

                <label for="psw"><b>Šifra</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required>

                <button type="submit">Uloguj se</button>
                <label>
                    <input type="checkbox" checked="checked" name="remember"> Upamti me
                </label>
            </div>
            <div class="container" style="background-color:#f1f1f1">
                <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Odustani</button>
                <span class="psw">Resetuj <a href="#">šifru</a></span>
            </div>
        </form>
    </div>

    <div id="id02" class="modal">

        <form class="modal-content animate" action="/login.php" method="post">
            <div class="imgcontainer">
                <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">&times;</span>
            </div>

            <div class="container">
                <label for="uname"><b>Korisnočko ime</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required>

                <label for="gmail"><b>Gmail</b></label>
                <input type="text" placeholder="Enter Username" name="gmail" required>

                <label for="psw"><b>Šifra</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required>

                <label for="rippsw"><b>Ponovi šifru</b></label>
                <input type="password" placeholder="Enter Password" name="rippsw" required>

                <button type="submit">Registruj se</button>
            </div>
            <div class="container" style="background-color:#f1f1f1">
                <button type="button" onclick="document.getElementById('id02').style.display='none'" class="cancelbtn">Odustani</button>
            </div>
        </form>
    </div>

    <script>
        var modal = document.getElementById('id01');

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    </script>

</body>

</html>