//#region funkcije

function CancelSelectionOption(x, y) {
    //Mozda bude trebalo nesto sa x i y, ostavicu ih
    if (!ObaveznaSelekcija) {
        SelektovaniIndeksi = [];
        Filteri = [
            []
        ];
        CiljSelekcije = 100;
        EfekatSelekcije = function () { };
        ObaveznaSelekcija = false;
        stanjeIgre = StanjeIgre.Normalno;
        render();
    }
}

function CardMouseOver(x, y) {
    //Da li je mis iznad nekog dijaloga?
    if (!dijalozi.map(d => [d.x, d.y, d.width, d.height]).some(ar => (izmedju(x, ar[0], ar[0] + ar[2]) && izmedju(y, ar[1], ar[1] + ar[3])))) {
        if (x > xruke && x < xruke + teren[CardZones.Hand].cards.length * wkarteuruci && y > yruke && y < yruke + hkarteuruci) {
            var indeks = Math.floor((x - xruke) / wkarteuruci);
            teren[CardZones.Hand].cards[indeks].crtajV();
        }
        for (var i = 0; i < 28; i++) {
            if (x > teren[i].x && x < teren[i].x + teren[i].w && y > teren[i].y && y < teren[i].y + teren[i].h) {
                if (teren[i].cards.length > 0) {
                    teren[i].cards[0].crtajV();
                }
            }
        }
    } else {

    }
}

function dodajDijalogAkoMoze(dijalog) {
    if (dijalog.opcije.length == 0) {
        return;
    }
    dijalozi.forEach(element => {
        if (element.mandatory) {
            return;
        }
    });
    dijalozi = [];
    dijalozi.push(dijalog);
}


function DialogClickable(x, y) {
    var indeksd = -1;
    if (dijalozi.map(d => [d.x, d.y, d.width, d.height]).some(ar => (izmedju(x, ar[0], ar[0] + ar[2]) && izmedju(y, ar[1], ar[1] + ar[3])))) {
        var indeksd = -1;
        for (var i = 0; i < dijalozi.length; i++) {
            if (izmedju(x, dijalozi[i].x, dijalozi[i].x + dijalozi[i].width) && izmedju(y, dijalozi[i].y, dijalozi[i].y + dijalozi[i].height)) {
                indeksd = i;
            }
            for (var j = 0; j < dijalozi[i].opcije.length; j++) {
                if (izmedju(x, dijalozi[i].elemX(j), dijalozi[i].elemX(j) + dijalozi[i].elemW(j)) && izmedju(y, dijalozi[i].elemY(j), dijalozi[i].elemY(j) + dijalozi[i].elemH(j))) {
                    dijalozi[i].opcije[j].efekat(dijalozi[i].opcije[j].params);
                }
            }
        }
        if (indeksd >= 0) {
            dijalozi.splice(indeksd, 1);
        }
        return true;
    }
    if (!dijalozi.map(d => d.mandatory).some(a => a == true)) {
        dijalozi = [];
        render();
        return false;
    }
    return false;
}

function HandClickable(x, y) {
    if (x > xruke && x < xruke + teren[CardZones.Hand].cards.length * wkarteuruci && y > yruke && y < yruke + hkarteuruci) {
        var indeks = Math.floor((x - xruke) / wkarteuruci);
        indekskarteuruci = indeks;
        dodajDijalogAkoMoze(new HrpaOpcija(teren[CardZones.Hand].cards[indeks].opcije(indeks), false, x, y, wopcije, hopcije, 0, StackType.VerticalStack, StackDirection.Negative));
        return true;
    }
    return false;
}

function TerrainClickable(x, y) {
    for (var i = 0; i < 28; i++) {
        if (x > teren[i].x && x < teren[i].x + teren[i].w && y > teren[i].y && y < teren[i].y + teren[i].w) {
            if (teren[i].cards.length > 0) {
                teren[i].cards.forEach(a => {
                    prikaziRed(svekarte[a.karta].naziv);
                });
                dodajDijalogAkoMoze(new HrpaOpcija(teren[i].cards[0].opcije(), false, x, y, wopcije, hopcije, 0, StackType.VerticalStack, StackDirection.Negative));
            }
            return true;
        }
    }
    return false;
}

function BattlePhaseClickable(x, y) {
    if (x > xdugmadi + 3 * wdugmeta && x < xdugmadi + 4 * wdugmeta && y > ydugmadi && y < ydugmadi + hdugmadi && GameVariables.ProsloPoteza > 0) {
        postaviFazu(Faza.BattlePhase);
        return true;
    }
    return false;
}

