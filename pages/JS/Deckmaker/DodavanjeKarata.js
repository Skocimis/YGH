var cdek, csvekarte, deksvihkarata, red, kolona, indekspomeranja, indekspomeranja1, korisnickiDek, prekoracenje, csvsdek, kolona1, red1, svekarte;
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


kolona1 = 0;
red1 = 0;
kolona = 0;
red = 0;
loadCards();

setTimeout(render, 500);

handleEvents();