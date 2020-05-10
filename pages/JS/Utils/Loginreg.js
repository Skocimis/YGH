function findParameter(parameterName, parameters) {
    var result = null,
        tmp = [];
    var items = parameters.split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function post(path, params, method = 'post') {
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function generisisalt(duzina) {
    var salt = "";
    for (var i = 0; i < duzina; i++) {
        salt += String.fromCharCode(Math.floor(Math.random() * 93) + 33);
    }
    return salt;
}






$('#regforma').submit(function(e) {
    e.preventDefault();
    var podaci = $('#regforma').serialize();
    var korisnicko_ime = findParameter("korisnicko_ime", podaci);
    var mejl = findParameter("mejl", podaci);
    var lozinka = findParameter("lozinka", podaci);
    var lozinka2 = findParameter("lozinka2", podaci);
    /*
        var jakalozinka = false;
        var jakalozinka2 = false;
        var dalijemail = false;

        //Provera lozinke
        if (lozinka != lozinka2) {
            document.getElementById('poruka02').innerHTML = "Lozinke se ne poklapaju";
            return false;
        }

        if (lozinka.length < 8) {
            document.getElementById('poruka02').innerHTML = "Lozinka je prekratka";
            return false;
        }

        for (var i = 0; i < lozinka.length; i++) {
            if (lozinka[i] == lozinka[i].toUpperCase())
                jakalozinka = true;
            else if (lozinka[i] == lozinka[i].toLowerCase())
                jakalozinka2 = true;
        }
        if (jakalozinka == false || jakalozinka2 == false) {
            document.getElementById('poruka02').innerHTML = "Lozinka mora da sadrzi veliko slovo ili broj";
            return false;
        }

        //Provera maila
        for (var i = 0; i < mejl.length; i++) {
            if (mejl[i] == '@') {
                dalijemail = true;
            }
        }*/
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

    /*if (dalijemail == false) {
        document.getElementById('poruka02').innerHTML = "Niste uneli mail";
        return false;
    }*/
    /*
    Evo vam ovo za komentare ovde
    Da ne pises stalno
    |Skocimis: 
    |AlexArcticFox: To bi ti spremo mogao da testiras
    |BogBogdan: 
     */

    //Ovde vrsis proveru
    /*
        Izbacivanje greske moze ovako da izgleda
        document.getElementById('poruka02').innerHTML = "Mejl adresa mora da sadrzi @";
    */
    var dobriPodaci = true; //Ovaj bool je rezultat provere

    if (dobriPodaci) {
        var salt = generisisalt(100);
        var hesovana = SHA256.hash(lozinka + salt);
        post("../control/register.php", { korisnicko_ime: korisnicko_ime, mejl: mejl, lozinka: hesovana, salt: salt }, "post");
    } else {
        document.getElementById('poruka02').innerHTML = "Ne moze";
    }
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