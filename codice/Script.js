//funzione per il service worker pwa
if('ServiceWorker' in navigator){
  navigator.serviceWorker.register('sw.js')
}
//redirect
if(location.protocol==="http:"){
  location.protocol="https:"+location.href.substring(location.protocol.length)
}

function toSlide(dest){
  document.querySelectorAll(".slide.visible").forEach((e)=>{
      e.classList.remove("visible")
      e.querySelectorAll("*").forEach((x)=>{
          x.tabIndex=-1
      })
  })
  dest=document.getElementById(dest)
  dest.classList.add("visible")
  dest.querySelectorAll("*").forEach((x)=>{
      delete(x.tabIndex)
  })

  if(dest.id === "FineQuiz"){
    //parte per l'header del finequiz
    document.querySelectorAll(".PrimaParte.visible").forEach((e)=>{
      e.classList.remove("visible")
      e.querySelectorAll("*").forEach((x)=>{
          x.tabIndex=-1
      })
    })
    dest=document.getElementById("header4")
    dest.classList.add("visible")
    dest.querySelectorAll("*").forEach((x)=>{
        delete(x.tabIndex)
    })

    /*lowslide per fine quiz*/
    document.querySelectorAll(".lowslide.visible").forEach((e)=>{
      e.classList.remove("visible")
      e.querySelectorAll("*").forEach((x)=>{
          x.tabIndex=-1
      })
    })
    dest=document.getElementById("lowA")
    dest.classList.add("visible")
    dest.querySelectorAll("*").forEach((x)=>{
      delete(x.tabIndex)
    })

  }

  if(dest.id === "Quiz"){
    //parte per l'header del quiz
    document.querySelectorAll(".PrimaParte.visible").forEach((e)=>{
      e.classList.remove("visible")
      e.querySelectorAll("*").forEach((x)=>{
          x.tabIndex=-1
      })
    })
    dest=document.getElementById("header3")
    dest.classList.add("visible")
    dest.querySelectorAll("*").forEach((x)=>{
        delete(x.tabIndex)
    })

    //parte della barra in basso del quiz
    document.querySelectorAll(".lowslide.visible").forEach((e)=>{
      e.classList.remove("visible")
      e.querySelectorAll("*").forEach((x)=>{
          x.tabIndex=-1
      })
  })
    dest=document.getElementById("vf")
    dest.classList.add("visible")
    dest.querySelectorAll("*").forEach((x)=>{
      delete(x.tabIndex)
  })
  }else if(dest.id === "principale"){
    document.querySelectorAll(".PrimaParte.visible").forEach((e)=>{
      e.classList.remove("visible")
      e.querySelectorAll("*").forEach((x)=>{
          x.tabIndex=-1
      })
    })
    dest=document.getElementById("header1")
    dest.classList.add("visible")
    dest.querySelectorAll("*").forEach((x)=>{
        delete(x.tabIndex)
    })

    document.querySelectorAll(".lowslide.visible").forEach((e)=>{
      e.classList.remove("visible")
      e.querySelectorAll("*").forEach((x)=>{
          x.tabIndex=-1
      })
    })
    dest=document.getElementById("lowA")
    dest.classList.add("visible")
    dest.querySelectorAll("*").forEach((x)=>{
      delete(x.tabIndex)
    })

  }else{

    document.querySelectorAll(".PrimaParte.visible").forEach((e)=>{
      e.classList.remove("visible")
      e.querySelectorAll("*").forEach((x)=>{
          x.tabIndex=-1
      })
    })
    dest=document.getElementById("header2")
    dest.classList.add("visible")
    dest.querySelectorAll("*").forEach((x)=>{
        delete(x.tabIndex)
    })

  document.querySelectorAll(".lowslide.visible").forEach((e)=>{
    e.classList.remove("visible")
    e.querySelectorAll("*").forEach((x)=>{
        x.tabIndex=-1
    })
    })
    dest=document.getElementById("lowB")
    dest.classList.add("visible")
    dest.querySelectorAll("*").forEach((x)=>{
      delete(x.tabIndex)
    })
  }
}

let buttonsVisible = false;

function showHide(){
    const newButtonsContainer = document.getElementById("newButtons");
    const testFinale = document.getElementById("testFinale");
    const preparazione = document.getElementById("preparazione");


    if (!buttonsVisible) {
        createButton(newButtonsContainer, "Costituzione");
        createButton(newButtonsContainer, "Cultura Generale");
        buttonsVisible = true;
        testFinale.classList.remove("dynamic-move-up");
        preparazione.classList.remove("dynamic-move-up");
    } else {
        newButtonsContainer.innerHTML = "";
        buttonsVisible = false;
        testFinale.classList.add("dynamic-move-up");
        preparazione.classList.add("dynamic-move-up");
    }
  }


