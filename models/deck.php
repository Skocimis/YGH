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

function get_deck($id_korisnika)
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
        echo "";
    }
    $conn->close();
    return $dekovi;
}
