function toSlide(dest){
    document.querySelectorAll(".slide.visible").forEach((e)=>{
        e.classList.remove("visible")
        e.querySelectorAll("*").forEach((x)=>{
            x.tabIndex=-1
        })
    })
    let destSlide=document.getElementById(dest)
    destSlide.classList.add("visible")
    destSlide.querySelectorAll("*").forEach((x)=>{
        delete(x.tabIndex)
    })
    document.getElementById("menu").querySelectorAll("*").forEach((e)=>{
        e.classList.remove("selected")
    });
    let menuItem=document.getElementById("menu_"+dest).classList.add("selected")
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

    container.insertBefore(subButton1, parentButton.nextSibling);
    container.insertBefore(subButton2, subButton1.nextSibling);
  }

  function removeSubButtons(container, parentButton) {
    while (parentButton.nextSibling && parentButton.nextSibling.classList.contains("sub-button")) {
      container.removeChild(parentButton.nextSibling);
    }
  }