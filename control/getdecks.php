<?php
    require_once "../models/deck.php";

    if(isset($_POST['id_korisnika'])) {
        echo json_encode(get_decks($_POST['id_korisnika']));
    }
?>