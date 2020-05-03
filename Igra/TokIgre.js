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
    for (var i = 0; i < teren.length; i++)
        for (var j = 0; j < teren[i].length; j++)
            teren[i].cards[j].resetTurnVariables();

    for (var j = 0; j < ruka.cards.length; j++)
        ruka.cards[j].resetTurnVariables();
    for (var j = 0; j < protivnickaruka.cards.length; j++)
        protivnickaruka.cards[j].resetTurnVariables();

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
            resetDebugLog();
            resetTurnVariables();
            if (teren[CardZones.Deck].cards.length == 0) {
                prikaziRed("Poraz");
            } else {
                ruka.cards.push(teren[CardZones.Deck].vuci());
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
            render();
            zavrsiFazu();

        }
    } else { //OVDE za AI
        if (faza == Faza.DrawPhase) {
            resetDebugLog();
            resetTurnVariables();
            if (teren[CardZones.DeckP].cards.length == 0) {
                prikaziRed("Pobeda");
            } else {
                protivnickaruka.cards.push(teren[CardZones.DeckP].vuci());
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
            for (var i = 0; i < protivnickaruka.cards.length; i++) {
                if (protivnickaruka.cards[i].isNormalSummonable && svekarte[protivnickaruka.cards[i].karta].napad > najjaciatk) {
                    najjaciatk = svekarte[protivnickaruka.cards[i].karta].napad;
                    najjaciind = i;
                }
            }
            if (najjaciind > -1) {
                var freeCardZoneIndex = 100;//Da ne bi bio 0 dole
                //alert(protivnickaruka.cards[najjaciind].brojNormalnihZrtava+" "+svekarte[protivnickaruka.cards[najjaciind].karta].naziv);
                if (protivnickaruka.cards[najjaciind].brojNormalnihZrtava <= 0) {
                    //Mozda metoda freecardzoneindex()
                    for (var i = CardZones.Monster1P; i <= CardZones.Monster5P; i++) {
                        if (teren[i].cards.length == 0) {
                            freeCardZoneIndex = i;
                            break;
                        }
                    }
                    if (freeCardZoneIndex != 100) teren[freeCardZoneIndex].premesti(protivnickaruka, najjaciind); TurnVariables.NormalSummoned++;
                }
                else {
                    var sIndeksi = [];
                    for (var i = CardZones.Monster1P; i <= CardZones.Monster5P; i++) {
                        if (teren[i].cards.length > 0 && sIndeksi.length < protivnickaruka.cards[najjaciind].brojNormalnihZrtava) {
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
                        teren[freeCardZoneIndex].premesti(protivnickaruka, najjaciind);
                        TurnVariables.NormalSummoned++;
                    }
                }
            }
            render();

            zavrsiFazu();
            /*for (var i = 0; i < protivnickaruka.length; i++) {
                if (protivnickaruka[i].tip == 'M') {
                    prikaziRed("PROTIVNIK PRIZIVA");
                    protivnickiteren.push(protivnickaruka[i]);
                    protivnickaruka.splice(i, 1);
                    render();
                }
            }*/
            //prikaziRed("Bot je zavrsio m1");

        } else if (faza == Faza.BattlePhase) {

            render();
            //prikaziRed("Bot je zavrsio b");
            zavrsiFazu();

        } else if (faza == Faza.MainPhase2) { //MP2

            render();
            //prikaziRed("Bot je zavrsio m2");
            zavrsiFazu();

        } else if (faza == Faza.EndPhase) {

            render();
            //prikaziRed("Bot je zavrsio end");
            zavrsiFazu()

        }

    }

}