function createButton(container, Text) {
    const button = document.createElement("button");
    button.textContent = Text;
    button.className = "button new-button";

    button.addEventListener("click", () => {
      toggleSubButtons(container, button);
    });

    container.appendChild(button);
}

function toggleSubButtons(container, parentButton) {
    if (parentButton.nextSibling && parentButton.nextSibling.classList.contains("sub-button")) {
      removeSubButtons(container, parentButton);
    } else {
      createSubButtons(container, parentButton);
    }
  }

  function createSubButtons(container, parentButton) {
    const subButton1 = document.createElement("button");
    const subButton2 = document.createElement("button");

    subButton1.textContent = "Quiz";
    subButton2.textContent = "Spiegazione";
    subButton1.className = "button sub-button ";
    subButton2.className = "button sub-button ";

    subButton2.addEventListener("click",()=>{
          if(parentButton.textContent==="Cultura Generale"){
            toSlide('Cultura')
          }else{
            toSlide('CostituzioneP')
          }
    });
    subButton1.addEventListener("click",()=>{
          if(parentButton.textContent==="Cultura Generale"){
            preparazioneQuiz("Cultura Generale",miniQuiz)
          }else{
            preparazioneQuiz("Costituzione",miniQuiz)
          }
    });


    container.insertBefore(subButton1, parentButton.nextSibling);
    container.insertBefore(subButton2, subButton1.nextSibling);
  }

  function removeSubButtons(container, parentButton) {
    while (parentButton.nextSibling && parentButton.nextSibling.classList.contains("sub-button")) {
      container.removeChild(parentButton.nextSibling);
    }
  }

//PARTE PER I FRAME

function Accedi() {

  let frame = document.getElementById("frame");
  let overlay = document.getElementById("overlay");

  if (frame.style.display === "none" || frame.style.display === "") {
      frame.style.display = "block";
      overlay.style.display = "block";
  } else {
      frame.style.display = "none";
      overlay.style.display = "none";
  }
}


function Registrati() {
  
  let frame = document.getElementById("frameR");
  let overlay = document.getElementById("overlayR");

  if (frame.style.display === "none" || frame.style.display === "") {
      frame.style.display = "block";
      overlay.style.display = "block";
  } else {
      frame.style.display = "none";
      overlay.style.display = "none";
  }
}
//funzione accesso per server
function login() {
  console.log("Login...");
  let usernameLog = document.getElementById("usernameLog").value;
  let passwordLog = document.getElementById("passwordLog").value;

  let x = new XMLHttpRequest();
  x.onload = function() {
      try {
          let j = JSON.parse(x.responseText);
          if (j.error != 0) {
              alert(j.message);
              return
          }
          console.log("Login effettuato");


          console.log("Dati sessione:", j.session);
      } catch (e) {
          console.log("Errore:", e);
      }
  };
  x.onerror = function() {
      console.error("Errore di rete");
  };

  let dati = "usernameLog=" + encodeURIComponent(usernameLog) + "&passwordLog=" + encodeURIComponent(passwordLog);
  x.open("POST", "server.php?op=login");
  x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  x.send(dati);
  let frame = document.getElementById("frame");
  let overlay = document.getElementById("overlay");
  frame.style.display = "none";
  overlay.style.display = "none";
  toSlide("intro");
  document.getElementById("usernameLog").value = "";
  document.getElementById("passwordLog").value = "";
}

function register() {
  console.log("Registrazione...");
  let username = document.getElementById("nome").value;
  let cognome=document.getElementById("cognome").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("mail").value;
  let confermaPassword = document.getElementById("confermaPassword").value;

  let x = new XMLHttpRequest();
  x.onload = function() {
      try {
          let j = JSON.parse(x.responseText);
          if (j.error !== 0) {
             alert(j.message);
              return;
          }
          console.log("Registrazione effettuata");

      } catch (e) {
          console.error("Errore: " +e);
          alert("Errore: connessione al server");
      }
  };
  x.onerror = function() {
      console.error("Errore di rete");
      alert("Errore di rete");
  };
  console.log("Dati:", username,cognome, password, email, confermaPassword);
  let dati = "username=" + encodeURIComponent(username) +"&cognome="+encodeURIComponent(cognome)+"&mail=" + encodeURIComponent(email) +"&password=" + encodeURIComponent(password)+"&confermaPassword="  + encodeURIComponent(confermaPassword)
  x.open("POST", "server.php?op=register");
  x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  x.send(dati);
  let frame = document.getElementById("frameR");
  let overlay = document.getElementById("overlayR");
  frame.style.display = "none";
  overlay.style.display = "none";
  toSlide("intro");
  document.getElementById("nome").value = "";
  document.getElementById("cognome").value = "";
  document.getElementById("password").value = "";
  document.getElementById("mail").value = "";
  document.getElementById("confermaPassword").value = "";
}



