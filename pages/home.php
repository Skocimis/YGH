<?php //ovo ce kasnije gore
    require_once "../utils/db.php";
    require_once "../utils/cookie.php";

    if (!nadjeni($conn)) {
        echo "ne radi";
        header("LOCATION: http://localhost/YGH/pages/loginpage.php");
    } 
    ?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <p>Ok, prijavljen si</p>
    </body>
</html>