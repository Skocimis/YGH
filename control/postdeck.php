<?php
require_once "../models/deck.php";

$entityBody = file_get_contents('php://input');

echo post_deck($entityBody);
