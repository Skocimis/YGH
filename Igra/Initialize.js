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
    loadCards();
    img2 = new Image();
    imgdugmad = new Image();
    imgsvetlecedugme = new Image();
    indexkarteuruci = -1;
    indexkarteuprotivnickojruci = 0;
    dijalozi = [];


    //DEFINISANJE DEKOVA
    deck = new Deck();
    //prikaziRed(dek.cards.length);
    deck.generate_deck();
    protivnickideck = new Deck();
    protivnickideck.generate_deck();
    //RUKA
    ruka = new CardZone([]);
    protivnickaruka = new CardZone([]);
    stanjeIgre = StanjeIgre.Normalno;


    teren = [];
    var tx = 13,
        ty = 23;
    for (var i = 0; i < 28; i++) {
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

        ruka.cards.push(teren[CardZones.Deck].vuci());
    }
    for (var i = 0; i < 5; i++) {
        protivnickaruka.cards.push(teren[CardZones.DeckP].vuci());
    }
    SelektovaniIndeksi = [];

    //TEREN
    //VUCENJE KARATA
    ctx.clearRect(0, 0, 800, 600);
    dugmicizafaze = new Image();
    dugmicizafaze.src = 'Slike/Interfejs/Dugmad.png';
    slikaaktivnefaze = new Image();
    slikaaktivnefaze.src = 'Slike/Interfejs/AktivnoDugme.png';
    slikaselektovane = new Image();
    slikaselektovane.src = 'Slike/Karte/selektovana.png';
    slikapozadinekarte = new Image();
    slikapozadinekarte.src = 'Slike/Karte/pozadina.png'
    Filteri = [
        []
    ];
    //Niz nizova filtera, u DNFu, redovi u matrici su odvojeni znakom ili, a unutar jednog reda su filteri odvojeni znakom i. 
    //Filter ima i bool pozitivan koji ako je false, znaci da mora karta be sne da ima date osobine. 
    slikaterena = new Image();
    slikaterena.src = 'slike/Interfejs/teren.png';
    slikaterena.onload = function() {
        render();
        handleEvents();
        faza = -1;
        mojpotez = true;
        zavrsiFazu();
    }
}