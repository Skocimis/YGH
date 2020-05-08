<?php

    function postaviHeader($lokacija)
    {
        if($_SERVER['REMOTE_ADDR']=='192.168.1.42')
        {
            header("LOCATION: http://192.168.1.42:25565/YGH/".$lokacija);
        }
        else if($_SERVER['REMOTE_ADDR']=='192.168.1.63')
        {
            header("LOCATION: http://ygoneo.rs:25565/YGH/".$lokacija);
        }
        else
        {
            header("LOCATION: http://178.222.115.22:25565/YGH/".$lokacija);
        }
    }
?>