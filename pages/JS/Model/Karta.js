/*
    //Nivoom sam dodao ono sto stoji tamo gde pisu zvezdice, tj. znak koji ide uz spell i trap, da li je karta spell ili trap zna se na osnovu 
    Nivo karata
    Ovako se koristi 
    var nivo = Nivoi.Peti;
    nivo = Nivoi.Sesti;
    if(nivo==Nivoi.Peti) blabla //Msm da mozes da koristis i if(nivo==5) zato sto sam kad sam pravio objekat stavio da Peti ima vrednost 5

    1-12 cudovista
    -12--1 XYZ
    0 - normalan spell/trap
    13 - equip
    14 - field
    15 - quick-play
    16 - ritual
    17 - continous
    18 - counter
*/

const Nivoi = {
    MinusDvanaesti: -12,
    MinusJedanaesti: -11,
    MinusDeseti: -10,
    MinusDeveti: -9,
    MinusOsmi: -8,
    MinusSedmi: -7,
    MinusSesti: -6,
    MinusPeti: -5,
    MinusCetvrti: -4,
    MinusTreci: -3,
    MinusDrugi: -2,
    MinusPrvi: -1,
    Obican: 0,
    Prvi: 1,
    Drugi: 2,
    Treci: 3,
    Cetvrti: 4,
    Peti: 5,
    Sesti: 6,
    Sedmi: 7,
    Osmi: 8,
    Deveti: 9,
    Deseti: 10,
    Jedanaesti: 11,
    Dvanaesti: 12,
    Equip: 13,
    Field: 14,
    QuickPlay: 15,
    Ritual: 16,
    Continous: 17,
    CounterPlay: 18
}

/* 
    Atributima sam nazvao ono sto na karti stoji gore desno (sedam elemenata, spell i trap, ima i divine i jos neceg vrv, dodacu kasnije)
    Atributi karata
    0 - Dark
    1 - Earth
    2 - Fire
    3 - Light
    4 - Water
    5 - Wind
    6 - Spell
    7 - Trap
*/
const Atributi = {
    Dark: 0,
    Earth: 1,
    Fire: 2,
    Light: 3,
    Water: 4,
    Wind: 5,
    Spell: 6,
    Trap: 7
}






class Karta {
    constructor(id_karte, naziv, nivo, atribut, tip, napad, odbrana, opis) {
        this.id_karte = id_karte;
        this.naziv = naziv;
        this.nivo = nivo;
        this.atribut = atribut
        this.tip = tip;
        this.napad = napad;
        this.odbrana = odbrana;
        this.opis = opis;
        this.slika = new Image();
        this.slika.src = 'JS/slike/karte/' + naziv + '.png';
    }
}
//Ovo bi trebala da bude funkcija koja ucitava sve moguce karte iz baze
function loadCards() {
    if (arguments.length == 0) {
        svekarte = Array(999999);
        svekarte[1000001] = new Karta(1000001, 'Alpha The Magnet Warrior', Nivoi.Cetvrti, Atributi.Earth, ['Rock'], 1400, 1700, 'Alpha, Beta, and Gamma meld as one to form a powerful monster.');
        svekarte[1000002] = new Karta(1000002, 'Beta The Magnet Warrior', Nivoi.Cetvrti, Atributi.Earth, ['Rock'], 1700, 1600, 'Alpha, Beta, and Gamma meld as one to form a powerful monster.');
        svekarte[1000003] = new Karta(1000003, 'Gamma The Magnet Warrior', Nivoi.Cetvrti, Atributi.Earth, ['Rock'], 1500, 1800, 'Alpha, Beta, and Gamma meld as one to form a powerful monster.');
        svekarte[1000004] = new Karta(1000004, 'Saggi the Dark Clown', Nivoi.Treci, Atributi.Dark, ['Spellcaster'], 600, 1500, 'This clown appears from nowhere and executes very strange moves to avoid enemy attacks.');
        svekarte[1000005] = new Karta(1000005, 'Blue-Eyes White Dragon', Nivoi.Osmi, Atributi.Light, ['Dragon'], 3000, 2500, 'This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.');
        svekarte[1000006] = new Karta(1000006, 'Gazelle the King of Mythical Beasts', Nivoi.Cetvrti, Atributi.Earth, ['Rock'], 1500, 1200, 'This monster moves so fast that it looks like an illusion to mortal eyes. (This card is always treated as a "Phantom Beast" card.)');
    }
}