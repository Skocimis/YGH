<?php
    function nadjeni($conn) {
        if (isset($_COOKIE['korisnicko_ime']) && isset($_COOKIE['lozinka'])) {
            $korisnicko_ime = $conn->real_escape_string($_COOKIE['korisnicko_ime']);
            $lozinka = $conn->real_escape_string($_COOKIE['lozinka']);
        
            $query = "SELECT korisnicko_ime, lozinka FROM korisnici" ;
            $result = $conn->query($query);
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    if($korisnicko_ime==$row["korisnicko_ime"])
                    {
                        if($lozinka==$row["lozinka"])
                        {
                            //echo "Dobra lozinka";
                            return true;
                            //Usmeravanje na pocetnu ili nastavak rada stranice
                        }
                        else
                        {
                            //echo "Pogresna lozinka";
                            return false;
                            //USMERAVANJE NA LOGIN
                        }
                    }
                }
            } else {
                echo "Nema redova u tabeli.";
            }
        }
        return false;
    }
?>