function OverTema() {
  let frame = document.getElementById("frameT");
  let overlay = document.getElementById("overlayT");

  if (frame.style.display === "none" || frame.style.display === "") {
      frame.style.display = "block";
      overlay.style.display = "block";
  } else {
      frame.style.display = "none";
      overlay.style.display = "none";
  }
}

function temaChiaro() {
    let elements = document.querySelectorAll(".tema");
    elements.forEach((a) => {
        a.style.backgroundColor = "rgb(219, 219, 219)";
    });
    let topBars = document.getElementsByClassName("PrimaParte");
    let bottomBars = document.getElementsByClassName("barra2");
    for (let i = 0; i < topBars.length; i++) {
        topBars[i].style.background = "rgb(0, 102, 255)";
    }
    for (let i = 0; i < bottomBars.length; i++) {
        bottomBars[i].style.background = "rgb(0, 102, 255)";
    }
    let frames = document.getElementsByClassName("frame");
    for (let i = 0; i < frames.length; i++) {
        frames[i].style.backgroundColor = "rgb(150, 150, 150)";
    }
}

function temaScuro() {
    let elements = document.querySelectorAll(".tema");
    elements.forEach((a) => {
        a.style.backgroundColor = "rgb(27, 27, 27)";
    });
    let topBars = document.getElementsByClassName("PrimaParte");
    let bottomBars = document.getElementsByClassName("barra2");
    for (let i = 0; i < topBars.length; i++) {
        topBars[i].style.background = "rgb(0, 102, 255)";
    }
    for (let i = 0; i < bottomBars.length; i++) {
        bottomBars[i].style.background = "rgb(0, 102, 255)";
    }
    let frames = document.getElementsByClassName("frame");
    for (let i = 0; i < frames.length; i++) {
        frames[i].style.backgroundColor = "rgb(50, 50, 50)";
    }
}

function temaRosso() {
    let elements = document.querySelectorAll(".tema");
    elements.forEach((a) => {
        a.style.backgroundColor = "rgb(106, 0, 0)";
    });
    let topBars = document.getElementsByClassName("PrimaParte");
    let bottomBars = document.getElementsByClassName("barra2");
    for (let i = 0; i < topBars.length; i++) {
        topBars[i].style.background = "rgb(106, 0, 0)";
    }
    for (let i = 0; i < bottomBars.length; i++) {
        bottomBars[i].style.background = "rgb(106, 0, 0)";
    }
    let frames = document.getElementsByClassName("frame");
    for (let i = 0; i < frames.length; i++) {
        frames[i].style.backgroundColor = "rgb(150, 150, 150)";
    }
}

function temaTricolore() {
    let elements = document.querySelectorAll(".tema");
    elements.forEach((a) => {
        a.style.backgroundColor = "rgb(219, 219, 219)";
    });
    let topBars = document.getElementsByClassName("PrimaParte");
    let bottomBars = document.getElementsByClassName("barra2");
    for (let i = 0; i < topBars.length; i++) {
        topBars[i].style.background = "linear-gradient(to right, rgb(2, 67, 22), white, rgb(104, 0, 0))";
    }
    for (let i = 0; i < bottomBars.length; i++) {
        bottomBars[i].style.background = "linear-gradient(to right, rgb(2, 67, 22), white, rgb(104, 0, 0))";
    }
    let frames = document.getElementsByClassName("frame");
    for (let i = 0; i < frames.length; i++) {
        frames[i].style.backgroundColor = "rgb(150, 150, 150)";
    }
}

function contatti() {
  let frame = document.getElementById("frameC");
  let overlay = document.getElementById("overlayC");

  if (frame.style.display === "none" || frame.style.display === "") {
      frame.style.display = "block";
      overlay.style.display = "block";
  } else {
      frame.style.display = "none";
      overlay.style.display = "none";
  }
}

