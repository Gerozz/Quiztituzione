<?php
    session_start(); 
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0, s-maxage=0');
    header('Cache-Control: post-check=0, pre-check=0', false);
    header('Pragma: no-cache');
    header('Content-Type: application/json; charset=utf-8');
    include "_db.php";
    if(!isset($_GET["op"])){
        $ret=["error"=>1];
    }else{
        try{
            $conn = new mysqli($db_hostname, $db_username, $db_password, $db_name);
            switch($_GET["op"]){
            case "checkLogin":
                if($_SESSION["loggedIn"]){
                    echo json_encode(["status"=>"loggedIn","username"=>$_SESSION["username"]]);
                }else{
                    echo json_encode(["status"=>"loggedOut"]);
                }
                break;
            case "login":
                if (isset($_POST["usernameLog"])&&isset($_POST["passwordLog"])){
                    $username=strtolower(trim($_POST["usernameLog"]));
                    $password=sha1($_POST["passwordLog"]);
                    $q=$conn->prepare("select * from utente where mail=? and password=?");
                    $q->bind_param("ss",$username,$password);
                    $q->execute();
                    $trovato=FALSE;
                    if($q->fetch()){
                        $trovato=TRUE;
                    }
                    $conn->close();
                    if($trovato){
                        $_SESSION["loggedIn"]=TRUE;
                        $_SESSION["mail"]=$username;
                        $ret=["error"=>0, "status"=>"loggedIn","username"=>$_SESSION["username"]];
                    }else{
                        $ret=["error"=>1,"status"=>"loggedOut","message"=>"Parametri errati"];
                    }
                }else{
                    $ret=["error"=>1,"message"=>"Parametri mancanti"];
                }
                
                break;
            case "register":
                if (isset($_POST["username"])&&isset($_POST["cognome"])&&isset($_POST["mail"]) && isset($_POST["password"])&&isset($_POST["confermaPassword"])){
                $username=strtolower(trim($_POST["username"]));
                $cognome=strtolower(trim($_POST["cognome"]));
                $mail=trim($_POST["mail"]);
                $hashpassword=($_POST["password"]);
                $confermaPassword=($_POST["confermaPassword"]);
                if($hashpassword!=$confermaPassword){
                    $ret=["error"=>1,"message"=>"Le password non coincidono"];
                }else{
                    $hashpassword=sha1($hashpassword);
                    $q=$conn->prepare("insert into utente(nome,cognome,mail,password,certificato) values (?,?,?,?,0)");
                    $q->bind_param("ssss",$username,$cognome,$mail,$hashpassword);
                    $inserito=FALSE;
                    try{
                        $q->execute();
                        $inserito=TRUE;
                    }catch(Exception $e){
                    }
                    $conn->close();
                    if($inserito){
                        $_SESSION["certificato"]=0;
                        $_SESSION["loggedIn"]=TRUE;
                        $_SESSION["username"]=$username;
                        $_SESSION["mail"]=$mail;
                        $ret=["error"=>0,"status"=>"loggedIn","message"=>"Utente registrato correttamente","username"=>$_SESSION["username"]];
                    }else{
                        $ret=["error"=>1,"message"=>"registrazione non effettuata","status"=>"loggedOut"];
                    }
                }
                }else{
                    $ret=["error"=>1,"message"=>"Parametri mancanti"];
                }
                
                break;
            case "carica_risposte":
                if (isset($_POST["risposte"])){
                    $risposte = json_decode($_POST["risposte"], true);
                    $q=$conn->prepare("insert into domandequiz(domanda,categoria,sottocategoria,risposta) values (?,?,?,?)");
                    for($i=0;$i<count($risposte);$i++){
                        $domanda = $risposte[$i]['domanda'];
                        $categoria = $risposte[$i]['categoria'];
                        $sottocategoria = $risposte[$i]['sottocategoria'];
                        $risposta = $risposte[$i]['risposta'];
                        
                        $q->bind_param("ssss", $domanda, $categoria, $sottocategoria, $risposta);
                        $q->execute();                   
                    }
                    $conn->close();
                    if($q->affected_rows>0){
                        $ret=["error"=>0,"status"=>"loggedIn","message"=>"Quiz caricato correttamente"];
                    }else{
                        $ret=["error"=>1,"message"=>"Quiz non caricato"];
                    }
                }else{
                    $ret=["error"=>1,"message"=>"Parametri mancanti","status"=>"loggedOut"];
                }
                break;
            case "controlloRisposte":
                if (isset($_POST["risposte"])){
                    $risposte=$_POST["risposte"];
                    $q=$conn->prepare("select * from quiz where id=?");
                    $q->bind_param("i",$risposte[0]);
                    $q->execute();
                    $q->store_result();
                    if($q->num_rows==0){
                        $ret=["error"=>1,"message"=>"ID quiz non valido"];
                        break;
                    }
                    $q->bind_result($id,$domanda,$risposta,$corretta,$quiz,$certificato);
                    $q->fetch();
                    $conn->close();
                    if($corretta==1){
                        $_SESSION["certificato"]=1;
                        $_SESSION["loggedIn"]=TRUE;
                        $_SESSION["username"]=$username;
                        $_SESSION["mail"]=$mail;
                        $ret=["error"=>0,"status"=>"loggedIn","message"=>"Quiz superato, certificato rilasciato","username"=>$_SESSION["username"]];
                    }else{
                        $ret=["error"=>1,"message"=>"Quiz non superato","status"=>"loggedOut"];
                    }
                }else{
                    $ret=["error"=>1,"message"=>"Parametri mancanti"];
                }
                
                break;
            case "logout":
                //logout: elimino la sessione e il cookie dell'utente
                session_unset();
                setcookie("PHPSESSID","",0,"/");
                echo json_encode(["status"=>"loggedOut"]);
            default:
                echo json_encode(["error"=>"Invalid value for op"]);
            }
        }catch(Exception $e){
            $ret=["error"=>1,"message"=>"Errore connessione al db","details"=>$e->getMessage()];
        }
    }
    echo json_encode($ret);
?>