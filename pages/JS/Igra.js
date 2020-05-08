function proveriPobedu() {
    if (igraci.Player.ZivotniPoeni <= 0) {
        var poraz = document.getElementById("dizajnzaporaz");
        poraz.style.display = "block";

    }
    if (igraci.Enemy.ZivotniPoeni <= 0) {
        var pobeda = document.getElementById("dizajnzapobedu");
        pobeda.style.display = "block";


    }
    render();
}

loadCards();
loadUserData();