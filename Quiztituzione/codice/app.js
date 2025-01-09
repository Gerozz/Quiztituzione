function toSlide(id) {
    document.querySelectorAll("div.slide").forEach(function(e) {
        e.classList.add("hidden");
        e.classList.remove("visible");
        e.querySelectorAll("*").forEach(function(e1) {
            e1.tabIndex = "-1"; 
        });
    });
    let d = document.getElementById(id);
    d.classList.add("visible");
    d.classList.remove("hidden");
    d.querySelectorAll("*").forEach(function(e2) {
        e2.tabIndex = "0";  
    });
}

function getCurrentSlide(){
    let s=document.getElementsByClassName("slide visible");
    if(s.length===0) return null; else return s[0];
}

document.getElementById("sceltaPrincipale").addEventListener('click',function(event){
    event.stopPropagation();
})

document.getElementById("costituzione").addEventListener('click',function(event){
    event.stopPropagation();
})

document.getElementById("cultura").addEventListener('click',function(event){
    event.stopPropagation();
})