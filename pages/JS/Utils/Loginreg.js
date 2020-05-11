$('#regforma').submit(function(e) {
    e.preventDefault();
    var podaci = $('#regforma').serialize();
    var korisnicko_ime = findParameter("korisnicko_ime", podaci);
    var mejl = findParameter("mejl", podaci);
    var lozinka = findParameter("lozinka", podaci);
    var lozinka2 = findParameter("lozinka2", podaci);


    const mailregex = new RegExp("\\b[\\w.!$%&*'+\\/=?^`{|}~-]+@[\\w-]+(?:\\.[w-]+)*\\b");

    const velikoslovo = new RegExp("(?=.*[A-Z])");
    const maloslovo = new RegExp("(?=.*[a-z])");
    const broj = new RegExp("(?=.*[0-9])");
    const duzinalozinke = new RegExp("(?=.{8,})");
    const special = new RegExp("(?=.*[!@#$%^&*[\\]()<>.,?;:'\"\\\\`~])");

    if (!mailregex.test(mejl)) {
        document.getElementById('poruka02').innerHTML = "Uneli ste nevazecu mejl";
        return false;
    }
    //pocetak provere lozinke


    if (!maloslovo.test(lozinka)) {
        document.getElementById("poruka02").innerHTML = "Lozinka treba da sadrži bar jedno malo slovo.";
        return false;
    }

    if (!velikoslovo.test(lozinka)) {
        document.getElementById("poruka02").innerHTML = "Lozinka treba da sadrži bar jedno veliko slovo.";
        return false;
    }
    if (!broj.test(lozinka)) {
        document.getElementById("poruka02").innerHTML = "Lozinka treba da sadrži bar jedan broj.";
        return false;
    }
    if (!duzinalozinke.test(lozinka)) {
        document.getElementById("poruka02").innerHTML = "Lozinka je prekratka.";
        return false;
    }
    if (!special.test(lozinka)) {
        document.getElementById("poruka02").innerHTML = "Lozinka mora da sadrži jedan od karaktera(*, !, @, #, $, %, ^, &,...)";
        return false;
    }
    //kraj
    if (lozinka != lozinka2) {
        document.getElementById('poruka02').innerHTML = "Lozinke se ne poklapaju. ";
        return false;
    }

    var salt = generisisalt(100);
    var hesovana = SHA256.hash(lozinka + salt);
    post("../control/register.php", { korisnicko_ime: korisnicko_ime, mejl: mejl, lozinka: hesovana, salt: salt }, "post");
    return false;
});

$('#logforma').submit(function(e) {
    e.preventDefault();
    var podaci = $('#logforma').serialize();
    var korisnicko_ime = findParameter("korisnicko_ime", podaci);
    var lozinka = findParameter("lozinka", podaci);
    $.post('../control/getuserinfo.php', {
            korisnicko_ime: korisnicko_ime
        },
        function(returnedData) {

            var salt = returnedData; //uzimanje iz baze
            var hesovana = SHA256.hash(lozinka + salt);
            post("../control/login.php", { korisnicko_ime: korisnicko_ime, lozinka: hesovana }, "post");
            return false;
        });

});