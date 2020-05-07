function render() {
    for (var i = 0; i + indekspomeranja < svekarte.length; i++) {
        if (typeof svekarte[i + indekspomeranja] !== 'undefined') {
            //alert(i + indekspomeranja);
            csvsvekarte.drawImage(svekarte[i + indekspomeranja].slika, 0, 0, 400, 580, kolona, red, 100, 145);
            if (kolona < 400)
                kolona = kolona + 100;
            else {
                kolona = 0;
                red = red + 145;
            }
        }


    }
}

function pronadjiid(broj) {
    /*for (var j = 0; j < svekarte.length; j++) {
        if (broj == svekarte[j].id_karte) {
            csvsdek.drawImage(svekarte[j].slika, 0, 0, 400, 580, kolona1, red1, 100, 145);
            return;
        }
    }*/
}

function render1() {
    csvsdek.clearRect(0, 0, 500, 500);
    kolona1 = 0;
    red1 = 0;

    for (var i = indekspomeranja1; i < korisnickiDek.length; i++) {
        csvsdek.drawImage(svekarte[korisnickiDek[i]].slika, 0, 0, 400, 580, kolona1, red1, 100, 145);
        if (kolona1 < 400)
            kolona1 = kolona1 + 100;
        else {
            kolona1 = 0;
            red1 = red1 + 145;
        }
    }
}