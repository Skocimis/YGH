class FilterZaSelekciju {
    constructor(pozitivan, cardType) {
        this.pozitivan = pozitivan;
        this.cardType = cardType;
    }
    profiltriraj(instancaKarte) {
        if (instancaKarte.tipKarte != this.cardType) {
            return !this.pozitivan; //Ako je karta razlicitog tipa treba da vrati false ako nema negacije ispred, a true ako ima
        }
        return this.pozitivan;
    }
}
function profiltrirajSve(filteriZaSelekciju, instancaKarte) {
    //PORAZMISLITI O OVIM IFOVIMA
    if (filteriZaSelekciju.length == 0) return true;
    if (filteriZaSelekciju[0].length == 0) return true;
    for (var i = 0; i < filteriZaSelekciju.length; i++) {
        var vr = true;
        for (var j = 0; j < filteriZaSelekciju[i].length; j++) {
            if (!filteriZaSelekciju[i][j].profiltriraj(instancaKarte)) {
                vr = false;
                break;
            }
        }
        if (vr == true)
            return true;
    }
    return false;
}