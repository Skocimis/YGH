<?php
require_once "../utils/db.php";


class Deck
{
    public $id_deka;
    public $naziv;
    public $karte_u_deku;
}

function get_decks($id_korisnika)
{

    $conn = PoveziSeSaBazom();
    $dekovi = array();

    $query = "SELECT id_deka, naziv, karte_u_deku FROM dekovi WHERE id_korisnika = " . $id_korisnika;
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $dek = new Deck();
            $dek->id_deka = $row["id_deka"];
            $dek->naziv = $row["naziv"];
            $dek->karte_u_deku = $row["karte_u_deku"];

            array_push($dekovi, $dek);
        }
    }
    $conn->close();
    return $dekovi;
}

function post_deck($deck_json)
{
    $conn = PoveziSeSaBazom();
    //echo $deck_json;
    $dek = json_decode($deck_json, true);
    //echo $deck_json;
    $id_deka = $conn->real_escape_string($dek["id_deka"]);
    $naziv = $conn->real_escape_string($dek["naziv"]);
    $karte_u_deku = $conn->real_escape_string($dek["karte_u_deku"]);
    $id_korisnika = $conn->real_escape_string($dek["id_korisnika"]);
    if ($id_deka == null)
        $query = "INSERT INTO dekovi VALUES (NULL, '$naziv', '$karte_u_deku', $id_korisnika)";
    else
        $query = "INSERT INTO dekovi VALUES ($id_deka, '$naziv', '$karte_u_deku', $id_korisnika)";
    $result = $conn->query($query);
    if ($result) {
        return "uspesno";
    } else {
        $query = "UPDATE dekovi SET karte_u_deku='$karte_u_deku' WHERE id_deka=$id_deka";
        $result = $conn->query($query);
        if ($result) {
            return "uspesno";
        } else {
            return $conn->error;
        }
    }
}