function cambiatema() {
  let elements = document.querySelectorAll(".tema");
  elements.forEach((a) => {
    if (!a.style.backgroundColor) {
      a.style.backgroundColor = "rgb(219, 219, 219)";
    }
    let currentColor = window.getComputedStyle(a).backgroundColor;
    if (currentColor === "rgb(219, 219, 219)") {
      a.style.backgroundColor = "rgb(33, 33, 33)";
    } else {
      a.style.backgroundColor = "rgb(219, 219, 219)";
    }
  });
}

function lingua() {
  let frame = document.getElementById("frameL");
  let overlay = document.getElementById("overlayL");

  if (frame.style.display === "none" || frame.style.display === "") {
      frame.style.display = "block";
      overlay.style.display = "block";
  } else {
      frame.style.display = "none";
      overlay.style.display = "none";
  }
}

function profilo() {
  let frame = document.getElementById("frameP");
  let overlay = document.getElementById("overlayP");

  if (frame.style.display === "none" || frame.style.display === "") {
      frame.style.display = "block";
      overlay.style.display = "block";
  } else {
      frame.style.display = "none";
      overlay.style.display = "none";
  }
}

//funzione che permette di scaricare un file
function downloadFile() {
  const fileUrl = "certificato/certificato.pdf";
  const fileName = "certificato.pdf";

  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

//caricamento dei json
let domandeC=[]
let domandeCG = []

function caricaDomandeCG() {
    let xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        try {
          let dati = JSON.parse(xhr.responseText);
          for (let categoria in dati) {
            dati[categoria].forEach(domandaObj => {
                domandeCG.push({
                    categoria: categoria,
                    domanda: domandaObj.domanda,
                    risposta_corretta: domandaObj.risposta_corretta
                });
            });
        }
        } catch (e) {
            console.error("Caricamento fallito", e);
        }
    };

    xhr.onerror = function () {
        console.error("Errore di comunicazione");
    };

    xhr.open("GET", "FJson/domandeCultura.json");
    xhr.send();
}

function caricaDomandeC(){
  let xhr = new XMLHttpRequest();
    
  xhr.onload = function () {
      try {
          let dati = JSON.parse(xhr.responseText);

          for (let categoria in dati) {
            dati[categoria].forEach(domandaObj => {
                domandeC.push({
                    categoria: categoria,
                    domanda: domandaObj.domanda,
                    risposta_corretta: domandaObj.risposta_corretta
                });
            });
        }

      } catch (e) {
          console.error("Caricamento fallito", e);
      }
  };

  xhr.onerror = function () {
      console.error("Errore di comunicazione");
  };

  xhr.open("GET", "FJson/domandeCostituzione.json");
  xhr.send();
}

function caricaL(){
  let xhr=new XMLHttpRequest()
  xhr.onload=function(){
      try{
          let elenco=document.getElementById("cLet")
          elenco.innerHTML=""
          let d=JSON.parse(xhr.responseText)
          d.forEach((e)=>{
              let p=document.createElement("section")
              p.className="sezione-con-img"
              let t=document.createElement("div")
              t.className="testo"
              p.appendChild(t)
              t=document.createElement("h1")
              t.innerText=e.autore
              p.appendChild(t)
              t=document.createElement("p")
              t.innerText=e.descrizione
              p.appendChild(t)
              elenco.appendChild(p)
          })
      }catch(e){
          document.getElementById("cLet").innerText="Caricamento fallito"
      }
  }
  xhr.onerror=function(){
      document.getElementById("cLet").innerText="Errore di comunicazione"
  }
  xhr.open("GET","FJson/letteratura.json")
  xhr.send()
}

function caricaG(){
  let xhr=new XMLHttpRequest()
  xhr.onload=function(){
      try{
        let elenco = document.getElementById("cGra");
        elenco.innerHTML = ""; // Svuota il contenuto prima di caricare nuovi dati
        let dati = JSON.parse(xhr.responseText);
        
        dati.forEach((e) => {
            let sezione = document.createElement("section");
            sezione.className = "sezione-grammatica";

            let titolo = document.createElement("h1");
            titolo.innerText = e.argomento;
            sezione.appendChild(titolo);

            let descrizione = document.createElement("p");
            descrizione.className = "descrizione";
            descrizione.innerText = e.spiegazione;
            sezione.appendChild(descrizione);

            // parte per gli esempi
            if (Array.isArray(e.esempio)) {
                let listaEsempi = document.createElement("ul");
                listaEsempi.className = "lista-esempi";

                e.esempio.forEach((esempio) => {
                    let item = document.createElement("li");
                    item.innerText = esempio;
                    listaEsempi.appendChild(item);
                });

                sezione.appendChild(listaEsempi);
            } else {
                let esempioSingolo = document.createElement("p");
                esempioSingolo.className = "esempio-singolo";
                esempioSingolo.innerText = `Esempio: ${e.esempio}`;
                sezione.appendChild(esempioSingolo);
            }

            elenco.appendChild(sezione)
          });
      }catch(e){
          document.getElementById("cGra").innerText="Caricamento fallito"
      }
  }
  xhr.onerror=function(){
      document.getElementById("cGra").innerText="Errore di comunicazione"
  }
  xhr.open("GET","FJson/grammatica.json")
  xhr.send()
}

