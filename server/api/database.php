<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'YOUR_PASSWORD');
define('DB_NAME', 'customer_survey');

function connect() {
    $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

}
