<?php
    include_once "connectionMYSQLI.php"; // this will include the connection .php file

    /* prepared statement, stage 1: prepare */
    if (!($stmt = $mysqli->prepare("UPDATE user SET sharingData =? WHERE username =?"))) {
        echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
    }

    $request_body = file_get_contents('php://input');
    $variables = explode("&", $request_body);
    $username = $variables[0];
    $privacy = $variables[1];

    // debugging statements
    print_r($request_body);
    echo $username;
    echo 'username';
    echo $privacy;
    echo 'privacy';

    if (!$stmt->bind_param("ss", $privacy, $username)) {
        echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
    }

    if (!$stmt->execute()) {
        echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }
?>
