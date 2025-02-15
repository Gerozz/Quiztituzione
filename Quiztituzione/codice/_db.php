<?php

// Recupera le credenziali dalle variabili d'ambiente
$host = 'ep-yellow-unit-a2bihjd2-pooler.eu-central-1.aws.neon.tech';
$dbname = 'neondb';
$user = 'neondb_owner';
$password = 'npg_YuD2Hgovf1XQ';
$sslmode = 'require';

// Costruisce la DSN (Data Source Name) per PostgreSQL
$dsn = "pgsql:host=$host;dbname=$dbname;sslmode=$sslmode";

try {
    // Crea un'istanza di PDO
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Abilita la gestione delle eccezioni
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC // Imposta il metodo di fetch predefinito
    ]);
    
    echo "Connessione riuscita!";
    
    // Esempio di query
    $query = "SELECT * FROM utenti";
    $stmt = $pdo->query($query);
    $results = $stmt->fetchAll();
    
    foreach ($results as $row) {
        echo "<pre>" . print_r($row, true) . "</pre>";
    }

} catch (PDOException $e) {
    // Gestisce gli errori di connessione
    echo "Errore di connessione: " . $e->getMessage();
    exit;
}