function caricaS(){
  let xhr=new XMLHttpRequest()
  xhr.onload=function(){
      try{
          let elenco=document.getElementById("cSto")
          elenco.innerHTML=""
          let d=JSON.parse(xhr.responseText)
          d.forEach((e)=>{
              let p=document.createElement("section")
              p.className="sezioneS"
              let t=document.createElement("div")
              t.className="testo"
              p.appendChild(t)
              t=document.createElement("h1")
              t.innerText=e.anno
              p.appendChild(t)
              t=document.createElement("p")
              t.innerText=e.descrizione
              p.appendChild(t)
              elenco.appendChild(p)
          })
      }catch(e){
          document.getElementById("cSto").innerText="Caricamento fallito"
      }
  }
  xhr.onerror=function(){
      document.getElementById("cSto").innerText="Errore di comunicazione"
  }
  xhr.open("GET","FJson/storia.json")
  xhr.send()
}

function caricaC(){
  let xhr = new XMLHttpRequest();

  xhr.onload = function () {
      try {

          let contenitore = document.getElementById("cSud");
          contenitore.innerHTML = ""; 
          let dati = JSON.parse(xhr.responseText);
  
          let titolo = document.createElement("h1");
          titolo.innerText = dati.titolo;
          contenitore.appendChild(titolo);
  
          let descrizione = document.createElement("p");
          descrizione.innerText = dati.descrizione;
          contenitore.appendChild(descrizione);
  
          let strutturaTitolo = document.createElement("h2");
          strutturaTitolo.innerText = "Struttura";
          contenitore.appendChild(strutturaTitolo);
  
          dati.struttura.forEach((elemento) => {
              let sezione = document.createElement("div");
              sezione.className = "sezione";
  
              let nome = document.createElement("h3");
              nome.innerText = elemento.nome;
              sezione.appendChild(nome);
  
              let membri = document.createElement("p");
              membri.innerText = "Membri: " + elemento.membri;
              sezione.appendChild(membri);
  
              let sede = document.createElement("p");
              sede.innerText = "Sede: " + elemento.sede;
              sezione.appendChild(sede);
  
              let presidente = document.createElement("p");
              presidente.innerText = "Presidente: " + elemento.presidente;
              sezione.appendChild(presidente);
  
              if (elemento.senatori_vita) {
                  let senatori_vita = document.createElement("p");
                  senatori_vita.innerText = "Senatori a vita: " + elemento.senatori_vita;
                  sezione.appendChild(senatori_vita);
              }
  
              contenitore.appendChild(sezione);
          });
  
          let funzioniTitolo = document.createElement("h2");
          funzioniTitolo.innerText = "Funzioni";
          contenitore.appendChild(funzioniTitolo);
  
          dati.funzioni.forEach((elemento) => {
              let funzione = document.createElement("div");
              funzione.className = "sezione";
  
              let nomeFunzione = document.createElement("h3");
              nomeFunzione.innerText = elemento.nome;
              funzione.appendChild(nomeFunzione);
  
              let descrizioneFunzione = document.createElement("p");
              descrizioneFunzione.innerText = elemento.descrizione;
              funzione.appendChild(descrizioneFunzione);
  
              contenitore.appendChild(funzione); 
          });
  
      } catch (e) {
          document.getElementById("cSud").innerText = "Caricamento fallito";
      }
  };
  
  xhr.onerror = function () {
      document.getElementById("cSud").innerText = "Errore di comunicazione";
  };
  
  xhr.open("GET", "FJson/camere.json"); 
  xhr.send();  
}

