function cMouseMove(e) {
    var x = e.offsetX;
    var y = e.offsetY;


    if (x > 0 && x < 500 && y > 0 && y < 500) {
        var indeksmisa = Math.floor(y / 145) * 5 + Math.floor(x / 100);


        if (indeksmisa + indekspomeranja < svekarte.length) {
            //prikaziRed(indeksmisa + " " + indekspomeranja);
            var slikaVelike = document.getElementById("velikakarta");
            slikaVelike.src = "JS/Slike/Karte/" + svekarte[indeksmisa + indekspomeranja].naziv + ".png";

        }
    }
}

function maxbrojkarata(broj) {
    var brojacponavljanja = 0;
    prekoracenje = true;

    for (var i = 0; i < korisnickiDek.length; i++) {
        if (broj == korisnickiDek[i]) {
            brojacponavljanja++;
        }
    }
    if (brojacponavljanja >= 3) { prekoracenje = false; }
}

function insertData() {
    var id_deka, naziv, karte_u_deku, id_korisnika;
    var http = new XMLHttpRequest();
    var url = 'get_data.php';
    var params = JSON.stringify();
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(params);


    prikaziRed("aa");
}

function cMouseUp(e) {
    var x = e.offsetX;
    var y = e.offsetY;

    if (x > 0 && x < 500 && y > 0 && y < 500) {
        var indeksmisa = Math.floor(y / 145) * 5 + Math.floor(x / 100);
        if (indeksmisa + indekspomeranja < svekarte.length && korisnickiDek.filter(x => x == indekspomeranja + indeksmisa).length < 3) korisnickiDek.push((indeksmisa + indekspomeranja));


    }
    render1();
}

function cMouseMove2(e) {
    var x = e.offsetX;
    var y = e.offsetY;

    if (x > 0 && x < 500 && y > 0 && y < 500) {
        var indeksmisa2 = Math.floor(y / 145) * 5 + Math.floor(x / 100);

        if (indeksmisa2 + indekspomeranja1 < korisnickiDek.length) {

            var slikaVelike = document.getElementById("velikakarta");
            slikaVelike.src = "JS/Slike/Karte/" + svekarte[korisnickiDek[indeksmisa2 + indekspomeranja1]].naziv + ".png";
        }

    }

}

function cMouseUp2(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    if (x > 0 && x < 500 && y > 0 && y < 500) {
        var indeksmisa = Math.floor(y / 145) * 5 + Math.floor(x / 100);
        korisnickiDek.splice(indeksmisa, 1);
        render1();

    }
}




function handleEvents() {
    csvekarte.addEventListener("mousemove", cMouseMove);
    csvekarte.addEventListener("mouseup", cMouseUp);
    cdek.addEventListener("mousemove", cMouseMove2);
    cdek.addEventListener("mouseup", cMouseUp2);
}