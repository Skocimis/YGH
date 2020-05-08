<?php
    require_once "../utils/db.php";
    class Card {
        public $id_karte;
        public $naziv;
        public $nivo;
        public $atribut;
        public $tip;
        public $napad;
        public $odbrana;
        public $opis;
    }
    function get_all_cards() {
        $conn = PoveziSeSaBazom();
        $karte = array();
        $query = "SELECT * FROM karte";
        $result = $conn->query($query);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $karta = new Card();
                $karta->id_karte = $row["id_karte"];
                $karta->naziv = $row["naziv_karte"];
                $karta->nivo = $row["nivo"];
                $karta->atribut = $row["atribut"];
                $karta->tip = $row["tip"];
                $karta->napad = $row["napad"];
                $karta->odbrana = $row["odbrana"];
                $karta->opis = $row["opis"];

                array_push($karte, $karta);
            }
        }
        $conn->close();
        return $karte;
    }
?>