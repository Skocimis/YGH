<?php
require_once "../utils/db.php";


class Deck
{
    private $id_deka;
    private $naziv;
    private $karte;

    function set_id($id_deka)
    {
        $this->id_deka = $id_deka;
    }
    function get_id()
    {
        return $this->id_deka;
    }
    function set_naziv($naziv)
    {
        $this->naziv = $naziv;
    }
    function get_naziv()
    {
        return $this->naziv;
    }
    function set_karte($karte)
    {
        $this->karte = $karte;
    }
    function get_karte()
    {
        return $this->karte;
    }
}

function get_decks($id_korisnika)
{

    $conn = PoveziSeSaBazom();
    $dekovi = new Deck[];

    $query = "SELECT id_deka, naziv, karte FROM dekovi WHERE id_korisnika = " . $id_korisnika;
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $dek = new Deck();
            $dek->set_id($row["id_deka"]);
            $dek->set_naziv($row["naziv"]);
            $dek->set_karte($row["karte"]);

            $dekovi . array_push($dek);
        }
    }
    $conn->close();
    return $dekovi;
}

function post_deck($deck_json)
{
    $conn = PoveziSeSaBazom();
    $dek = json_decode($deck_json);
    $id_deka = $conn->real_escape_string($dek["id_deka"]);
    $naziv = $conn->real_escape_string($dek["naziv"]);
    $karte_u_deku = $conn->real_escape_string($dek["karte_u_deku"]);
    $id_korisnika = $conn->real_escape_string($dek["id_korisnika"]);

    $query = "INSERT INTO dekovi VALUES ($id_deka, '$naziv', '$karte_u_deku', $id_korisnika)";
    $result = $conn->query($query);
    if ($result) {
        return "uspesno";
    } else {
        $query = "UPDATE dekovi SET  karte_u_deku='$karte_u_deku' WHERE $id_deka=id_deka";
        $result = $conn->query($query);
        if ($result) {
            return "uspesno";
        } else {
            return "neuspesno";
        }
    }
}
