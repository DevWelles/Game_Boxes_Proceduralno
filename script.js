
var nivo = 1;
var brojKrugovaNivo = [2,4,6,8,10,12,14,16,18,20];
var vrijemeNivo = 20;
var boje = ["red", "blue", "green", "yellow"];
//var boje = ["r2"];
var generiraniKrugovi = [];
var randBoja, novi;
var pozicijaKlikaZaDrag = [];
var brojacVremena;


//maknuo sam oni original funkciju koju je napisao profa i stavio sve u jednu funkciju glavnaFunkcija()
// i odite u index.html i tamo vidite da na onClick se sad poziva ova funkcija

function glavnaFunkcija() {
  console.log(document.getElementById("startStop").innerText); //ovo čisto zbog provjere da mi samo vidimo u consoli da li se ispravno mijenja innerText botuna
  let trenutniTekst = document.getElementById("startStop").innerText;
  if (trenutniTekst == "Započni igru") { // ako na botunu piše Započni igru u trenutku kad kliknemo na njega ulazimo u ovaj if statement
    generirajKrugoveNaRandomMjestima(brojKrugovaNivo[nivo - 1]); //generiramo krugove pozivom ove funkcije a parametar ce biti broj kojeg dobijem kao index iz arraya. Trenutno je to 0 jer je nivo 1, pa ide 1-1=0, kasnije kako nivo raste raste i index
    document.getElementById("startStop").innerText = "Provjeri rezultat"; // mijenjamo text u botunu
    brojacVremena = setInterval(odbrojavaj, 1000); //pokrenemo odbrojavanje
    document.getElementById("paragraph").innerText = "Status igre: PLAYING trenutni nivo je " + nivo //mijenjam text u paragrafu
  } 
  //ovaj elif statement je srce cijelog koda, ako njega shvatite onda ste sve shvatili
  else if (trenutniTekst == "Provjeri rezultat") { //ako na botunu piše Provjeri rezultat u trenutku klika ulazimo u ovaj elif statement
    let trenutnaProvjera = provjeriKrugove(generiraniKrugovi); // prvo pozovemo ovu funkciju (definirina je oko 70. linije koda)koja ce vratiti varijablu provjera koja može biti true ili false ovisno o tome jesu li svi krugovi u boxovima i njen return spremamo u varijablu trenutnaProvjera, znači trenutnaProvjera može biti true ili false
    console.log("trenutna provjera je " + trenutnaProvjera); //ako niste sigurni u vrijednost varijable onda ju uvik concole.log da ju vidite u consoli u datom trenutku
    trenutnoStanje(trenutnaProvjera); //ovu funkciju sam definirao skorz dolje na kraju pa ju pogledajte
   /* trenutnoStanje(provjeriKrugove(generiraniKrugovi)) 
      mogli smo i na ovakav način pozvati funkciju trenutnoStanje jer ja znam što vraća funkcija provjeriKrugove, ali mislim da je vama čitljiviji način ovaj iznad prikazani
   */
  // znači trenutno stanje mi može namjestiti text botuna da bude "Pokušaj ponovno" ili "Bravo prošao si {nivo}. nivo"
  // i ovisno o tome ulazimu u jedan od ova dva else if statementa:
  } 
  else if (trenutniTekst == "Pokušaj ponovno") {
    window.location.reload(); //samo reloadam tako mi je najalkše sve vratit na poečtak
  } 
  else if (trenutniTekst == `Bravo prošao si ${nivo-1}. nivo`) { //moram stavit nivo-1 jer smo ga već povećali na nivo++ u funkciji trenutno stanje
    generirajKrugoveNaRandomMjestima(brojKrugovaNivo[nivo - 1]);
    document.getElementById("startStop").innerText = "Provjeri rezultat";
    document.getElementById("paragraph").innerText = "Status igre: PLAYING trenutni nivo je " + nivo
    brojacVremena = setInterval(odbrojavaj, 1000);
  }
  else {
    console.log('nešto nevalja haha')
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

function provjeriKrugove(generiraniKrugovi) { //jako loš način provjere da li su krugovi u boxovima, ali meni je bilo bitno da napravim bilo što samo da radi a kasnije onda googlam bolje načine.. 
  let provjera = true;                         // u principu samo provjeravam ofsset svakog kruga od bodya u px pa ako netko ima jako veliki ili jako mali ekran krivo će izmirit pixele i ispast ce da je krug unutar boxa iako je vani, ali za normalne ekrane radi ok 
                                              // Kolegica Irena je puno bolje napravila sa funkcijom Element.getBoundingClientRect() za koju ja nisam imao pojma da postoji niti sam ju uspio proguglati tako da hvala Ireni :)
  for (let i = 0; i <generiraniKrugovi.length; i++) {//običan for loop kroz array
    let krug = generiraniKrugovi[i] //varijabla krug je svaki element u array na idexu i znači od 0 do kraja arraya
    if(krug.style.backgroundColor == "red" && (krug.offsetLeft < 50 || krug.offsetLeft > 700 || krug.offsetTop < 90 || krug.offsetTop > 300)) { //prvo gledajte && operator, ako je exxpresion prije njega točan onda se ide gledati što je nakon njega, znači da se u ovaj if statement ulazi samo ako je krug.style.background =="red", ako nije onda interpreter uopće ne gleda ostatak koda. A ako je "red" onda ide dalje i provjerava poziciju kruga pomoću offSet funckije i ako je krug van zadanih parametara odradit ce ostatak koda, a ako je u zadanim parametrima znaci da je krug u svom boxu i sve ok idemo dalje
      console.log(krug);//da ga vidim u consoli i kliknem na njega da vidim koji je to tocno na ekranu i koji su njegovi parametri i zašto mi ga očitava kao da nije u boxu
      console.log(krug.offsetTop) //ova mora biti u korelaciji sa px u propertyu Top od tog kruga na taj način sam provjeravao gdje je koji krug i koliko px da namjestim 
      console.log(krug.offsetLeft)
      console.log("red circle is not in red box")//
      provjera = false; //i naravno ono najbitnije ako krug nije u boxu stavimo varijablu provjera na false i onda kasnije kad pozivamo funkciju gore na 26 liniji koda pospremimo tu varijablu u trenutnoStanje i to ubacimo u funckiju trenutnoStanje(trenutnaProvjera) na 28. liniji koda
    }
    else if(krug.style.backgroundColor == "blue" && (krug.offsetLeft < 630 || krug.offsetLeft > 1540 || krug.offsetTop < 90 || krug.offsetTop > 300)) {
      console.log(krug);
      console.log(krug.offsetLeft)
      console.log(krug.offsetTop)
      console.log("blue circle is not in the box")
      provjera = false;
    }
    else if(krug.style.backgroundColor == "green" && (krug.offsetLeft < 50 || krug.offsetLeft > 700 || krug.offsetTop < 540 || krug.offsetTop > 755)) {
    console.log(krug)
    console.log(krug.offsetTop)
    console.log(krug.offsetLeft)
    console.log("green circle is not in the box")
    provjera = false;
    }
    else if(krug.style.backgroundColor == "yellow" && (krug.offsetLeft < 630 || krug.offsetLeft > 1540 || krug.offsetTop < 540 || krug.offsetTop > 755)) {
      console.log(krug)
      console.log(krug.offsetTop)
      console.log(krug.offsetLeft)
      console.log("yellow circle is not in the box")
      provjera = false;
     }
  }//ovjde se zatvara for loop
  return provjera //vraćamo varijablu provjera koja može biti true ili false ovisno o tome jesu li svi krugovi u svojim boxovima
};

function gameOver() {
    document.getElementById("paragraph").innerText = "Sorry isteklo vrime YOU HAVE LOST"
    document.getElementById("startStop").innerText = "Pokušaj ponovno"
}

//isporbat cu svoju verziju ove funkcije odborajavaj
function odbrojavaj() {
  
  vrijemeNivo--;
  document.getElementById("vrijeme").innerHTML = vrijemeNivo;
  if (vrijemeNivo == 0) {
    clearInterval(brojacVremena);
    gameOver(); //napravite funkciju
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



function trenutnoStanje (provjera) { //ova riječ provjera je samo parametar tj place holder tu, tu sam mogao napisao bilo što npr. paprika. Izabrao sam riječ provjera zbog čitljivosti koda jer kad budemo pozivali ovu funkciju ubacit cemo trenutnuProvjeru
  if (provjera == true && nivo < 10) {  //znači da sam gore umjesto provjera napisao paprika onda bi sad ovdje isto napisao paprika da se ispravno referira na taj parametar
    document.getElementById("startStop").innerText = `Bravo prošao si ${nivo}. nivo`; //mijenjamo tekst u botunu
    document.getElementById("paragraph").innerText = `Status igre: pauzirano, klikni za prelazak na ${nivo +1}. nivo`//mijenjamo text u paragrafu
    clearInterval(brojacVremena); //clearInterval je built in funckija koju pozovemo kad želimo da prestane radit ona funkcija setInterval(), ako to ne napravimo a ponovno pozovemo setInterval() nastaje kaos haha
    vrijemeNivo = 20 + nivo*4 ; // za svaki level povećavam vrijeme da ipak imamo šanse odigrati do kraja
    document.getElementById("vrijeme").innerHTML = vrijemeNivo; //
    nivo++;
      
  } else if (provjera == true && nivo == 10){ //ako je provjera true i došli smo do 10 nivoa pobjedili smo 
    clearInterval(brojacVremena);
    document.getElementById("startStop").innerText = `Bravo prošao si ${nivo}. nivo`;
    document.getElementById("paragraph").innerText = "POBJEDAAAAAA!!! NAJBOLJI SI"
  }
  
  else { //ako varijabla provjera nije true i da nivo nije 10
    document.getElementById("startStop").innerText = "Pokušaj ponovno";
    clearInterval(brojacVremena); 
    document.getElementById("paragraph").innerText = "Status igre: SORRY YOU LOST, NOT ALL CIRCLES ARE IN THE BOXES"
    nivo = 1;
  } 
}

/*


Znam da vam riješenje izgleda ružno teško i nerazumljivo, to je zato što i je haha jer mi je prvo što je palo na pamet
a pošto se i ja učim onda samo radim i slažem sve što mi padne na pamet samo da proradi igrica, a onda kad proradi krenem uljepšavat
ovo je sve napravljeno na proceduralni način i zato izgleda ružno i dugačko, ja ću ga sad napravit na objektno orijentirani način
i modualrno znači podjelit u classe funkcionalnosti za krugove, boxove, vrime, drag and drop, main i koliko god još bude potrebno
Tako da se nemojte obeshrabrit jer tada će biti puno čitljivije i lakše za shvatit tko koga poziva i ko skim manipulira



*/ 