function caricaA(){
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
      try {
          let elenco = document.getElementById("cArt");
          elenco.innerHTML = "";  

          let d = JSON.parse(xhr.responseText);
          d.principi_fondamentali.forEach((e) => {
              
              let p = document.createElement("section");
              p.className = "sezioneA";
              
              let t = document.createElement("div");
              t.className = "testo";
              p.appendChild(t);
              
              t = document.createElement("h1");
              t.innerText = `Art. ${e.articolo} - ${e.titolo}`; 
              p.appendChild(t);
              
              t = document.createElement("p");
              t.innerText = e.descrizione; 
              p.appendChild(t);
              
              t = document.createElement("p");
              t.innerText = `Significato: ${e.significato}`; 
              p.appendChild(t);
              
              elenco.appendChild(p);  
          });

          d.altri_articoli_importanti.forEach((e) => {
              let p = document.createElement("section");
              p.className = "sezioneA";
              
              let t = document.createElement("div");
              t.className = "testo";
              p.appendChild(t);
              
              t = document.createElement("h1");
              t.innerText = `Art. ${e.articolo} - ${e.titolo}`; 
              p.appendChild(t);
              
              t = document.createElement("p");
              t.innerText = e.descrizione; 
              p.appendChild(t);
              
              t = document.createElement("p");
              t.innerText = `Significato: ${e.significato}`; 
              p.appendChild(t);
              
              elenco.appendChild(p); 
          });

      } catch (e) {
          document.getElementById("cArt").innerText = "Caricamento fallito";
      }
  };

  xhr.onerror = function() {
      document.getElementById("cArt").innerText = "Errore di comunicazione";
  };

  xhr.open("GET", "FJson/articoli.json");
  xhr.send();
}

function caricaCit() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        try {
            let elenco = document.getElementById("cCit");
            elenco.innerHTML = "";

            let d = JSON.parse(xhr.responseText);

            function creaSezione(titolo, contenuto) {
                let sezione = document.createElement("section");
                sezione.className = "sezioneC";

                let titoloElem = document.createElement("h1");
                titoloElem.innerText = titolo;
                sezione.appendChild(titoloElem);

                if (Array.isArray(contenuto)) {
                    let lista = document.createElement("ul");
                    contenuto.forEach((e) => {
                        let li = document.createElement("li");
                        li.innerText = e;
                        lista.appendChild(li);
                    });
                    sezione.appendChild(lista);
                } else if (typeof contenuto === "object") {
                    let lista = document.createElement("ul");
                    Object.keys(contenuto).forEach((key) => {
                        let li = document.createElement("li");
                        li.innerText = key + ": " + contenuto[key];
                        lista.appendChild(li);
                    });
                    sezione.appendChild(lista);
                } else {
                    let p = document.createElement("p");
                    p.innerText = contenuto;
                    sezione.appendChild(p);
                }

                elenco.appendChild(sezione);
            }

            creaSezione("Requisiti per ottenere la cittadinanza", d.requisiti.economici);
            creaSezione("Lingua richiesta", d.requisiti.linguistici);
            creaSezione("Giuramento richiesto", d.requisiti.giuramento);
            creaSezione("Cosa impedisce di ottenere la cittadinanza", d.impedimenti);
            creaSezione("Documenti necessari", d.documenti);
            creaSezione("Procedura per la domanda", `Il cittadino straniero dovrà presentare la domanda attraverso il sito: ${d.procedura.sito}. Autenticazione necessaria: ${d.procedura.autenticazione}`);
            
            let categorieSezione = document.createElement("section");
            categorieSezione.className = "sezioneC";
            let categorieTitle = document.createElement("h1");
            categorieTitle.innerText = "Categorie di cittadinanza";
            categorieSezione.appendChild(categorieTitle);
            let categorieLista = document.createElement("ul");

            Object.keys(d.categorie).forEach((key) => {
                let li = document.createElement("li");
                li.innerText = key;

                let dettagli = d.categorie[key];

                if (Array.isArray(dettagli)) {
                    let subList = document.createElement("ul");
                    dettagli.forEach((sub) => {
                        let subLi = document.createElement("li");
                        subLi.innerText = sub;
                        subList.appendChild(subLi);
                    });
                    li.appendChild(subList);
                } else if (typeof dettagli === "object") {
                    let subList = document.createElement("ul");
                    Object.keys(dettagli).forEach((subKey) => {
                        let subLi = document.createElement("li");
                        subLi.innerText = `${subKey}: ${dettagli[subKey]}`;
                        subList.appendChild(subLi);
                    });
                    li.appendChild(subList);
                } else {
                    li.innerText += `: ${dettagli}`;
                }

                categorieLista.appendChild(li);
            });

            categorieSezione.appendChild(categorieLista);
            elenco.appendChild(categorieSezione);

            creaSezione("Tempi per il rilascio della cittadinanza", d.tempi_rilascio);

        } catch (e) {
            document.getElementById("cCit").innerText = "Caricamento fallito";
        }
    };

    xhr.onerror = function () {
        document.getElementById("cCit").innerText = "Errore di comunicazione";
    };

    xhr.open("GET", "FJson/cittadinanza.json");
    xhr.send();
}

