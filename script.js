var nivo = 1;
var maxNivo = 10;
var brojKrugovaNivo = [2,4, 10, 12, 14, 16, 18, 20, 22, 24, 26];
var vrijemeNivo = 20;
var boje = ["red", "blue", "green", "yellow"];
var generiraniKrugovi = [];
var randBoja, novi;
var pozicijaKlikaZaDrag = [];
var brojacVremena;

let provjera = true;

function zapocniIgru() {
  promijeniBotun();
  
}

function promijeniBotun() {
  console.log(document.getElementById("startStop").innerText);
  let trenutniTekst = document.getElementById("startStop").innerText;
  if (trenutniTekst == "Započni igru") {
    generirajKrugoveNaRandomMjestima(brojKrugovaNivo[nivo - 1]);
    document.getElementById("startStop").innerText = "Provjeri rezultat";
    brojacVremena = setInterval(odbrojavaj, 1000);
    document.getElementById("paragraph").innerText = "Status igre: PLAYING"
  } else if (trenutniTekst == "Provjeri rezultat") {
    provjeriRezultat(generiraniKrugovi);
    if (provjera == true) { //provejrava globalnu varijablu koju seta funkcija provjeriRezultat
      document.getElementById("startStop").innerText = `Bravo prošao si ${nivo} nivo`;
      clearInterval(brojacVremena); // pauzira vrime, nezz kako da ga vratim ponovno na 20 sek
      nivo++;
      
    } else {
      document.getElementById("startStop").innerText = "Pokušaj ponovno";
      clearInterval(brojacVremena); //pauzira vrime tribam naci kako ga restartat da ponovno krene od 20 sek
      document.getElementById("paragraph").innerText = "Status igre: SORRY YOU HAVE LOST THE GAME"
      nivo = 1;
      // generiraniKrugovi.map(krug => document.body.removeChild(krug))
    }   
  } else if (trenutniTekst == "Pokušaj ponovno") {
    window.location.reload();
  } else if (trenutniTekst == `Bravo prošao si ${nivo-1} nivo`) {
    console.log('el proalti')
    generirajKrugoveNaRandomMjestima(brojKrugovaNivo[nivo - 1]);
    document.getElementById("startStop").innerText = "Provjeri rezultat";
    brojacVremena = setInterval(odbrojavaj, 1000);
  }
}

function generirajKrugoveNaRandomMjestima(brojKrugova) {
  console.log(`Generiran je ${brojKrugova} krugova`);
  for (var i = 0; i < brojKrugova; i++) {
    randBoja = Math.floor(Math.random() * 4);
    randLeft = Math.floor(Math.random() * 90); //kasnije primjenjujemo kao postotke
    randTop = Math.floor(Math.random() * 90); //kasnije primjenjujemo kao postotke
    novi = document.createElement("div");
    novi.style.backgroundColor = boje[randBoja];
    novi.style.position = "absolute";
    novi.style.left = `${randLeft}%`;
    novi.style.top = `${randTop}%`;
    novi.style.width = "60px";
    novi.style.height = "60px";
    novi.style.borderRadius = "50%";
    novi.dragged = 0;
    novi.onmousedown = startDrag;

    document.body.appendChild(novi);

    /*
    u ovom dolje polju će biti svi krugovi generirani za pojedini nivo.
    Daklem, pomoću njega ćemo provjeravati na kraju nivo jeli svaki krug završio u pripadajući box (plavi, žuti, zeleni, crveni)
    Za to napraviti trebate još sami izvući(izračunati) top,bottom,left i right koordinate tih boxova
    pa napraviti funkciju za provjeru jeli svaki generirani krug unutar pripadajućeg boxa
    */
    generiraniKrugovi.push(novi);
  }
}

