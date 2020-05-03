const CardTypes = {
    Monster: 0,
    Spell: 1,
    Trap: 2
}


class InstancaKarte {
    constructor(karta) {
        this.karta = karta;
        this.GlobalVariables = {
            Attack: svekarte[karta].napad,
            Defense: svekarte[karta].odbrana,
            Position: Pozicija.NeotkrivenNapad,
            MaxBrNapada: 1
        }
    }
    calculateStats() {
        this.GlobalVariables.Attack = svekarte[this.karta].napad;
        this.GlobalVariables.Defense = svekarte[this.karta].odbrana;
    }

    resetTurnVariables() {
        this.TurnVariables = {
            BrojNapada: 0
        };
    }
    crtaj(ctx, x, y, w, h) {
        if (this.GlobalVariables.Position == Pozicija.Napad) {
            ctx.drawImage(svekarte[this.karta].slika, 0, 0, wSlikeKarte, hSlikeKarte, x, y, w, h);
        }
        if (this.GlobalVariables.Position == Pozicija.Odbrana) {
            ctx.drawImage(svekarte[this.karta].slika, 0, 0, wSlikeKarte, hSlikeKarte, x, y, w, h);
        }
        if (this.GlobalVariables.Position == Pozicija.NeotkrivenNapad) {
            ctx.drawImage(svekarte[this.karta].slika, 0, 0, wSlikeKarte, hSlikeKarte, x, y, w, h);
        }
        if (this.GlobalVariables.Position == Pozicija.NeotkrivenaOdbrana) {
            ctx.drawImage(svekarte[this.karta].slika, 0, 0, wSlikeKarte, hSlikeKarte, x, y, w, h);
        }
    }
    crtajV() {
        var slikaVelike = document.getElementById("velikakarta");
        slikaVelike.src = "slike/karte/" + svekarte[this.karta].naziv + ".png";
    }
    get brojNormalnihZrtava() {
        if (svekarte[this.karta].nivo > 0 && svekarte[this.karta].nivo < 5)
            return 0;
        if (svekarte[this.karta].nivo > 4 && svekarte[this.karta].nivo < 7)
            return 1;
        if (svekarte[this.karta].nivo > 6 && svekarte[this.karta].nivo < 13)
            return 2;
        return -1;
    }
    //OVO CE TREBATI DA SE UPDATUJE
    get tipKarte() {
        if (svekarte[this.karta].atribut == Atributi.Spell) {
            return CardTypes.Spell;
        }
        if (svekarte[this.karta].atribut == Atributi.Trap) {
            return CardTypes.Trap;
        } else {
            return CardTypes.Monster;
        }
    }
    //Mozda je lose ovako raditi, ali izgleda da nije
    get uruci() {
        return ruka.cards.indexOf(this);
    }
    get uruciP() {
        return protivnickaruka.cards.indexOf(this);
    }
    get isTributable() {
        return true;
    }
    get isNormalSummonable() {
        if (faza != Faza.MainPhase && faza != Faza.MainPhase2) return false;
        if (this.uruci == -1 && this.uruciP == -1) return false;
        if (this.uruci != -1) {
            if (TurnVariables.NormalSummoned > 0) {
                return false;
            }
            var tributable = 0;
            var onTerrain = 0;
            for (var i = CardZones.Monster5; i <= CardZones.Monster1; i++) {
                if (teren[i].cards.length > 0) {
                    onTerrain++;
                    if (teren[i].cards[0].isTributable) {
                        tributable++;
                    }
                }
            }
            if (this.brojNormalnihZrtava > 0) {
                if (tributable >= this.brojNormalnihZrtava) return true;
                else return false;
            } else {
                if (onTerrain > 4) {
                    return false;
                }
                return true;
            }
        }
        if (TurnVariables.NormalSummoned > 0) {
            return false;
        }
        var tributable = 0;
        var onTerrain = 0;
        for (var i = CardZones.Monster1P; i <= CardZones.Monster5P; i++) {
            if (teren[i].cards.length > 0) {
                onTerrain++;
                if (teren[i].cards[0].isTributable) {
                    tributable++;
                }
            }
        }
        if (this.brojNormalnihZrtava > 0) {
            if (tributable >= this.brojNormalnihZrtava) return true;
            else return false;
        } else {
            if (onTerrain > 4) {
                return false;
            }
            return true;
        }

    }
    canBeAttacked(napadac) // Za sad prosledjujem teren zato sto on sadrzi i instancu karte
    {
        return true;
    }
    checkForAttacks(indexOnTerrain) {
        if (faza != Faza.BattlePhase) {
            this.canAttack = false;
            this.canDirectAttack = false;
            return [];
        }
        if (this.TurnVariables.BrojNapada >= this.GlobalVariables.MaxBrNapada) {
            this.canAttack = false;
            this.canDirectAttack = false;
            return [];
        }
        var canBeAttackedZones = [];
        var freezones = 0;
        if (izmedju(indexOnTerrain, CardZones.Monster1, CardZones.Monster5)) {
            for (var i = CardZones.Monster1P; i <= CardZones.Monster5P; i++) {
                if (teren[i].cards.length == 0) {
                    freezones++;
                    continue;
                }
                if (teren[i].cards[0].canBeAttacked(teren[indexOnTerrain])) {
                    canBeAttackedZones.push(i);
                }
            }
            if (freezones == 5) {
                this.canAttack = false;
                this.canDirectAttack = true;
                return [];
            } else if (canBeAttackedZones == []) {
                this.canAttack = false;
                this.canDirectAttack = false;
                return [];
            } else {
                this.canAttack = true;
                this.canDirectAttack = false;
                return canBeAttackedZones;

            }
        }
        if (izmedju(indexOnTerrain, CardZones.Monster5P, CardZones.Monster1P)) {
            for (var i = CardZones.Monster5; i <= CardZones.Monster1; i++) {
                if (teren[i].cards.length == 0) {
                    freezones++;
                    continue;
                }
                if (teren[i].cards[0].canBeAttacked(teren[indexOnTerrain])) {
                    canBeAttackedZones.push(i);
                }
            }
            if (freezones == 5) {
                this.canAttack = false;
                this.canDirectAttack = true;
                return [];
            } else if (canBeAttackedZones == []) {
                this.canAttack = false;
                this.canDirectAttack = false;
                return [];
            } else {
                this.canAttack = true;
                this.canDirectAttack = false;
                return canBeAttackedZones;
            }
        }
        return canBeAttackedZones;
    }
    opcije() {
        var opcije = [];
        var self = this;
        if (this.isNormalSummonable&&mojpotez) {
            opcije.push(new Opcija("Prizovi", function (params) {
                var freeCardZoneIndex = 100; //Da ne bi bio 0 dole
                if (self.brojNormalnihZrtava == 0) {
                    //Mozda metoda freecardzoneindex()
                    for (var i = CardZones.Monster5; i <= CardZones.Monster1; i++) {
                        if (teren[i].cards.length == 0) {
                            freeCardZoneIndex = i;
                            break;
                        }
                    }
                    teren[freeCardZoneIndex].premesti(ruka, params[0]);
                    teren[freeCardZoneIndex].cards[0].GlobalVariables.Position = Pozicija.Napad;
                    TurnVariables.NormalSummoned++;
                } else {
                    SelektovaniIndeksi = [];
                    CiljSelekcije = self.brojNormalnihZrtava;
                    Filteri = [
                        [new FilterZaSelekciju(true, CardTypes.Monster)]
                    ];
                    DozvoljeniIndeksi = [];
                    ObaveznaSelekcija = false;
                    //ZRTVUJE SE SAMO SA TERENA
                    for (var i = CardZones.Monster5; i <= CardZones.Monster1; i++) {
                        DozvoljeniIndeksi.push(i);
                    }
                    EfekatSelekcije = function (niz) {
                        SelektovaniIndeksi.sort((a, b) => a - b);
                        for (var i = CardZones.Monster5; i <= CardZones.Monster1; i++) {
                            if (teren[i].cards.length == 0) {
                                freeCardZoneIndex = i;
                                break;
                            }
                        }
                        if (SelektovaniIndeksi[0] < freeCardZoneIndex) freeCardZoneIndex = SelektovaniIndeksi[0];
                        teren[CardZones.Graveyard].premesti(niz, SelektovaniIndeksi);
                        teren[freeCardZoneIndex].premesti(ruka, params[0]);
                        teren[freeCardZoneIndex].cards[0].GlobalVariables.Position = Pozicija.Napad;
                        TurnVariables.NormalSummoned++;
                    }
                    stanjeIgre = StanjeIgre.SelekcijaTerena;
                }
            }, this.uruci));

        }
        var indexOnTerrain;
        //Lose ali trebalo bi da uglavnom radi
        for (var i = 0; i < teren.length; i++) {
            if (teren[i].cards.includes(this)) {
                indexOnTerrain = i;
                break;
            }
        }
        if (izmedju(indexOnTerrain, CardZones.Monster1, CardZones.Monster5)) {
            var attackableZones = this.checkForAttacks(indexOnTerrain);
            if (this.canAttack) {
                opcije.push(new Opcija("Napadni", function (params) {
                    SelektovaniIndeksi = [];
                    CiljSelekcije = 1;
                    Filteri = [
                        [new FilterZaSelekciju(true, CardTypes.Monster)]
                    ];
                    DozvoljeniIndeksi = attackableZones;
                    ObaveznaSelekcija = false;
                    //ZRTVUJE SE SAMO SA TERENA
                    EfekatSelekcije = function () {
                        resolveBattle(indexOnTerrain, SelektovaniIndeksi[0]);
                        stanjeIgre
                    }
                    stanjeIgre = StanjeIgre.SelekcijaTerena;
                }));
                prikaziRed("moze da napada");
            }
            if (this.canDirectAttack) {
                opcije.push(new Opcija("Napadni direktno", function (params) {
                    attackDirectly(indexOnTerrain, igraci.Player.vlasnik(indexOnTerrain)?igraci.Enemy:igraci.Player);
                    //VRV CE TREBATI NEKO SVOJSTVO META NAPADA ZA KARTE KAO STO JE CILINDRIN
                    render();
                }));
                prikaziRed("moze da napada direktno");
            }
        }
        return opcije;
    }
}