function caricaEl(){
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
      try {
          let elenco = document.getElementById("cEle");
          elenco.innerHTML = "";  

          let d = JSON.parse(xhr.responseText);

          let politiche = document.createElement("section");
          politiche.className = "sezioneE";

          let t = document.createElement("h1");
          t.innerText = "Elezioni Politiche";
          politiche.appendChild(t);

          t = document.createElement("p");
          t.innerText = `Camera dei Deputati: Voto da ${d.elezioni_italiane.elezioni_politiche.camera_dei_deputati.età_minima_voto} anni, candidabilità da ${d.elezioni_italiane.elezioni_politiche.camera_dei_deputati.età_minima_candidatura} anni.`;
          politiche.appendChild(t);

          t = document.createElement("p");
          t.innerText = `Senato della Repubblica: Voto da ${d.elezioni_italiane.elezioni_politiche.senato_della_repubblica.età_minima_voto} anni, candidabilità da ${d.elezioni_italiane.elezioni_politiche.senato_della_repubblica.età_minima_candidatura} anni.`;
          politiche.appendChild(t);

          t = document.createElement("p");
          t.innerText = `Sistema elettorale: ${d.elezioni_italiane.elezioni_politiche.sistema_elettorale.descrizione}`;
          politiche.appendChild(t);

          elenco.appendChild(politiche);

          let amministrative = document.createElement("section");
          amministrative.className = "sezioneE";

          t = document.createElement("h1");
          t.innerText = "Elezioni Amministrative";
          amministrative.appendChild(t);

          t = document.createElement("p");
          t.innerText = `Regionali: Si vota per ${d.elezioni_italiane.elezioni_amministrative.regionali.oggetto_voto.join(", ")}.`;
          amministrative.appendChild(t);

          t = document.createElement("p");
          t.innerText = `Sistema: ${d.elezioni_italiane.elezioni_amministrative.regionali.sistema}`;
          amministrative.appendChild(t);

          t = document.createElement("p");
          t.innerText = `Comunali: Si vota per ${d.elezioni_italiane.elezioni_amministrative.comunali.oggetto_voto.join(", ")}.`;
          amministrative.appendChild(t);

          t = document.createElement("p");
          t.innerText = `Sistema per Comuni con meno di 15.000 abitanti: ${d.elezioni_italiane.elezioni_amministrative.comunali.sistema.meno_15000_abitanti}`;
          amministrative.appendChild(t);

          t = document.createElement("p");
          t.innerText = `Sistema per Comuni con più di 15.000 abitanti: ${d.elezioni_italiane.elezioni_amministrative.comunali.sistema.più_15000_abitanti}`;
          amministrative.appendChild(t);

          elenco.appendChild(amministrative);

          let europee = document.createElement("section");
          europee.className = "sezioneE";

          t = document.createElement("h1");
          t.innerText = "Elezioni Europee";
          europee.appendChild(t);

          t = document.createElement("p");
          t.innerText = `Si svolgono ogni ${d.elezioni_italiane.elezioni_europee.frequenza}.`;
          europee.appendChild(t);

          t = document.createElement("p");
          t.innerText = `Sistema elettorale: ${d.elezioni_italiane.elezioni_europee.sistema}.`;
          europee.appendChild(t);

          elenco.appendChild(europee);

          let referendum = document.createElement("section");
          referendum.className = "sezioneE";

          t = document.createElement("h1");
          t.innerText = "Referendum";
          referendum.appendChild(t);

          d.elezioni_italiane.referendum.tipologie.forEach((ref) => {
              let refSec = document.createElement("section");
              refSec.className = "sotto-sezione";

              let h2 = document.createElement("h2");
              h2.innerText = ref.nome;
              refSec.appendChild(h2);

              let p = document.createElement("p");
              p.innerText = ref.descrizione;
              refSec.appendChild(p);

              let quorum = document.createElement("p");
              quorum.innerText = `Quorum richiesto: ${ref.quorum}`;
              refSec.appendChild(quorum);

              referendum.appendChild(refSec);
          });

          elenco.appendChild(referendum);

          let procedura = document.createElement("section");
          procedura.className = "sezioneE";

          t = document.createElement("h1");
          t.innerText = "Procedura di Voto";
          procedura.appendChild(t);

          let requisiti = document.createElement("ul");
          d.elezioni_italiane.procedura_voto.requisiti.forEach((req) => {
              let li = document.createElement("li");
              li.innerText = req;
              requisiti.appendChild(li);
          });
          procedura.appendChild(requisiti);

          let passaggi = document.createElement("ol");
          d.elezioni_italiane.procedura_voto.passaggi.forEach((step) => {
              let li = document.createElement("li");
              li.innerText = step;
              passaggi.appendChild(li);
          });
          procedura.appendChild(passaggi);

          elenco.appendChild(procedura);

      } catch (e) {
          document.getElementById("cEle").innerText = "Caricamento fallito";
      }
  };

  xhr.onerror = function() {
      document.getElementById("cEle").innerText = "Errore di comunicazione";
  };

  xhr.open("GET", "FJson/elezioni.json");
  xhr.send();
}

