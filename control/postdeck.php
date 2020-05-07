<?php
    if (isset($_POST['id_korisnika']) && isset($_POST['id_korisnika']) && isset($_POST['id_korisnika']) && isset($_POST['id_korisnika'])) {
        echo json_encode(get_decks($_POST['id_korisnika']));
    }
?>