function resolveBattle(napadac, branilac) {
    //prikaziRed(svekarte[teren[napadac].cards[0].karta].naziv + " " + svekarte[teren[branilac].cards[0].karta].naziv);
    teren[napadac].cards[0].TurnVariables.BrojNapada++;
    teren[napadac].cards[0].calculateStats();
    teren[branilac].cards[0].calculateStats();
    var GrobljeN, GrobljeB;
    if(igraci.Player.vlasnik(napadac))
    {
        GrobljeN = CardZones.Graveyard;
        GrobljeB = CardZones.GraveyardP;
    }
    else
    {
        GrobljeN = CardZones.GraveyardP;
        GrobljeB = CardZones.Graveyard;
    }
    var atknapadaca = teren[napadac].cards[0].GlobalVariables.Attack;
    var statbranioca = 0;
    if (teren[branilac].cards[0].GlobalVariables.Position == Pozicija.Napad || teren[branilac].cards[0].GlobalVariables.Position == Pozicija.NeotkrivenNapad) {
        statbranioca = teren[branilac].cards[0].GlobalVariables.Attack;
        if(atknapadaca>statbranioca)
        {
            teren[GrobljeB].premesti(teren, [branilac]);
            igraci.Enemy.ZivotniPoeni -= atknapadaca-statbranioca;

        }
        else if(atknapadaca<statbranioca)
        {
            teren[GrobljeN].premesti(teren, [napadac]);
            igraci.Player.ZivotniPoeni -= statbranioca-atknapadaca;
        }
        else {
            teren[GrobljeB].premesti(teren, [branilac]);
            teren[GrobljeN].premesti(teren, [napadac]);
        }
        proveriPobedu();
    }
}
function attackDirectly(napadac, meta)
{
    teren[napadac].cards[0].calculateStats();
    meta.ZivotniPoeni-=teren[napadac].cards[0].GlobalVariables.Attack;
    proveriPobedu();
}