function MainPhase2Clickable(x, y) {
    if (x > xdugmadi + 4 * wdugmeta && x < xdugmadi + 5 * wdugmeta && y > ydugmadi && y < ydugmadi + hdugmadi) {
        postaviFazu(Faza.MainPhase2);
        return true;
    }
    return false;
}

function EndPhaseClickable(x, y) {
    if (x > xdugmadi + 5 * wdugmeta && x < xdugmadi + wdugmadi && y > ydugmadi && y < ydugmadi + hdugmadi) {
        postaviFazu(Faza.EndPhase);
        return true;
    }
    return false;
}

function handleClicked(x, y) {
    for (i = 2; i < arguments.length; i++) {
        if (arguments[i](x, y)) {
            render();
            return;
        }
    }
    render();
}
function SelctCardsFromZones(x, y) {

}
function SelectCardsOnTerrain(x, y) {
    //prikaziRed(indeks);
    //vrv nepotrebna provera, ova metoda nije uopste optimizovana, ali veoma dobro radi
    if (SelektovaniIndeksi.length == CiljSelekcije) {
        EfekatSelekcije(teren);
        SelektovaniIndeksi = [];
        Filteri = [
            []
        ];
        CiljSelekcije = 100;
        EfekatSelekcije = function () { };
        ObaveznaSelekcija = false;
        stanjeIgre = StanjeIgre.Normalno;
    }
    //Koji je kliknut
    var indeks = -1;
    for (var i = 0; i < 28; i++) {
        if (x > teren[i].x && x < teren[i].x + teren[i].w && y > teren[i].y && y < teren[i].y + teren[i].h) {
            indeks = i;
        }
    }
    if (indeks == -1) return;
    //Ovo dole (samo prvi if) samo ako je bio neki bag da ne bi bio bag
    if (SelektovaniIndeksi.includes(indeks)) {
        SelektovaniIndeksi.splice(SelektovaniIndeksi.indexOf(indeks), 1);
    } else if (!DozvoljeniIndeksi.includes(indeks)) {
        return;
    } else if (teren[indeks].cards.length == 0) {
        return;
    } else if (SelektovaniIndeksi.length < CiljSelekcije) {
        if (profiltrirajSve(Filteri, teren[indeks].getCardInstance()))
            SelektovaniIndeksi.push(indeks);
    }
    if (SelektovaniIndeksi.length == CiljSelekcije) {
        EfekatSelekcije(teren);
        SelektovaniIndeksi = [];
        Filteri = [
            []
        ];
        CiljSelekcije = 100;
        EfekatSelekcije = function () { };
        ObaveznaSelekcija = false;
        stanjeIgre = StanjeIgre.Normalno;
    }
    render();

}
/*function HandleMonsterCardsTribute(x, y)
{
    
}*/

//#endregion

function cContextMenu(e) {
    e.preventDefault();
}

function cMouseMove(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    CardMouseOver(x, y);
}

function cMouseUp(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    switch (e.button) {
        case 0:
            switch (stanjeIgre) {
                case StanjeIgre.Normalno:
                    if (mojpotez) {
                        switch (faza) {
                            case Faza.DrawPhase:

                                break;
                            case Faza.StandByPhase:

                                break;
                            case Faza.MainPhase:
                                handleClicked(x, y, DialogClickable, BattlePhaseClickable, EndPhaseClickable, HandClickable, TerrainClickable);
                                break;
                            case Faza.BattlePhase:
                                handleClicked(x, y, DialogClickable, MainPhase2Clickable, HandClickable, TerrainClickable);
                                break;
                            case Faza.MainPhase2:
                                handleClicked(x, y, DialogClickable, EndPhaseClickable, HandClickable, TerrainClickable);
                                break;
                            case Faza.EndPhase:

                                break;
                            default:

                        }
                    }
                    break;
                case StanjeIgre.SelekcijaTerena:
                    SelectCardsOnTerrain(x, y);
                    break;
                case StanjeIgre.SelekcijaUZoni:
                    SelctCardsFromZone(x, y);
                    break;
                default:
            }
            break;
        case 1:
            break;
        case 2:
            switch (stanjeIgre) {
                case StanjeIgre.Normalno:
                    break;
                case StanjeIgre.SelekcijaTerena:
                    CancelSelectionOption(x, y);
                    break;
                case StanjeIgre.SelekcijaPolja:

                    break;
                default:
            }

            break;
        default:
    }


}


function handleEvents() {
    c.addEventListener("mousemove", cMouseMove);
    c.addEventListener("mouseup", cMouseUp);
    c.addEventListener("contextmenu", cContextMenu);
}
