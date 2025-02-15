<?php
    header("Pragma: no-cache");
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0, s-maxage=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
?>
<?php
    session_start();
    
    include("_db.php");
    
    function sendJSON($data) {
        echo json_encode($data);
        exit;
    }

    function checkSession() {
        if (!isset($_SESSION['user_id'])) {
            sendJSON(["error" => 1, "message" => "Utente non autenticato"]);
        }
        return true;
    }

    try {
        // Usa la connessione PDO dal file _db.php
        if (!$pdo) {
            sendJSON(["error" => 1, "message" => "Errore di connessione al database"]);
        }

        if (!isset($_GET["op"])) {
            sendJSON(["error" => 1, "message" => "Operazione non specificata"]);
        }

        $ret = array(); 
        
        switch($_GET["op"]) {
            case "register":
                if(isset($_POST["nome"]) && isset($_POST["cognome"]) && isset($_POST["mail"]) && isset($_POST["password"])) {
                    $passwordHash = sha1($_POST["password"]);
                    
                    // Verifica se l'email esiste già
                    $q = $conn->prepare("SELECT mail FROM Utente WHERE mail = ?");
                    $q->bind_param("s",[$_POST["mail"]]);
                    $q->execute();
                    $result = $q->get_result();
                    if($result->num_rows > 0) {
                        array_push($ret, ["error" => 1, "message" => "Username già esistente"]);
                    } else {
                        // Inserisce il nuovo utente
                        $q = $conn->prepare("INSERT INTO Utente (nome, cognome, mail, password) VALUES (?, ?, ?, ?)");
                        $q->bind_param("ssss",[$_POST["nome"], $_POST["cognome"], $_POST["mail"], $passwordHash]);
                        $q->execute();
                        array_push($ret, ["error" => 0, "message" => "Utente registrato con successo"]);
                    }
                } else {
                    array_push($ret, ["error" => 1, "message" => "Parametri mancanti"]);
                }
                break;

            case "login":
                if (isset($_POST["mailLog"]) && isset($_POST["passwordLog"])) {
                    $username = $_POST["usernameLog"];
                    $passwordHash = sha1($_POST["passwordLog"]);

                    $q = $pdo->prepare("SELECT * FROM Utente WHERE username = ? and password = ?");
                    $q->bindParam("ss", $mail, $password);
                    $q->execute();
                    $result = $q->get_result();
                    if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $_SESSION['user_id'] = $row['id'];
                        $_SESSION['mail'] = $row['mail'];
                        array_push($ret, [
                            "error" => 0, 
                            "message" => "Login effettuato con successo",
                            "session" => $_SESSION
                        ]);
                    } else {
                        array_push($ret, ["error" => 1, "message" => "Credenziali non valide"]);
                    }
                    $q->close();
                } else {
                    array_push($ret, ["error" => 1, "message" => "Parametri mancanti"]);
                }
                break;

            case "logout":
                session_start();
                // Distrugge la sessione
                session_unset();
                array_push($ret, ["success" => true, "message" => "Logout effettuato con successo"]);
                break;

            case "check_session":
                if(isset($_SESSION["user_id"])) {
                    array_push($ret, [
                        "error" => 0, 
                        "logged" => true,
                        "user" => [
                            "id" => $_SESSION["user_id"],
                            "mail" => $_SESSION["mail"]
                        ]
                    ]);
                } else {
                    array_push($ret, ["error" => 0, "logged" => false]);
                }
                break;

            default:
                array_push($ret, ["error" => 1, "message" => "Operazione non valida"]);
                break;
        }
        
        // Invia la risposta JSON
        echo json_encode($ret[0]);
        
    } catch (Exception $e) {
        array_push($ret, ["error" => 1, "message" => "Errore del server: " . $e->getMessage()]);
        echo json_encode($ret[0]);
    }

    if (isset($pdo)) {
        $pdo = null;
    }
?>