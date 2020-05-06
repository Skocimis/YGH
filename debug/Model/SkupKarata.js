class CardZone {
    //cards - niz instanci karata
    constructor(cards, x, y, w, h) {
        if (cards.constructor == Deck) {
            this.cards = [];
            for (var i = 0; i < deck.cards.length; i++) {
                this.cards.push(new InstancaKarte(deck.cards[i]));
            }
        }
        else this.cards = cards;
        this.x = x;
        this.y = y;
        if (arguments.length == 3) {
            this.w = MonsterCardW;
            this.h = MonsterCardH;
        }
        else {
            this.w = w;
            this.h = h;
        }
    }
    crtaj(ctx) {
        if (this.cards.length == 0) {
            //prikaziRed(this.x+" "+this.y);
        }
        else {
            this.cards[0].crtaj(ctx, this.x, this.y, this.w, this.h);
        }
    }
    crtajO(ctx) {
        if (this.cards.length == 0) {
            //prikaziRed(this.x+" "+this.y);
        }
        else {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(Math.PI);
            this.cards[0].crtaj(ctx, -this.w, -this.h, this.w, this.h);
            ctx.restore();
        }
    }
    crtajU(ctx) {
        ctx.drawImage(slikaselektovane, 0, 0, 400, 580, this.x, this.y, this.w, this.h);
    }
    getCard(i) {
        if (arguments.length == 0) {
            return this.cards[0].karta;
        }
        return this.cards[i].karta;
    }
    getCardInstance(i) {
        if (arguments.length == 0) {
            return this.cards[0];
        }
        return this.cards[i];
    }
    promesaj() {
        this.cards.sort(() => Math.random() - 0.5);
    }
    vuci() {
        return this.cards.shift();
    }
    premesti(skup, indeks) {
        /*if (skup.constructor === SkupKarata) {
            if (indeks.constructor === Array) {
                indeks.sort((a, b) => b - a);
                indeks.forEach(el => {
                    this.cards.unshift(skup.cards.splice(el, 1)[0]);
                });
            }
            else {
                this.cards.unshift(skup.cards.splice(indeks, 1)[0]);
            }
        }
        else */
        if (skup.constructor === CardZone) {
            if (indeks.constructor === Array) {
                indeks.sort((a, b) => b - a);
                indeks.forEach(el => {
                    this.cards.unshift(skup.cards.splice(el, 1)[0]);
                });
            }
            else {
                this.cards.unshift(skup.cards.splice(indeks, 1)[0]);
            }
        }
        else if (skup.constructor === Array) {
            if (skup.length > 0 && skup[0].constructor === CardZone) {
                if (indeks.constructor === Array) {
                    indeks.forEach(el => {
                        skup[el].cards.forEach(element => {
                            this.cards.unshift(element);
                        });
                        skup[el].cards = [];
                    });
                }
                else {
                    this.cards.unshift(skup.cards.splice(indeks, 1)[0]);
                }
            }
        }
    }
}