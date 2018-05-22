<?php
  include_once "connectionMYSQLI.php"; // this will include the connection .php file

  $request_body = file_get_contents('php://input');
  $variables = explode("&", $request_body);
  $username = $variables[0];
  $email = $variables[1];
  $password = $variables[2];
  $ageGroup = $variables[3];
  $height = $variables[6];
  $weight = $variables[7];
  $sharingData = $variables[8];

    if (!($stmt = $mysqli->prepare("INSERT INTO user (username, password, email, ageGroup, height, weight, sharingData) VALUES (?, ?, ?, ?, ?, ?, ?); "))) {
      echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
    }

    if (!$stmt->bind_param("sssssssss", $username, $password, $email, $ageGroup, $height, $weight, $sharingData)) {
      echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
    }

    if (!$stmt->execute()) {
       echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }
?>
