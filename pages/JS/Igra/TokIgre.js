/*
0 - Draw
1 - Standby
2 - Main 1
3 - Battle
4 - Main 2
5 - End
*/
function postaviFazu(brFaze) { //trenutno preskace faze sto radi, ali mozda bude zasmetalo u buducnosti
    /*while (faza < brFaze) {
        zapocniFazu(brFaze, true);
    }*/
    faza = brFaze;
    zapocniFazu(brFaze, mojpotez);
}

function resetTurnVariables() {
    TurnVariables = {
        NormalSummoned: 0,
        SpecialSummoned: 0
    }
    for (var i = 0; i < 28; i++) {
        for (var j = 0; j < teren[i].cards.length; j++) {
            teren[i].cards[j].resetTurnVariables();
        }
    }
    for (var j = 0; j < teren[CardZones.Hand].cards.length; j++) {
        teren[CardZones.Hand].cards[j].resetTurnVariables();
    }
    for (var j = 0; j < teren[CardZones.HandP].cards.length; j++) {
        teren[CardZones.HandP].cards[j].resetTurnVariables();
    }
}

function zavrsiFazu() {
    setTimeout(function () {
        faza++;
        if (faza > Faza.EndPhase) {
            mojpotez = !mojpotez;
            faza = Faza.DrawPhase;
        }
        zapocniFazu(faza, mojpotez);
    }, 50);
}

