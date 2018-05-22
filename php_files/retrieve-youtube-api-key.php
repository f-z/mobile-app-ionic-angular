<?php
    include_once "connectionMYSQLI.php"; // this will include the connection .php file  

    $sql = "select * from youtubeapikey";
    
    $result = mysqli_query($mysqli, $sql) or die("Error in querying " . mysqli_error($mysqli));
    $data = array();
    while($row = mysqli_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);  
  
    mysqli_close($mysqli);
?>