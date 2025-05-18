<?php
// Parametri di connessione Aiven
$db_hostname = "quiztituzione-progetti2025.f.aivencloud.com";
$db_port     = 20611;
$db_username = "avnadmin";
$db_password = "AVNS_uG9kyB-N3ZpDua1pJQS";
$db_name     = "defaultdb";
$db_ssl_ca   = __DIR__ . "/ca.pem"; // Percorso del certificato CA

// Funzione per restituire la connessione MySQLi con SSL
function getDBConnection() {
    global $db_hostname, $db_port, $db_username, $db_password, $db_name, $db_ssl_ca;

    $conn = mysqli_init();
    $conn->ssl_set(null, null, $db_ssl_ca, null, null);

    if (!$conn->real_connect($db_hostname, $db_username, $db_password, $db_name, $db_port, null, MYSQLI_CLIENT_SSL)) {
        throw new Exception("Connection failed: " . mysqli_connect_error());
    }

    return $conn;
}
?>
