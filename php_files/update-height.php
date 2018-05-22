<?php
    include_once "connectionMYSQLI.php"; // this will include the connection .php file

    /* prepared statement, stage 1: prepare */
    if (!($stmt = $mysqli->prepare("UPDATE user SET height =? WHERE username =?"))) {
        echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
    }

    $request_body = file_get_contents('php://input');
    $variables = explode("&", $request_body);
    $username = $variables[0];
    $height = $variables[1];

    // debugging statements
    print_r($request_body);
    echo 'username';
    echo $username;
    echo 'height';
    echo $height;

    if (!$stmt->bind_param("ss", $height, $username)) {
        echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
    }

    if (!$stmt->execute()) {
        echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }
?>
