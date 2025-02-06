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
  if(dest.id === "QuizC" || dest.id === "QuizCG"){
    document.querySelectorAll(".lowslide.visible").forEach((e)=>{
      e.classList.remove("visible")
      e.querySelectorAll("*").forEach((x)=>{
          x.tabIndex=-1
      })
  })
    dest=document.getElementById("Quiz")
    dest.classList.add("visible")
    dest.querySelectorAll("*").forEach((x)=>{
      delete(x.tabIndex)
  })
  }else{
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
            toSlide('QuizCG')
          }else{
            toSlide('QuizC')
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
            console.log(domandeCG);
        } catch (e) {
            console.error("Caricamento fallito", e);
        }
    };

    xhr.onerror = function () {
        console.error("Errore di comunicazione");
    };

    xhr.open("GET", "domandeCultura.json");
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

          console.log(domandeC);
      } catch (e) {
          console.error("Caricamento fallito", e);
      }
  };

  xhr.onerror = function () {
      console.error("Errore di comunicazione");
  };

  xhr.open("GET", "domandeCostituzione.json");
  xhr.send();
}

function carica(){
  caricaDomandeC();
  caricaDomandeCG();
  toSlide('intro');
}