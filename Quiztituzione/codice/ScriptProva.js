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
    let a = document.getElementById("tema");
    a.style.backgroundColor = "rgb(219, 219, 219)";
    let topBars = document.getElementsByClassName("PrimaParte");
    let bottomBars = document.getElementsByClassName("TerzaParte");
    for (let i = 0; i < topBars.length; i++) {
        topBars[i].style.backgroundColor = "rgb(0, 102, 255)";
    }
    for (let i = 0; i < bottomBars.length; i++) {
        bottomBars[i].style.backgroundColor = "rgb(0, 102, 255)";
    }
    let frames = document.getElementsByClassName("frame");
    for (let i = 0; i < frames.length; i++) {
        frames[i].style.backgroundColor = "rgb(150, 150, 150)";
    }
}

function temaScuro() {
    let a = document.getElementById("tema");
    a.style.backgroundColor = "rgb(27, 27, 27)";
    let topBars = document.getElementsByClassName("PrimaParte");
    let bottomBars = document.getElementsByClassName("TerzaParte");
    for (let i = 0; i < topBars.length; i++) {
        topBars[i].style.backgroundColor = "rgb(0, 102, 255)";
    }
    for (let i = 0; i < bottomBars.length; i++) {
        bottomBars[i].style.backgroundColor = "rgb(0, 102, 255)";
    }
    let frames = document.getElementsByClassName("frame");
    for (let i = 0; i < frames.length; i++) {
        frames[i].style.backgroundColor = "rgb(50, 50, 50)";
    }
}

function temaRosso() {
    let a = document.getElementById("tema");
    a.style.backgroundColor = "rgb(106, 0, 0)";
    
    let blueElements = document.querySelectorAll("[style*='color: rgb(0, 102, 255)']");
    blueElements.forEach(element => {
        element.style.color = "rgb(106, 0, 0)";
    });

    let topBars = document.getElementsByClassName("PrimaParte");
    let bottomBars = document.getElementsByClassName("TerzaParte");
    for (let i = 0; i < topBars.length; i++) {
        topBars[i].style.backgroundColor = "rgb(90, 2, 2)";
    }
    for (let i = 0; i < bottomBars.length; i++) {
        bottomBars[i].style.backgroundColor = "rgb(90, 2, 2)";
    }
    let frames = document.getElementsByClassName("frame");
    for (let i = 0; i < frames.length; i++) {
        frames[i].style.backgroundColor = "rgb(150, 150, 150)";
    }
}

function temaTricolore() {
    let a = document.getElementById("tema");
    a.style.backgroundColor = "rgb(219, 219, 219)";
    let topBars = document.getElementsByClassName("PrimaParte");
    let bottomBars = document.getElementsByClassName("TerzaParte");
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
