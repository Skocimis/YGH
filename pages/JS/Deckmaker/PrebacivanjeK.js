function dole() {

    csvsvekarte.clearRect(0, 0, 500, 500);
    if (indekspomeranja < 1000030 - 15) //PRVI BROJ JE ID POSLEDNJE KARTE
        indekspomeranja = indekspomeranja + 5;
    kolona = 0;
    red = 0;
    render();

}

function gore() {
    csvsvekarte.clearRect(0, 0, 500, 500);
    if (indekspomeranja >= 1000005)
        indekspomeranja = indekspomeranja - 5;
    kolona = 0;
    red = 0;
    render();

}


function gore1() {
    csvsdek.clearRect(0, 0, 500, 500);
    if (indekspomeranja1 >= 5)
        indekspomeranja1 = indekspomeranja1 - 5;
    kolona1 = 0;
    red1 = 0;
    render1();
}

function dole1() {

    csvsdek.clearRect(0, 0, 500, 500);
    if (indekspomeranja1 < korisnickiDek.length - 15)
        indekspomeranja1 = indekspomeranja1 + 5;
    kolona1 = 0;
    red1 = 0;
    render1();
}

function Salji() {
    /*	$.post('OnoBuncino.php',{postdek:korisnickiDek},function()
    	{
    		$('#result').html(data);
    		
    		
    	});*/
}