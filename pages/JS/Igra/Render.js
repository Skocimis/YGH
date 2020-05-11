function render() {
    //Pozadina
    ctx.drawImage(slikaterena, 0, 0);

    //TEREN
    for (var i = 0; i < 14; i++) {
        teren[i].crtajO(ctx);
        if (SelektovaniIndeksi.includes(i)) {
            teren[i].crtajU(ctx);
        }
    }
    for (var i = 14; i < 28; i++) {

        teren[i].crtaj(ctx);
        if (SelektovaniIndeksi.includes(i)) {
            teren[i].crtajU(ctx);
        }
    }

    //KARTE U RUCI
    for (var i = 0; i < teren[CardZones.Hand].cards.length; i++) {
        teren[CardZones.Hand].cards[i].crtaj(ctx, xruke + i * wkarteuruci, yruke, wkarteuruci, hkarteuruci, "HAHA SAD CE KARTA DA BUDE OTKRIVENA");
    }

    //Dugmici za faze
    ctx.drawImage(dugmicizafaze, xdugmadi, ydugmadi);
    ctx.drawImage(slikaaktivnefaze, xdugmadi + faza * wdugmeta, ydugmadi);

    dijalozi.forEach(element => {
        if (element.constructor.name == 'HrpaOpcija') {
            element.crtaj(ctx);
        }
    });

    //Zivotni poeni
    ctx.fillText(igraci.Player.ZivotniPoeni, HPX, HPY);
    ctx.fillText(igraci.Enemy.ZivotniPoeni, HPXP, HPYP);
}