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
  if(dest.id === "Quiz"){
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
        testFinale.classList.add("dynamic-move-up");
        preparazione.classList.add("dynamic-move-up");
    } else {
        newButtonsContainer.innerHTML = "";
        buttonsVisible = false;
        testFinale.classList.remove("dynamic-move-up");
        preparazione.classList.remove("dynamic-move-up");
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
    subButton1.className = "button sub-button";
    subButton2.className = "button sub-button";

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
  const fileUrl = "../certificato/certificato.pdf";
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

    xhr.open("GET", "../FJson/domandeCultura.json");
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

  xhr.open("GET", "../FJson/domandeCostituzione.json");
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
  xhr.open("GET","../FJson/letteratura.json")
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
              p.className="sezione-con-img"
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
  xhr.open("GET","../FJson/storia.json")
  xhr.send()
}

function carica(){
  caricaDomandeC();
  caricaDomandeCG();
  caricaL();
  caricaS();
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
      toSlide("intro")
    }
  }else{
    if(quizCount<miniQuiz){
      domandaQuiz(domande[quizCount])
    }else{
      quizCount=0
      while (domande.length > 0) {
        domande.pop();
    }
      toSlide("intro")
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
  const visibleSlides = document.querySelectorAll(".slide.visible");
  if (visibleSlides.length > 0) {
    const currentSlide = visibleSlides[0];
    const previousSlide = currentSlide.previousElementSibling;
    if (previousSlide && previousSlide.classList.contains("slide")) {
      currentSlide.classList.remove("visible");
      currentSlide.querySelectorAll("*").forEach((x) => {
        x.tabIndex = -1;
      });
      previousSlide.classList.add("visible");
      previousSlide.querySelectorAll("*").forEach((x) => {
        delete x.tabIndex;
      });
    }
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