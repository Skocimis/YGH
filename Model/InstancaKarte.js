const CardTypes =
{
    Monster: 0,
    Spell: 1,
    Trap: 2
}
class InstancaKarte {
    constructor(karta) {
        this.karta = karta;
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
    get tipKarte()
    {
        if(svekarte[this.karta].atribut==Atributi.Spell)
        {
            return CardTypes.Spell;
        }
        if(svekarte[this.karta].atribut==Atributi.Trap)
        {
            return CardTypes.Trap;
        }
        else
        {
            return CardTypes.Monster;
        }
    }
    //Mozda je lose ovako raditi, ali izgleda da nije
    get uruci() {
        return ruka.cards.includes(this);
    }
    get uruciP() {
        return protivnickaruka.cards.includes(this);
    }
    get isTributable() {
        return true;
    }
    get isNormalSummonable() {

        if (!this.uruci && !this.uruciP) return false;
        if (this.uruci) {
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
                    for(var i = CardZones.Monster5; i<=CardZones.Monster1;i++)
                    {
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
            }, arguments[0]));

        }
        return opcije;
    }
}