<?php
// This file connectionMYSQLI.php is adapted from http://php.net/manual/en/mysqli.examples-basic.php
// The rest of the PHP files are inspired by http://php.net/manual/en/mysqli.examples-basic.php, http://php.net/manual/en/mysqli.query.php, and https://www.w3schools.com/php/func_mysqli_query.asp

// allowing access
header("Access-Control-Allow-Origin: *");

// using the object-oriented MySQLi method of connecting to the database
$mysqli = new mysqli("", "", "", "");

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
?>