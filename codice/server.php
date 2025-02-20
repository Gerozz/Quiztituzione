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
                        $ret=["error"=>0, "status"=>"loggedIn","username"=>$_SESSION["mail"]];
                    }else{
                        $ret=["error"=>1,"status"=>"loggedOut"];
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
                        $ret=["error"=>0,"message"=>"Utente registrato correttamente"];
                    }catch(Exception $e){
                    }
                    $conn->close();
                    if($inserito){
                        $_SESSION["loggedIn"]=TRUE;
                        $_SESSION["username"]=$username;
                        $ret=["error"=>0,"status"=>"loggedIn","username"=>$_SESSION["username"]];
                    }else{
                        $ret=["error"=>1,"message"=>"registrazione non effettuata","status"=>"loggedOut"];
                    }
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