function carica(){
  caricaDomandeC();
  caricaDomandeCG();
  caricaL();
  caricaS();
  caricaG();
  caricaC();
  caricaA();
  caricaCit();
  caricaEl();
  toSlide('principale')
}

const miniQuiz=10;
let quizCount=0;
const QuizF=30;
let final=false;
let domande=[]

function domandaQuiz(question){
  let d=document.getElementById("domanda")
  d.innerHTML=""
  let p=document.createElement("p")
  p.innerText=question.domanda
  d.appendChild(p)
}

function preparazioneQuiz(categoria,limite){
  let q
  for(let i=0;i<limite;i++){
    do{
      q=domandaCasuale(categoria)
      
    }while(controlloDoppioni(q))
    domande.push(q)
  }
  domandaQuiz(domande[0])
  toSlide('Quiz')
}

function domandaCasuale(categoria) {
  if(categoria==="Costituzione"){
    return domandeC[Math.floor(Math.random() * domandeC.length)];
  }else{
    return domandeCG[Math.floor(Math.random() * domandeCG.length)];
  }
}

function next(){
  quizCount++
  if(final){
    if(quizCount<QuizF){
      domandaQuiz(domande[quizCount])
    }else{
      quizCount=0
      final=false
      while (domande.length > 0) {
        domande.pop();
    }
      toSlide("FineQuiz")
    }
  }else{
    if(quizCount<miniQuiz){
      domandaQuiz(domande[quizCount])
    }else{
      quizCount=0
      while (domande.length > 0) {
        domande.pop();
    }
      toSlide("FineQuiz")
    }
  }
}

function finalTest(){
  let q
  for(let i=0;i<QuizF;i++){
    if(Math.random() < 0.5){
      do{
        q=domandaCasuale("Costituzione")
      }while(controlloDoppioni(q))
      domande.push(q)
    }else{
      do{
        q=domandaCasuale("Cultura Generale")
      }while(controlloDoppioni(q))
      domande.push(q)
    }
  }
  final=true
  domandaQuiz(domande[0])
  toSlide('Quiz')
}

function indietro() {
  let slideVis=document.getElementsByClassName("slide visible")
  if(slideVis[0].id==="FineQuiz"){
    toSlide('intro')
  }else if(slideVis[0].id==="intro"){
    toSlide('principale')
  }else if(slideVis[0].id==="CostituzioneP"||slideVis[0].id==="Cultura"){
    toSlide('intro')
  }else if(slideVis[0].id==="StoriaP"||slideVis[0].id==="LetteraturaP"||slideVis[0].id==="GrammaticaP"){
    toSlide('Cultura')
  }else if(slideVis[0].id==="ArticoliP"||slideVis[0].id==="CamereP"||slideVis[0].id==="CittadinanzaP"||slideVis[0].id==="ElezioniP"){
    toSlide('CostituzioneP')
  }
}

function controlloDoppioni(question){
  for(let i=0;i<domande.length;i++){
    if(domande[i].domanda===question.domanda){
      return true
    }
  }
  return false
}

function access(){
  let frame = document.getElementById("frame");
  let overlay = document.getElementById("overlay");
  frame.style.display = "none";
  overlay.style.display = "none";
  toSlide('intro')

}

function registration(){
  let frame = document.getElementById("frameR");
  let overlay = document.getElementById("overlayR");
  frame.style.display = "none";
  overlay.style.display = "none";
  toSlide('intro')
}