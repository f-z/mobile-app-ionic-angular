<?php
  include_once "connectionMYSQLI.php"; // this will include the connection .php file

  $request_body = file_get_contents('php://input');
  $variables = explode("&", $request_body);
  $username = $variables[0];
  $running = $variables[1];
  $yoga = $variables[2];
  $pilates = $variables[3];
  $cycling = $variables[4];
  $weights = $variables[5];

  /* prepared statement, stage 1: prepare */
  if (!($stmt = $mysqli->prepare("DELETE FROM preference WHERE username=?;"))) {
    echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
  }

  if (!$stmt->bind_param("s", $username)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
  }

  if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
  }

  if ($running == 'true') {
    if (!($stmt = $mysqli->prepare("INSERT INTO preference (username, type) VALUES (?, 'Running'); "))) {
      echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
    }

    if (!$stmt->bind_param("s", $username)) {
      echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
    }

    if (!$stmt->execute()) {
       echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }
  }

  if ($yoga == 'true') {
    if (!($stmt = $mysqli->prepare("INSERT INTO preference (username, type) VALUES (?, 'Yoga'); "))) {
      echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
    }

    if (!$stmt->bind_param("s", $username)) {
      echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
    }

    if (!$stmt->execute()) {
       echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }
  }

  if ($pilates == 'true') {
    if (!($stmt = $mysqli->prepare("INSERT INTO preference (username, type) VALUES (?, 'Pilates'); "))) {
      echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
    }

    if (!$stmt->bind_param("s", $username)) {
      echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
    }

    if (!$stmt->execute()) {
       echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }
  }

  if ($cycling == 'true') {
    if (!($stmt = $mysqli->prepare("INSERT INTO preference (username, type) VALUES (?, 'Cycling'); "))) {
      echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
    }

    if (!$stmt->bind_param("s", $username)) {
      echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
    }

    if (!$stmt->execute()) {
       echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }
  }

  if ($weights == 'true') {
    if (!($stmt = $mysqli->prepare("INSERT INTO preference (username, type) VALUES (?, 'Weights'); "))) {
      echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
    }

    if (!$stmt->bind_param("s", $username)) {
      echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
    }

    if (!$stmt->execute()) {
       echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }
  }
?>
