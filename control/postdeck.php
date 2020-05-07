<!--  
    Kada korisnik posalje json deka (samo naziv, id_igraca
     i string sa kartama) on treba da se upise u bazu, 
     a ako vec postoji u bazi onda se tabela updatuje umesto 
     inserta
     
     Moze da bude nesto ovako, ukoliko JSON objekat sadrzi id deka 
     onda se radi UPDATE, a ako ga ne sadrzi onda treba da se
     napravi novi dek, ja cu da sredim slanje zahteva u js


     
     INSERT INTO dekovi (id_deka, naziv, karte_u_deku, id_korisnika)
      VALUES (NULL, '', '', '')
     id_deka je null zato sto se autoincrementuje
     
     UPDATE dekovi SET karte_u_deku=..., naziv=... WHERE id_deka= id deka
     Posle mozes da napravis i delete za dek, pogledaj DELETE http zahtev

-->

<?php
    
?>