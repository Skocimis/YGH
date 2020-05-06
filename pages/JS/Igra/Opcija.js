//OVDE SAM STAO

class Opcija {
    constructor(tekst, efekat) {
        this.tekst = tekst;
        this.efekat = efekat;
        this.params = [];
        for (var i = 2; i < arguments.length; i++) {
            this.params.push(arguments[i]);
        }
        this.slika = new Image();
        this.slika.src = 'JS/Slike/Interfejs/Opcije/' + tekst + '.png';
    }
    crtaj(ctx, x, y, w, h) {
        this.slika.onload = function() {
            ctx.drawImage(this, 0, 0, this.width, this.height, x, y, w, h);
        }

    }
}
class HrpaOpcija {
    constructor(opcije, mandatory, x, y, wOpcije, hOpcije, razmak, stackType, stackDirection) {
        this.opcije = opcije;
        this.mandatory = mandatory;
        this.x = x;
        this.y = y;
        this.wOpcije = wOpcije;
        this.hOpcije = hOpcije;
        this.razmak = razmak;
        this.stackType = stackType;
        this.stackDirection = stackDirection;
    }

    //Moze da se razdvoji u redove
    get width() { return (this.opcije.length == 0) ? 0 : (this.stackType == StackType.VerticalStack) ? (this.wOpcije) : (this.stackDirection) * (this.wOpcije + (this.opcije.length - 1) * (this.wOpcije + this.razmak)); }
    get height() { return (this.opcije.length == 0) ? 0 : (this.stackType == StackType.HorizontalStack) ? (this.hOpcije) : (this.stackDirection) * (this.hOpcije + (this.opcije.length - 1) * (this.hOpcije + this.razmak)); }
    elemX(index) {
        if (this.stackType == StackType.VerticalStack) {
            return this.x;
        } else {
            return this.x + index * this.stackDirection * (this.wOpcije + this.razmak);
        }
    }
    elemY(index) {
        if (this.stackType == StackType.HorizontalStack) {
            return this.y;
        } else {
            //prikaziRed(this.stackDirection);
            return this.y + index * this.stackDirection * (this.hOpcije + this.razmak);
        }
    }
    elemW() {
        if (this.stackType == StackType.HorizontalStack && this.stackDirection == StackDirection.Negative) {
            return -this.wOpcije;
        }
        return this.wOpcije;
    }
    elemH() {
            if (this.stackType == StackType.VerticalStack && this.stackDirection == StackDirection.Negative) {
                return -this.hOpcije;
            }
            return this.hOpcije;
        }
        //height = (this.opcije.length == 0) ? 0 : (this.stackType==StackType.VerticalStack)?(true):(false);
    crtaj(ctx) {
        var tx = this.x,
            ty = this.y;
        if (this.stackType == StackType.HorizontalStack) {
            this.opcije.forEach(element => {
                element.crtaj(ctx, tx, ty, this.wOpcije, this.hOpcije);
                tx += this.stackDirection * (this.wOpcije + this.razmak);
            });
        } else if (this.stackType == StackType.VerticalStack) {
            this.opcije.forEach(element => {
                ty += this.stackDirection * (this.hOpcije + this.razmak);
                element.crtaj(ctx, tx, ty, this.wOpcije, this.hOpcije);
            });

        }
    }
}

//cardSources je niz indeksa iz terena (tj pokazivaca na zone karata) koje ulaze u izbor, a cardIndexes su svi selektovani indeksi iz tog zbira 
function makeCardSelectMenu() {

}

function CardSelectMenu(cardSources, cardIndexes) {
    var menu;

    menu.prikazKarata = new HrpaOpcija()
}

function drawCardSelectMenu(ctx, CardMenu) {

}