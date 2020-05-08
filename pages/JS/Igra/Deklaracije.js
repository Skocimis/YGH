//enumi

const StackType = {
    HorizontalStack: 0,
    VerticalStack: 1
}
const StackDirection = {
    Positive: 1,
    Negative: -1
}

const Faza = {
    DrawPhase: 0,
    StandByPhase: 1,
    MainPhase: 2,
    BattlePhase: 3,
    MainPhase2: 4,
    EndPhase: 5
}
const Pozicija = {
    Napad: 0,
    Odbrana: 1,
    NeotkrivenNapad: 2,
    NeotkrivenaOdbrana: 3
}
const StanjeIgre = {
    Normalno: 0,
    SelekcijaTerena: 1,
    SelekcijaUMeniju: 2
}
const CardZones = {
    DeckP: 0,
    SpellTrap1P: 1,
    SpellTrap2P: 2,
    SpellTrap3P: 3,
    SpellTrap4P: 4,
    SpellTrap5P: 5,
    SpecialDeckP: 6,
    GraveyardP: 7,
    Monster1P: 8,
    Monster2P: 9,
    Monster3P: 10,
    Monster4P: 11,
    Monster5P: 12,
    FieldP: 13,
    Field: 14,
    Monster5: 15,
    Monster4: 16,
    Monster3: 17,
    Monster2: 18,
    Monster1: 19,
    Graveyard: 20,
    SpecialDeck: 21,
    SpellTrap5: 22,
    SpellTrap4: 23,
    SpellTrap3: 24,
    SpellTrap2: 25,
    SpellTrap1: 26,
    Deck: 27,
    Hand: 28,
    HandP: 29

}

var igraci = {
    Player: {
        ZivotniPoeni: 4000,
        Vlasnistvo: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
    },
    Enemy: {
        ZivotniPoeni: 4000,
        Vlasnistvo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 29]
    }
}
igraci.Player.vlasnik = igraci.Enemy.vlasnik = function (polje) { return this.Vlasnistvo.includes(polje) };

//ostali objekti

//Za efekte karata tipa negate attack, mozda nije najbolja implementacija, komentarisite ako imate bolju, ovo ce da se menju u zavisnosti od toga sta se desava u igri
var Triggers = {
    MonsterSummoned: false,
    SpellActivated: false,
    AttackDeclared: false
}
var GameVariables = {
    ProsloPoteza: 0
};
var v_dekovi, vid_korisnika, vid_deka = -1;

var TurnVariables;
var svekarte;
//Mozda bi moglo nesto kao GameVariables, monstersOnTerrain, ...

var c, ctx;
var deck, protivnickideck;

var img2, imgdugmad, imgsvetlecedugme, slikaterena, dugmicizafaze, slikaaktivnefaze;

var dek, protivnickidek;
var indekskarteuruci, indekskarteuprotivnickojruci;
var faza, mojpotez;
var dijalozi;
var stanjeIgre;
var SelektovaniIndeksi, CiljSelekcije, EfekatSelekcije, Filteri, DozvoljeniIndeksi, ObaveznaSelekcija;

//var indeksigraca;

var pozadina;
var slikaaktivnefaze;
var slikaselektovane;
var slikapozadinekarte;
var teren
const hcanvas = 600,
    wcanvas = 800;

//Kasnije bi konstante trebalo da se dinamicki podesavaju u odnosu na korisnicke preference i velicinu ekrana
//za iscrtavanje
const maxkaratauruci = 7;

const wSlikeKarte = 400;
const hSlikeKarte = 580;
const wkarteuruci = 60 * wcanvas / 800,
    hkarteuruci = 90 * hcanvas / 600;
const xruke = (wcanvas - wkarteuruci * maxkaratauruci) / 2,
    yruke = hcanvas - hkarteuruci;
const wopcije = wkarteuruci * 3 / 2,
    hopcije = wopcije / 4;

const
    MonsterCardZoneW = 540,
    MonsterCardZoneH = 100;
const
    MonsterCardZoneX = (wcanvas - MonsterCardZoneW) / 2,
    MonsterCardZoneY = 340;
const MonsterCardH = MonsterCardZoneH,
    MonsterCardW = 77;
const MonsterCardD = (MonsterCardZoneW - 5 * MonsterCardW) / 4;
const MagicCardZoneY = MonsterCardZoneY + MonsterCardH + 20;
const
    xterenaM = 300,
    yterenaM = 240,
    wterenaM = 47,
    hterenaM = 69,
    xterenaS = 400,
    yterenaS = 240,
    wterenaS = 47,
    hterenaS = 69;

const wdugmadi = 514,
    hdugmadi = 21;

const xdugmadi = (wcanvas - wdugmadi) / 2,
    ydugmadi = (hcanvas - hdugmadi) / 2,
    hdugmeta = 21,
    wdugmeta = 89;

const HPX = 380,
    HPY = 475,
    HPXP = 380,
    HPYP = 155;

//Potrebne funkcije
function izmedju(x, a, b) {
    if (a > b) {
        return x <= a && x >= b;
    }
    return x >= a && x <= b;
}