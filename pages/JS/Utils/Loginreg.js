$('#regforma').submit(function(e) {
    e.preventDefault();
    var podaci = $('#regforma').serialize();
    var korisnicko_ime = findParameter("korisnicko_ime", podaci);
    var mejl = findParameter("mejl", podaci);
    var lozinka = findParameter("lozinka", podaci);
    var lozinka2 = findParameter("lozinka2", podaci);


    const mailregex = new RegExp("\\b[\\w.!$%&*'+\\/=?^`{|}~-]+@[\\w-]+(?:\\.[w-]+)*\\b");
    const lozinkaregex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (!mailregex.test(mejl)) {
        document.getElementById('poruka02').innerHTML = "Uneli ste nevazecu mejl";
        return false;
    }
    if (!lozinkaregex.test(lozinka)) {
        document.getElementById("poruka02").innerHTML = "Niste uneli vazecu lozinku. Lozinka mora da...";
        return false;
    }
    if (lozinka != lozinka2) {
        document.getElementById('poruka02').innerHTML = "Lozinke se ne poklapaju. ";
        return false;
    }
    var salt = generisisalt(100);
    var hesovana = SHA256.hash(lozinka + salt);
    post("../control/register.php", { korisnicko_ime: korisnicko_ime, mejl: mejl, lozinka: hesovana, salt: salt }, "post");
    return false;
});
/*Lozinka treba da ima bar 8 karaktera u sebi. Treba da sadrzi 1 veliko slovo i 1 broj. */
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