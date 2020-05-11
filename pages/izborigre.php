<?php //ovo ce kasnije gore
require_once "../utils/db.php";
require_once "../utils/cookie.php";
require_once "../utils/iputils.php";

$conn = PoveziSeSaBazom();
if (!nadjeni($conn)) {
    echo "ne radi";
    $conn->close();
    postaviHeader("pages/loginpage.php?option=login&poruka=Netačni podaci!");
}

$conn->close();
?>
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="CSS/style.css">
    <style>
        html {

            width: 100%;
            height: 100%;
        }

        body {
            background-image: url("media/slike/crnadevojka.jpg");
            background-size: 100% 100%;
        }

        .pomocna {
            margin-left: 35%;
        }
    </style>
</head>

<body>
    <script src="JS/Biblioteke/jquery-3.5.1.min.js"></script>
    <script src="JS/Biblioteke/Cookies.js"></script>
    <div class="header">
        <div class="pomeridesno">
            <p id="korisnickoime">Niste prijavljeni</p>
            <script>
                var korisnickoimep = document.getElementById("korisnickoime");
                korisnickoimep.innerHTML = "Korisnik: " + getCookie("korisnicko_ime");
            </script>
        </div>
    </div>

    <div class="centriraj2">
        <div class="pomocna">
            <img src="media/slike/yugilogo.png" alt="slika yugioh" width="636" height="257">
        </div>
        <div class="pomeriudesno">
            <br>
            <select name="trenutni_dek" id="izbor_deka">

            </select>
            <br>
            <div class="Pomeridugmice"><a id="linkzaprotivbota" href="protivbota.php" class="button1" style="font-size:3em">&nbsp &nbsp &nbsp &nbsp PvPC &nbsp &nbsp &nbsp &nbsp</a></div>
            <br>
            <td><a href="nesto" class="button1" style="font-size:3em">&nbsp &nbsp &nbsp &nbsp PvP &nbsp &nbsp &nbsp &nbsp </a></td>
            <br>
            <td><a href="pocetna.php" class="button1" style="font-size:2.5em">&nbsp &nbsp &nbsp Nazad &nbsp &nbsp &nbsp </a></td>
        </div>
    </div>
    <script>
        var vid_korisnika;
        var v_dekovi, postParams;

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        function loadUserDecks() {
            $.post('../control/getdecks.php', {
                    id_korisnika: vid_korisnika
                },
                function(returnedData) {
                    //alert(returnedData);
                    var selekt = document.getElementById("izbor_deka");
                    selekt.onchange = function(e) {
                        var x = document.getElementById("izbor_deka").value;
                        if (x > -1) {
                            postParams = v_dekovi[x].id_deka;
                            var aa = document.getElementById("linkzaprotivbota");
                            aa.href = "protivbota.php?dek=" + postParams;
                            //console.log(postParams);
                        }

                    };
                    v_dekovi = JSON.parse(returnedData);
                    var val = 0;
                    if (v_dekovi.length > 0) {
                        postParams = v_dekovi[0].id_deka;
                        var aa = document.getElementById("linkzaprotivbota");
                        aa.href = "protivbota.php?dek=" + postParams;
                    }
                    v_dekovi.forEach(element => {
                        var chld = new Option(element.naziv, val);
                        selekt.appendChild(chld);
                        val++;
                        //prikaziRed(element.naziv);
                    });
                });
        }

        function loadUserData() {
            var vkorisnicko_ime = getCookie("korisnicko_ime");
            var vlozinka = getCookie("lozinka");
            $.post('../control/getuserinfo.php', {
                    korisnicko_ime: vkorisnicko_ime,
                    lozinka: vlozinka
                },
                function(returnedData) {
                    vid_korisnika = returnedData;
                    loadUserDecks(vid_korisnika);
                });
        }
        loadUserData();
    </script>
</body>

</html>