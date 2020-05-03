//Tok igre, draw, standby, main1, battle, main2, end, protivnikovpotez
/*var mousePos = {
    x: null,
    y: null
}

c.addEventListener("mousemove", function(e) {
    mousePos.x = e.clientX - c.getBoundingClientRect().left;
    mousePos.y = e.clientY - c.getBoundingClientRect().top;
});



function pokreniupdate() {

    c.onclick = function() {
        if (mousePos.x > 450 && mousePos.x < 1734 && mousePos.y > 820 && mousePos.y < 908)
            update();
    };


    //Kod da se prikaze velika karta sa strane ne radi vuci u ruku
    c.mousemove = function() {
        
        }
    }

}

function update() {
    crtanjedugmadi();

    var prizivanje = true;
    if (izvlacenje) {
        imgsvetlecedugme.src = 'slike/interfejs/AktiviranaDugmad/Dizvlacenje.png';
        imgsvetlecedugme.onload = function() {
            ctx.drawImage(imgsvetlecedugme, 450, 820);
        }

        if (mojpotez) {
            if (trenutniDek.cards.length == 0)
                alert("Izgubio si");
            else {


                ruka.push(trenutniDek.vuci());
                ruka[indexkarteuruci].crtaj(c, ctx, 500 + indexkarteuruci * 185, 1550);
                indexkarteuruci++;

            }

        } else if (protivnikipovpotez) {
            if (protivnickiDek.cards.length == indexkarteuprotivnickojruci)
                alert("Pobedio si"); //ako ostane protivnik bez karata
            else {
                indexkarteuprotivnickojruci++;
                ctx.drawImage(img2, 500 + indexkarteuprotivnickojruci * 185, -20);
                protivnikovaruka.push(protivnickiDek.vuci());
            }

        }

        izvlacenje = false;
        standby = true;

    } else if (standby) {
        imgsvetlecedugme.src = 'slike/interfejs/AktiviranaDugmad/Dcekanje.png';
        imgsvetlecedugme.onload = function() {
            ctx.drawImage(imgsvetlecedugme, 675, 820);
        }
        standby = false;
        mainphase1 = true;
    } else if (mainphase1) {
        mainphase1 = false;
        battle = true;
        imgsvetlecedugme.src = 'slike/interfejs/AktiviranaDugmad/Dglavna1.png';
        imgsvetlecedugme.onload = function() {
            ctx.drawImage(imgsvetlecedugme, 900, 820);
        }

        if (mojpotez) {
            if (mousePos.x > 500 && mousePos.x < 500 + indexkarteuruci * 185 && mousePos.y > 1550 && mousePos.y < 1850 && prizivanje == true) {
                prizivanje = false;
                if (mousePos.x > 1795) {

                } else if (mousePos.x > 1610) {

                } else if (mousePos.x > 1425) {

                } else if (mousePos.x > 1240) {

                } else if (mousePos.x > 1055) {

                } else if (mousePos.x > 870) {

                } else if (mousePos.x > 685) {

                } else {

                }

            }
        } else if (protivnikipovpotez) {
            if (prizivanje) {
                prizivanje = false;
            }
        }
    } else if (battle) {
        imgsvetlecedugme.src = 'slike/interfejs/AktiviranaDugmad/Dborba.png';
        imgsvetlecedugme.onload = function() {
            ctx.drawImage(imgsvetlecedugme, 1120, 820);
        }
        battle = false;
        mainphase2 = true;
    } else if (mainphase2) {
        imgsvetlecedugme.src = 'slike/interfejs/AktiviranaDugmad/Dglavna2.png';
        imgsvetlecedugme.onload = function() {
            ctx.drawImage(imgsvetlecedugme, 1340, 820);
        }
        if (mojpotez) {
            if (prizivanje) {
                prizivanje = false;
            }
        } else if (protivnikipovpotez) {
            if (prizivanje) {
                prizivanje = false;
            }
        }
        mainphase2 = false;
        endturn = true;
    } else if (endturn) {
        imgsvetlecedugme.src = 'slike/interfejs/AktiviranaDugmad/Dkraj.png';
        imgsvetlecedugme.onload = function() {
            ctx.drawImage(imgsvetlecedugme, 1550, 820);
        }
        endturn = false;
        izvlacenje = true;
        if (obrt) {
            mojpotez = false;
            protivnikipovpotez = true;
            obrt = false;
        } else {
            mojpotez = true;
            protivnikipovpotez = false;
            obrt = true;
        }
    }
}


//standby phase - pitanje za efekte
//main phase 1 - cekanje odluka igraca

function crtanjedugmadi() {
    imgdugmad.src = 'slike/interfejs/Dugmad.png';
    imgdugmad.onload = function() {
        ctx.drawImage(imgdugmad, 450, 820);
    }
}

function render() {
    ctx.clearRect(0, 0, 3200, 2400);
    var img = new Image();
    img.src = 'slike/interfejs/teren.jpg';
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }


    setTimeout(function() {
        img2.src = 'slike/interfejs/pozadina.jpg';
        img2.onload = function() {
            ctx.drawImage(img2, 50, 80);
            ctx.drawImage(img2, 1954, 1385);

        }
    }, 100);
    setTimeout(function() {
        crtanjedugmadi();
    }, 100);

    //prvih 5 karata tvoja ruka
    setTimeout(function() {
        for (var i = 0; i < 5; i++) {
            ruka.push(trenutniDek.vuci());
            ruka[i].crtaj(c, ctx, 500 + i * 185, 1550);
            indexkarteuruci = i + 1;
        }
    }, 200);
    //prvih 5 karata protivnikova ruka

    setTimeout(function() {
        for (var i = 0; i < 5; i++) {
            ctx.drawImage(img2, 500 + i * 185, -20);
            protivnikovaruka.push(protivnickiDek.vuci());

            indexkarteuprotivnickojruci = i + 1;
        }
    }, 200);

}

*/








initialize();




//handleEvents();

//pokreniupdate();