function provjeriRezultat(generiraniKrugovi) {
  console.log(generiraniKrugovi[0])
  for (let i = 0; i <generiraniKrugovi.length; i++) {
     let krug = generiraniKrugovi[i]
    if(krug.style.backgroundColor == "red") {
      console.log(krug)
    
      if(krug.offsetLeft < 50 || krug.offsetLeft > 450 || krug.offsetTop < 90 || krug.offsetTop > 300) {
        console.log(krug.offsetTop)
      console.log(krug.offsetLeft)
        console.log("red circle is not in red box")
        provjera = false;
        break
      }else {
        continue
      }
    }
    else if(krug.style.backgroundColor == "blue") {
      console.log(krug)
      
      if(krug.offsetLeft < 630 || krug.offsetLeft > 1025 || krug.offsetTop < 90 || krug.offsetTop > 300) {
        console.log(krug.offsetLeft)
        console.log(krug.offsetTop)
        console.log("blue circle is not in the box")
        provjera = false;
        break
      }else {
        continue
      }
    }
    else if(krug.style.backgroundColor == "green") {
      
      
      if(krug.offsetLeft < 50 || krug.offsetLeft > 450 || krug.offsetTop < 540 || krug.offsetTop > 755) {
        console.log(krug)
        console.log(krug.offsetTop)
      console.log(krug.offsetLeft)
        console.log("green circle is not in the box")
        provjera = false;
        break
      } else {
        continue
      }
    }
    else if(krug.style.backgroundColor == "yellow") {
      if(krug.style.left < 630 || krug.style.left > 1025 || krug.style.top < 540 || krug.style.top > 755) {
        console.log(krug)
        console.log(krug.offsetTop)
      console.log(krug.offsetLeft)
        console.log("yellow circle is not in the box")
        provjera = false;
        break
      } else {
        continue
      }
    } 
  }
  
  console.log(provjera)
};
function gameOver() {}
function odbrojavaj() {
  let trenutnoVrijeme = parseInt(document.getElementById("vrijeme").innerHTML);
  trenutnoVrijeme--;
  document.getElementById("vrijeme").innerHTML = trenutnoVrijeme;
  if (trenutnoVrijeme == 0) {
    clearInterval(brojacVremena);
    gameOver(); //napravite funkciju
    alert("Kraj igre, isteklo vrijeme");
  }
}

function startDrag(e) {
  e = e || window.event;
  e.preventDefault();
  // get the mouse cursor position at startup:
  pozicijaKlikaZaDrag[0] = e.clientX;
  pozicijaKlikaZaDrag[1] = e.clientY;
  ovaj = e.target;
  ovaj.dragged = 1;
  ovaj.onmousemove = elementDrag;
  ovaj.onmouseup = closeDrag;

  // zakrpa kada se prebrzo povuče pointer, pa se klik otpusti izvan samog elementa
  // tada ova funkcija ubija pomicanje elementa
  ovaj.onmouseout = closeDragFix;
}

function elementDrag(e) {
  e = e || window.event;
  e.preventDefault();
  ovaj = e.target;
  if (ovaj.onmousemove == elementDrag && ovaj.dragged == 1) {
    // calculate the new cursor position:
    pozicijaKlikaZaDrag[2] = pozicijaKlikaZaDrag[0] - e.clientX;
    pozicijaKlikaZaDrag[3] = pozicijaKlikaZaDrag[1] - e.clientY;
    pozicijaKlikaZaDrag[0] = e.clientX;
    pozicijaKlikaZaDrag[1] = e.clientY;
    // set the element's new position:
    ovaj.style.top = ovaj.offsetTop - pozicijaKlikaZaDrag[3] + "px";
    ovaj.style.left = ovaj.offsetLeft - pozicijaKlikaZaDrag[2] + "px";
  }
}

function closeDrag(e) {
  // stop moving when mouse button is released:
  e = e || window.event;
  e.preventDefault();
  ovaj = e.target;
  ovaj.dragged = 0;
  ovaj.onmousemove = null;
  ovaj.onmouseup = null;
}

function closeDragFix(e) {
  // zakrpa kada se prebrzo povuče pointer, pa se klik otpusti izvan samog elementa
  // tada ova funkcija ubija pomicanje elementa
  e = e || window.event;
  e.preventDefault();
  ovaj = e.target;
  ovaj.dragged = 0;
  ovaj.onmousemove = null;
  ovaj.onmouseup = null;
}
// setTimeout(()=> {console.log(generiraniKrugovi[0].style.backgroundColor)}, 3000)
//setTimeout(()=> {console.log(pozicijaKlikaZaDrag)}, 3000)
