<?php

    if(isset($_POST["username"])&&isset($_POST["password"])&&isset($_POST["email"]))
    {

        echo "poslati podaci";
    }
    else
    {
        header("LOCATION: http://localhost/YGH/backend/loginpage.php");
    }
?>