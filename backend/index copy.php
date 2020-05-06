<?php
    $username = "root";
    $password = "";
    $db = "ygh";
    $adr = "localhost";
    
    $tableName = $_GET["table_name"];
    
    $conn = new mysqli($adr, $username, $password, $db);
    
    if($conn->connect_error){
        die("Nije moguce povezati se na bazu");
    }
    
    $query = "SELECT * FROM ".$tableName;
    $result = $conn->query($query);
    
    if($result->num_rows > 0){                          // row["year"] = 4, row["class_index"] = 2, row["id] = 2, row["teacher_id"]
        while($row = $result->fetch_assoc()){
            foreach($row as $key => $value){
                echo $key.": ".$value." ";
            }
            echo "<br>";
        }
    }
    else{
        echo "Nema redova u tabeli.";
    }

    $conn->close();
    if($_POST[''])

?>
<html>
    <body>
        
    </body>
</html>
Da uradim tu bazu sad
Kako tacno. 
Kako to bese ide msm 