function zapocniFazu(faza, mojpotez) {
    if (mojpotez) {
        if (faza == Faza.DrawPhase) {
            //resetDebugLog();
            resetTurnVariables();
            if (teren[CardZones.Deck].cards.length == 0) {
                prikaziRed("Poraz");
            } else {
                teren[CardZones.Hand].cards.push(teren[CardZones.Deck].vuci());
                //prikaziRed("draw");
                render();
                zavrsiFazu();
            }
        } else if (faza == Faza.StandByPhase) {
            //Pitanje igraca
            //prikaziRed("standby");
            render();
            zavrsiFazu();
        } else if (faza == Faza.MainPhase) {
            //igrac bira sta hoce da radi
            //prikaziRed("m1");
            render();

        } else if (faza == Faza.BattlePhase) {
            //Provera da li igrac moze da napada
            //prikaziRed("b");
            render();

        } else if (faza == Faza.MainPhase2) { //MP2
            //igrac bira sta hoce da radi
            //prikaziRed("m2");
            render();

        } else {
            //prikaziRed("end");
            GameVariables.ProsloPoteza++;
            render();
            zavrsiFazu();
        }
    } else { //OVDE za AI
        if (faza == Faza.DrawPhase) {
            //resetDebugLog();
            resetTurnVariables();
            if (teren[CardZones.DeckP].cards.length == 0) {
                prikaziRed("Pobeda");
            } else {
                teren[CardZones.HandP].cards.push(teren[CardZones.DeckP].vuci());
                render();
                zavrsiFazu();
            }
        } else if (faza == Faza.StandByPhase) {
            render();
            //prikaziRed("Bot je zavrsio standby");
            zavrsiFazu();
        } else if (faza == Faza.MainPhase) {
            render();
            var najjaciatk = 0;
            var najjaciind = -1;
            for (var i = 0; i < teren[CardZones.HandP].cards.length; i++) {
                if (teren[CardZones.HandP].cards[i].isNormalSummonable && svekarte[teren[CardZones.HandP].cards[i].karta].napad > najjaciatk) {
                    najjaciatk = svekarte[teren[CardZones.HandP].cards[i].karta].napad;
                    najjaciind = i;
                }
            }
            if (najjaciind > -1) {
                var freeCardZoneIndex = 100; //Da ne bi bio 0 dole
                //alert(protivnickaruka.cards[najjaciind].brojNormalnihZrtava+" "+svekarte[protivnickaruka.cards[najjaciind].karta].naziv);
                if (teren[CardZones.HandP].cards[najjaciind].brojNormalnihZrtava <= 0) {
                    //Mozda metoda freecardzoneindex()
                    for (var i = CardZones.Monster1P; i <= CardZones.Monster5P; i++) {
                        if (teren[i].cards.length == 0) {
                            freeCardZoneIndex = i;
                            break;
                        }
                    }
                    if (freeCardZoneIndex != 100) {
                        teren[freeCardZoneIndex].premesti(teren[CardZones.HandP], najjaciind);
                        TurnVariables.NormalSummoned++;
                        teren[freeCardZoneIndex].cards[0].GlobalVariables.Position = Pozicija.Napad;
                        //alert(teren[freeCardZoneIndex].Napad + " " + teren[freeCardZoneIndex].GlobalVariables.Position);
                    }
                } else {
                    var sIndeksi = [];
                    for (var i = CardZones.Monster1P; i <= CardZones.Monster5P; i++) {
                        if (teren[i].cards.length > 0 && sIndeksi.length < teren[CardZones.HandP].cards[najjaciind].brojNormalnihZrtava) {
                            sIndeksi.push(i);
                            if (i < freeCardZoneIndex)
                                freeCardZoneIndex = i;
                        }
                        if (teren[i].cards.length == 0 && freeCardZoneIndex == 100) {
                            freeCardZoneIndex = i;
                        }
                    }
                    if (freeCardZoneIndex != 100) {
                        teren[CardZones.GraveyardP].premesti(teren, sIndeksi);
                        teren[freeCardZoneIndex].premesti(teren[CardZones.HandP], najjaciind);
                        teren[freeCardZoneIndex].cards[0].GlobalVariables.Position = Pozicija.Napad;
                        TurnVariables.NormalSummoned++;
                    }
                }
            }
            render();

            zavrsiFazu();
            //prikaziRed("Bot je zavrsio m1");
        } else if (faza == Faza.BattlePhase) {
            //pronalazi najjacu kartu u robotovoj ruci
            var najjacecudoviste = -1;
            var najslabijaigracevakarta = -1;

            var provera = 20000;
            for (var i = CardZones.Monster5; i <= CardZones.Monster1; i++) {
                if (teren[i].cards.length != 0) {
                    if (teren[i].cards[0].GlobalVariables.Attack < provera) {
                        provera = teren[i].cards[0].GlobalVariables.Attack;
                        najslabijaigracevakarta = i;
                    }
                }
            }
            //ako korisnik nema cudovista napadni direktno
            if (najslabijaigracevakarta == -1) {
                for (var i = CardZones.Monster1P; i <= CardZones.Monster5P; i++) {
                    if (teren[i].cards.length != 0) {
                        attackDirectly(i, igraci.Player);
                    }
                }
            } else { //dovde super radi posle 
                for (var i = CardZones.Monster1P; i <= CardZones.Monster5P; i++) {
                    //prikaziRed(CardZones.Monster1P + " " + CardZones.Monster5P);
                    if (teren[i].cards.length != 0) {
                        najjacecudoviste = i; //uzima cuvoviste koje napada
                        //prikaziRed(i);
                        teren[najjacecudoviste].cards[0].calculateStats();
                        provera = 20000;
                        var attackable = teren[najjacecudoviste].cards[0].checkForAttacks(najjacecudoviste);
                        for (var bb = 0; bb < attackable.length; bb++) {
                            var j = attackable[bb];

                            if (teren[j].cards[0].Position == Pozicija.Napad) {
                                if (teren[j].cards[0].GlobalVariables.Attack <= provera) {
                                    provera = teren[j].cards[0].GlobalVariables.Attack;
                                    najslabijaigracevakarta = j;
                                }
                            } else if (teren[j].cards[0].Position == Pozicija.Odbrana) {
                                if (teren[j].cards[0].GlobalVariables.Defense <= provera) {
                                    provera = teren[j].cards[0].GlobalVariables.Defense;
                                    najslabijaigracevakarta = j;
                                }
                            } else {
                                provera = teren[j].cards[0].GlobalVariables.Defense;
                                najslabijaigracevakarta = j;
                            }
                            // prikaziRed(teren[najslabijaigracevakarta].cards.length);
                            if (najjacecudoviste != -1 || teren[najslabijaigracevakarta].cards.length != 0) {

                                teren[najslabijaigracevakarta].cards[0].calculateStats();

                                if (teren[najslabijaigracevakarta].cards[0].GlobalVariables.Attack <= teren[najjacecudoviste].cards[0].GlobalVariables.Attack) {

                                    teren[najjacecudoviste].cards[0].TurnVariables.BrojNapada++;
                                    resolveBattle(najjacecudoviste, najslabijaigracevakarta);
                                    bb = 0;
                                    //   prikaziRed(najjacecudoviste);
                                    if (teren[najjacecudoviste].cards.length == 0) {
                                        attackable = [];
                                        break;
                                    } else {

                                        attackable = teren[najjacecudoviste].cards[0].checkForAttacks(najjacecudoviste);
                                    }

                                    //prikaziRed("Napao cudoviste");
                                }
                            }
                        }
                        /*   for (var j = CardZones.Monster5; j <= CardZones.Monster1; j++) {

                           }*/
                    }
                }
                /*Direktan napad*/
                for (var i = CardZones.Monster1P; i <= CardZones.Monster5P; i++) {
                    if (teren[i].cards.length != 0) {
                        if (teren[i].cards[0].checkForAttacks(i).length == 0 && teren[i].cards[0].DumpVariables.CanDirectAttack) {
                            prikaziRed("dirnap:" + i);
                            attackDirectly(i, igraci.Player);
                        }
                    }
                }
            }
            //prikaziRed("Bot je zavrsio b");             teren[CardZones.DeckP].cards.length

            render();
            zavrsiFazu();
        } else if (faza == Faza.MainPhase2) { //MP2
            render();
            //prikaziRed("Bot je zavrsio m2");
            zavrsiFazu();

        } else if (faza == Faza.EndPhase) {
            render();
            //prikaziRed("Bot je zavrsio end");
            GameVariables.ProsloPoteza++;
            zavrsiFazu();
        }
    }
}