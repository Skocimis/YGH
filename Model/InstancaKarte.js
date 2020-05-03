const CardTypes =
{
    Monster: 0,
    Spell: 1,
    Trap: 2
}
class InstancaKarte {
    constructor(karta) {
        this.karta = karta;
        this.MaxBrNapada = 1;
    }
    resetTurnVariables() {
        this.TurnVariables = {
            BrojNapada: 0
        };
    }
    crtaj(ctx, x, y, w, h) {
        ctx.drawImage(svekarte[this.karta].slika, 0, 0, wSlikeKarte, hSlikeKarte, x, y, w, h);
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
        }
        else {
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
            }
            else {
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
        }
        else {
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
        if (this.TurnVariables.BrojNapada >= this.MaxBrNapada) {
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
            }
            else if (canBeAttackedZones == []) {
                this.canAttack = false;
                this.canDirectAttack = false;
                return [];
            }
            this.canAttack = true;
            this.canDirectAttack = false;
            return canBeAttackedZones;
        }
        if (izmedju(indexOnTerrain, CardZones.Monster5P, CardZones.Monster1P)) {
            for (var i = CardZones.Monster1; i <= CardZones.Monster5; i++) {
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
            }
            else if (canBeAttackedZones == []) {
                this.canAttack = false;
                this.canDirectAttack = false;
                return [];
            }
            this.canAttack = true;
            this.canDirectAttack = true;
            return canBeAttackedZones;
        }
        return canBeAttackedZones;
    }
    opcije() {
        var opcije = [];
        var self = this;
        if (this.isNormalSummonable) {
            opcije.push(new Opcija("Prizovi", function (params) {
                var freeCardZoneIndex = 100;//Da ne bi bio 0 dole
                if (self.brojNormalnihZrtava == 0) {
                    //Mozda metoda freecardzoneindex()
                    for (var i = CardZones.Monster5; i <= CardZones.Monster1; i++) {
                        if (teren[i].cards.length == 0) {
                            freeCardZoneIndex = i;
                            break;
                        }
                    }
                    teren[freeCardZoneIndex].premesti(ruka, params[0]); TurnVariables.NormalSummoned++;
                }
                else {
                    SelektovaniIndeksi = [];
                    CiljSelekcije = self.brojNormalnihZrtava;
                    Filteri = [[new FilterZaSelekciju(true, CardTypes.Monster)]];
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
        if (faza == Faza.BattlePhase && (izmedju(indexOnTerrain, CardZones.Monster1, CardZones.Monster5) || izmedju(indexOnTerrain, CardZones.Monster1P, CardZones.Monster5P))) {
            var attackableZones = this.checkForAttacks(indexOnTerrain);
            if (this.canAttack) {
                prikaziRed("moze da napada");
            }
            if (this.canDirectAttack) {
                prikaziRed("moze da napada direktno");
            }
        }
        return opcije;
    }
}