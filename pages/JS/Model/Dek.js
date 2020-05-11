class Deck {
    constructor(x) {
        {
            this.id_deka = 0; //id_deka koji je procitan iz baze, ne verujem da ce trebati, ali nek bude tu
            this.naziv = ""; //Dek treba da ima i naziv, mozda ni ovo nece da bude potrebno
            this.cards = [];
            if (x != -1) {
                this.cards = v_dekovi[x].karte_u_deku.split(" ").map(a => parseInt(a));
                this.cards.pop();
            } else {
                this.cards.push(1000002);
                this.cards.push(1000002);
                this.cards.push(1000002);
                this.cards.push(1000003);
                this.cards.push(1000003);
                this.cards.push(1000003);
                this.cards.push(1000005);
                this.cards.push(1000005);
                this.cards.push(1000005);
                this.cards.push(1000014);
                this.cards.push(1000014);
                this.cards.push(1000014);
                this.cards.push(1000011);
                this.cards.push(1000011);
                this.cards.push(1000011);
                this.cards.push(1000017);
                this.cards.push(1000017);
                this.cards.push(1000017);


                /* PRVI DEK U OVOJ IGRICI
                this.cards.push(1000001);
                this.cards.push(1000002);
                this.cards.push(1000003);
                this.cards.push(1000004);
                this.cards.push(1000005);
                this.cards.push(1000006);
                this.cards.push(1000001);
                this.cards.push(1000002);
                this.cards.push(1000003);
                this.cards.push(1000004);
                this.cards.push(1000005);
                this.cards.push(1000006);
                this.cards.push(1000001);
                this.cards.push(1000002);
                this.cards.push(1000003);
                this.cards.push(1000004);
                this.cards.push(1000005);
                this.cards.push(1000006);*/
            }
        }
    }

    //Najverovatnije dek imamo kao klasu umesto obicnog niza samo zbog ove funkcije, ali vrv ce nam u buducnosti trebati za nesto. 
    //Dodaj neka nova svojstva ako ti trebaju za deck editor.
    generate_deck(x) {
        console.log(x != -1);
        //Citanje deka iz baze
    }
}