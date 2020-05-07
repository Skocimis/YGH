<?php
    require_once "../utils/db.php";
    require_once "../utils/cookie.php";
    require_once "../utils/iputils.php";
    require_once "../models/card.php";

    echo json_encode(get_all_cards());
?>