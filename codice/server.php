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
        $conn = new mysqli($db_hostname, $db_username, $db_password, $db_name);

        if ($conn->connect_error) {
        echo json_encode(["error" => 1, "message" => "Errore di connessione al database"]);
        exit;
    }

    if (!isset($_GET["op"])) {
        echo json_encode(["error" => 1, "message" => "Operazione non specificata"]);
        exit;
    }


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
                        $ret = ["error" => 0, "status" => "loggedIn", "username" => $_SESSION["username"],$trovato];
                    } else {
                        $ret = ["error" => 1, "status" => "loggedOut", "message" => "Parametri errati",$trovato];
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

            case "controlloCertificato":
                if($_SESSION["loggedIn"]||$_SESSION["certificato"]==0){
                    $q=$conn->prepare("update utente set certificato=1 where mail=? ");
                    $q->bind_param("s",$_SESSION["mail"]);
                    $q->execute();
                    $conn->close();
                    if($q->affected_rows>0){
                        $_SESSION["certificato"]=1;
                        $ret=["error"=>0, "certificato"=>1,"status"=>"nuovo"];
                    }else{
                        $ret=["error"=>2,"certificato"=>0,"status"=>"vecchio","message"=>"Hai già ottenuto il certificato"];
                    }
                }else{
                    $ret=["error"=>1,"message"=>"Errore: utente non loggato"];
                }
                
                break;
            case "caricaDomandeC":
                    $q=$conn->prepare("select domande.id as id,categoria.categoria as sottocategoria,domande.testo as domanda,domande.risposta as risposta from domande join categoria on domande.sottocategoria=categoria.id where domande.categoria=1");
                try{
                    $q->execute();
                    $q = $q->get_result();
                    $elenco = [];
                    while ($r = $q->fetch_array()) {
                    $p = ["id"=>$r["id"],"categoria" => "Costituzione", "sottocategoria" => $r["sottocategoria"], "domanda" => $r["domanda"], "risposta" => $r["risposta"]];
                    array_push($elenco,$p);
                    }
                    $ret = ["error" => 0, "elenco" => $elenco];
                }catch (Exception $e){
                    $ret = ["error" => 1, "message" => "Errore di connessione al server"];
                }
                $q->close();
                break;

            case "caricaDomandeCG":
                    $q=$conn->prepare("select domande.id as id,categoria.categoria as sottocategoria,domande.testo as domanda,domande.risposta as risposta from domande join categoria on domande.sottocategoria=categoria.id where domande.categoria=2");
                try{
                    $q->execute();
                    $q = $q->get_result();
                    $elenco = [];
                    while ($r = $q->fetch_array()) {
                    $p = ["id"=>$r["id"],"categoria" => "Cultura Generale", "sottocategoria" => $r["sottocategoria"], "domanda" => $r["domanda"], "risposta" => $r["risposta"]];
                    array_push($elenco,$p);
                    }
                    $ret = ["error" => 0, "elenco" => $elenco];
                }catch (Exception $e){
                    $ret = ["error" => 1, "message" => "Errore di connessione al server"];
                }
                $q->close();
                break;

            case "creaQuiz":
                if (isset($_POST["categoria"])) {
                    $domande = $_POST["domande"];
                    $q = $conn->prepare("INSERT INTO quiz (utente, domande) VALUES (?, ?)");
                    $q->bind_param("ss", $_SESSION["mail"], $domande);
                    try {
                        $q->execute();
                        $ret = ["error" => 0, "message" => "Quiz creato con successo"];
                    } catch (Exception $e) {
                        $ret = ["error" => 1, "message" => "Errore durante la creazione del quiz"];
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
