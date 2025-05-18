<?php
session_start(); 
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0, s-maxage=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header('Content-Type: application/json; charset=utf-8');
include "_db.php";

if (!isset($_GET["op"])) {
    $ret = ["error" => 1];
} else {
    try {
        $conn = getDBConnection();

        switch ($_GET["op"]) {
            case "checkLogin":
                if ($_SESSION["loggedIn"]) {
                    echo json_encode(["status" => "loggedIn", "username" => $_SESSION["username"]]);
                } else {
                    echo json_encode(["status" => "loggedOut"]);
                }
                return;

            case "login":
                if (isset($_POST["usernameLog"]) && isset($_POST["passwordLog"])) {
                    $username = strtolower(trim($_POST["usernameLog"]));
                    $password = sha1($_POST["passwordLog"]);
                    $q = $conn->prepare("SELECT * FROM utente WHERE mail=? AND password=?");
                    $q->bind_param("ss", $username, $password);
                    $q->execute();
                    $result = $q->get_result();
                    $trovato = $result->num_rows > 0;
                    $conn->close();

                    if ($trovato) {
                        $_SESSION["loggedIn"] = TRUE;
                        $_SESSION["mail"] = $username;
                        $_SESSION["username"] = $username;
                        $ret = ["error" => 0, "status" => "loggedIn", "username" => $_SESSION["username"]];
                    } else {
                        $ret = ["error" => 1, "status" => "loggedOut", "message" => "Parametri errati"];
                    }
                } else {
                    $ret = ["error" => 1, "message" => "Parametri mancanti"];
                }
                break;

            case "register":
                if (isset($_POST["username"], $_POST["cognome"], $_POST["mail"], $_POST["password"], $_POST["confermaPassword"])) {
                    $username = strtolower(trim($_POST["username"]));
                    $cognome = strtolower(trim($_POST["cognome"]));
                    $mail = trim($_POST["mail"]);
                    $hashpassword = $_POST["password"];
                    $confermaPassword = $_POST["confermaPassword"];

                    if ($hashpassword != $confermaPassword) {
                        $ret = ["error" => 1, "message" => "Le password non coincidono"];
                    } else {
                        $hashpassword = sha1($hashpassword);
                        $q = $conn->prepare("INSERT INTO utente(nome, cognome, mail, password, certificato) VALUES (?, ?, ?, ?, 0)");
                        $q->bind_param("ssss", $username, $cognome, $mail, $hashpassword);
                        $inserito = FALSE;

                        try {
                            $q->execute();
                            $inserito = TRUE;
                        } catch (Exception $e) {}

                        $conn->close();

                        if ($inserito) {
                            $_SESSION["certificato"] = 0;
                            $_SESSION["loggedIn"] = TRUE;
                            $_SESSION["username"] = $username;
                            $_SESSION["mail"] = $mail;
                            $ret = ["error" => 0, "status" => "loggedIn", "message" => "Utente registrato correttamente", "username" => $_SESSION["username"]];
                        } else {
                            $ret = ["error" => 1, "message" => "Registrazione non effettuata", "status" => "loggedOut"];
                        }
                    }
                } else {
                    $ret = ["error" => 1, "message" => "Parametri mancanti"];
                }
                break;

            case "carica_risposte":
                if (isset($_POST["risposte"])) {
                    $risposte = json_decode($_POST["risposte"], true);
                    $q = $conn->prepare("INSERT INTO domandequiz(domanda, categoria, sottocategoria, risposta) VALUES (?, ?, ?, ?)");

                    foreach ($risposte as $r) {
                        $q->bind_param("ssss", $r['domanda'], $r['categoria'], $r['sottocategoria'], $r['risposta']);
                        $q->execute();
                    }

                    $conn->close();

                    if ($q->affected_rows > 0) {
                        $ret = ["error" => 0, "status" => "loggedIn", "message" => "Quiz caricato correttamente"];
                    } else {
                        $ret = ["error" => 1, "message" => "Quiz non caricato"];
                    }
                } else {
                    $ret = ["error" => 1, "message" => "Parametri mancanti", "status" => "loggedOut"];
                }
                break;

            case "controlloRisposte":
                if (isset($_POST["risposte"])) {
                    $risposte = $_POST["risposte"];
                    $q = $conn->prepare("SELECT * FROM quiz WHERE id=?");
                    $q->bind_param("i", $risposte[0]);
                    $q->execute();
                    $result = $q->get_result();

                    if ($result->num_rows == 0) {
                        $ret = ["error" => 1, "message" => "ID quiz non valido"];
                        break;
                    }

                    $row = $result->fetch_assoc();
                    $conn->close();

                    if ($row['corretta'] == 1) {
                        $_SESSION["certificato"] = 1;
                        $_SESSION["loggedIn"] = TRUE;
                        $_SESSION["username"] = $_SESSION["username"] ?? '';
                        $_SESSION["mail"] = $_SESSION["mail"] ?? '';
                        $ret = ["error" => 0, "status" => "loggedIn", "message" => "Quiz superato, certificato rilasciato", "username" => $_SESSION["username"]];
                    } else {
                        $ret = ["error" => 1, "message" => "Quiz non superato", "status" => "loggedOut"];
                    }
                } else {
                    $ret = ["error" => 1, "message" => "Parametri mancanti"];
                }
                break;

            case "logout":
                session_unset();
                setcookie("PHPSESSID", "", 0, "/");
                echo json_encode(["status" => "loggedOut"]);
                return;

            default:
                $ret = ["error" => "Invalid value for op"];
        }
    } catch (Exception $e) {
        $ret = ["error" => 1, "message" => "Errore connessione al db", "details" => $e->getMessage()];
    }
}

echo json_encode($ret);
?>
