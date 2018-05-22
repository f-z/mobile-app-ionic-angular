<?php
include_once "connectionMYSQLI.php"; // this will include the connection file

// preparing the sql statement to be executed
if (!($stmt = $mysqli->prepare("INSERT INTO contact (username, type, message) VALUES (?, ?, ?); "))) {
    echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
}

// retrieving the supplied parameters
$request_body = file_get_contents('php://input');
$variables = explode("&", $request_body);
$username = $variables[0];
$type = $variables[1];
$message = $variables[2];

// binding the parameters to the statement
if (!$stmt->bind_param("sss", $username, $type, $message)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

// executing the statement
if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}
?>