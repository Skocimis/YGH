function proveriPobedu() {
    if (igraci.Player.ZivotniPoeni <= 0) {
        prikaziRed("HAHA IZGUBIO SI");
    }
    if (igraci.Enemy.ZivotniPoeni <= 0) {
        prikaziRed("POBEDAAAAAAA");
    }
}

initialize();