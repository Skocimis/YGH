function loadUserDecks() { //Kasnije treba napraviti loadUserDeck
    $.post('../control/getdecks.php', { id_korisnika: vid_korisnika },
        function (returnedData) {
            v_dekovi = JSON.parse(returnedData);
            for (var i = 0; i < v_dekovi.length; i++) {
                if (v_dekovi[i].id_deka == postParams) {
                    vid_deka = i;
                }
            }
            initialize();
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

function prikaziRed(a) {
    var konzola = document.getElementById("Debugger");
    konzola.innerHTML += "\n" + a;
}

function resetDebugLog() {
    var konzola = document.getElementById("Debugger");
    konzola.innerHTML = "Debug komande:";
}

function initialize() {
    //OSNOVNI ELEMENTI
    c = document.getElementById("platno");
    ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    img2 = new Image();
    imgdugmad = new Image();
    imgsvetlecedugme = new Image();
    indexkarteuruci = -1;
    indexkarteuprotivnickojruci = 0;
    dijalozi = [];

    //DEFINISANJE DEKOVA
    deck = new Deck(vid_deka);
    //prikaziRed(dek.cards.length);
    protivnickideck = new Deck(-1);
    //RUKA
    stanjeIgre = StanjeIgre.Normalno;

    teren = [];
    var tx = 13,
        ty = 23;
    for (var i = 0; i < 30; i++) {
        if (i == CardZones.Deck) teren.push(new CardZone(deck, tx, ty, MonsterCardW, MonsterCardH));
        else if (i == CardZones.DeckP) teren.push(new CardZone(protivnickideck, tx, ty, MonsterCardW, MonsterCardH));
        else teren.push(new CardZone([], tx, ty, MonsterCardW, MonsterCardH));
        tx += MonsterCardW + MonsterCardD;
        if (tx > 800) {
            tx = 13;
            ty += 144;
        }
        if (ty == 311) ty = 338;
    }
    teren[CardZones.Deck].promesaj();
    teren[CardZones.DeckP].promesaj();
    for (var i = 0; i < 5; i++) {

        teren[CardZones.Hand].cards.push(teren[CardZones.Deck].vuci());
    }
    for (var i = 0; i < 5; i++) {
        teren[CardZones.HandP].cards.push(teren[CardZones.DeckP].vuci());
    }
    SelektovaniIndeksi = [];

    //TEREN
    //VUCENJE KARATA
    ctx.clearRect(0, 0, 800, 600);
    dugmicizafaze = new Image();
    dugmicizafaze.src = 'JS/Slike/Interfejs/Dugmad.png';
    slikaaktivnefaze = new Image();
    slikaaktivnefaze.src = 'JS/Slike/Interfejs/AktivnoDugme.png';
    slikaselektovane = new Image();
    slikaselektovane.src = 'JS/Slike/Karte/selektovana.png';
    slikapozadinekarte = new Image();
    slikapozadinekarte.src = 'JS/Slike/Karte/pozadina.png'
    Filteri = [
        []
    ];
    //Niz nizova filtera, u DNFu, redovi u matrici su odvojeni znakom ili, a unutar jednog reda su filteri odvojeni znakom i. 
    //Filter ima i bool pozitivan koji ako je false, znaci da karta ne sme da ima date osobine. 
    slikaterena = new Image();
    slikaterena.src = 'JS/slike/Interfejs/teren.png';
    slikaterena.onload = function () {
        render();
        handleEvents();
        faza = -1;
        mojpotez = true;
        zavrsiFazu();
    }
}