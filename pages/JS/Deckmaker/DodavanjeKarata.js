var cdek, csvekarte, deksvihkarata, red, kolona, indekspomeranja, indekspomeranja1, korisnickiDek, prekoracenje, csvsdek, kolona1, red1, svekarte, vid_korisnika, v_dekovi;
//deklasiranje
cdek = document.getElementById("KarteDeka");
csvsdek = cdek.getContext("2d");
csvekarte = document.getElementById("SveKarte");
csvsvekarte = csvekarte.getContext("2d");
korisnickiDek = [];
deksvihkarata = [];
indekspomeranja = 1000001;
indekspomeranja1 = 0;

function prikaziRed(a) {
    var konzola = document.getElementById("Debugger");
    konzola.innerHTML += "\n" + a;
}

function resetDebugLog() {
    var konzola = document.getElementById("Debugger");
    konzola.innerHTML = "Debug komande:";
}

function loadUserDecks() {
    $.post('../control/getdecks.php', { id_korisnika: vid_korisnika },
        function (returnedData) {
            //alert(returnedData);
            var selekt = document.getElementById("izbor_deka");
            selekt.innerHTML = "<option value=\"-1\">Napravi novi dek</option>";
            selekt.onchange = function (e) {
                var x = document.getElementById("izbor_deka").value;
                if (x > -1) {
                    korisnickiDek = v_dekovi[x].karte_u_deku.split(" ").map(a => parseInt(a));
                    korisnickiDek.pop();
                }
                //indekspomeranja = 1000001;
                indekspomeranja1 = 0;

                render1();
            };
            v_dekovi = JSON.parse(returnedData);
            var val = 0;
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
    $.post('../control/getuserinfo.php', { korisnicko_ime: vkorisnicko_ime, lozinka: vlozinka },
        function (returnedData) {
            vid_korisnika = returnedData;
            loadUserDecks(vid_korisnika);
        });
}

function insertData() {
    var selekt = parseInt(document.getElementById("izbor_deka").value);
    //dobro su nazvane promenljive
    v_iddeka = selekt == -1 ? (null) : (v_dekovi[selekt].id_deka);
    var selekt = parseInt(document.getElementById("izbor_deka").value);
    vnaziv = document.getElementById("nazivtb").value;
    if (vnaziv == "") vnaziv = "Dek";
    var vkarte = "";
    korisnickiDek.forEach(element => {
        vkarte += element + " ";
    });
    var trenidDeka = null;
    var dekk = {
        id_deka: v_iddeka,
        id_korisnika: vid_korisnika,
        naziv: vnaziv,
        karte_u_deku: vkarte
    };
    $.ajax({
        type: 'post',
        url: '../control/postdeck.php',
        data: JSON.stringify(dekk),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {
            prikaziRed(data);

            loadUserData();
        }
    });
}

kolona1 = 0;
red1 = 0;
kolona = 0;
red = 0;
loadUserData();
loadCards();

setTimeout(render, 500);

handleEvents();