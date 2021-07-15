// ds la partie fonction: va s'exécuter sssi la page web se charge totalement
window.onload = function() {

/*
une fonction qui prend en parametre un nombre
et affiche dans le catalogue le film associé
à ce nombre

<div class="film">
  <img src="images/Intouchables.jpg" alt="Intouchables">
  <h3>test-titre</h3>
</div>
*/

for (var i = 0; i < filmData.length; i++) {
  createFilm(i);
}

function createFilm(number) {
var someFilm = filmData[number];

//crée le div: crée une variable qui récupére  le document et crée un élément ds le document; l'élément div crée est récupéré dans film

//création d'un film
var film = document.createElement("div");
film.className="film";
   //l'id doit etre unique donc on utilise l'indice des films
film.id = number+"-film";

//création de l'image
var image = document.createElement("img");
image.src = someFilm.image;
image.alt = someFilm.title;

//création du titre du film
var titre = document.createElement("h3");
titre.innerHTML=someFilm.title;

//mettre les éléments ensemble dans l'élément div crée sous le nom de film
film.appendChild(image);
film.appendChild(titre);

document.getElementById("films").appendChild(film);

}

//cibler l'élément
var input = document.getElementsByTagName("input");
var films = document.getElementById("films");
var sélection = document.getElementById("sélection");
input[0].addEventListener("keyup", recherche);
input[1].addEventListener("mouseup", checkbox);
films.addEventListener("mouseover", survolFilm);
films.addEventListener("mouseout", finSurvol);
films.addEventListener("click", sélectionFilm);
sélection.addEventListener("click", clickSelection);




//l'argument event permet à la fonction de savoir qu'une valeur a été saisie dans le champ input et donc permet d'associer la valeur de input à la fonction recherche
function recherche(event) {
  //récupére la valeur dans le input
 var inputValue = event.target.value;
 inputValue = inputValue.toLowerCase();
 console.log(inputValue);

 //regarder si la valeur de l'input est incluse dans le titre des films
 /*if (inputValue == "") {
   //input est vide
 }else {
   input n'est pas vide*/
   for (var i = 0; i < filmData.length; i++) {
    var titre = filmData[i].title;
    titre = titre.toLowerCase();
    var film = document.getElementById(i+"-film");

    //si le titre du film inclus la valeur de l'input
    if (titre.includes(inputValue) == false) {
      film.style.display = "none";
    }else {
      film.style.display = "inline-block";
    }
   }
} //fin fonction recherche

function checkbox(event) {
  var détails = document.getElementById("détails");
  console.log(event.target.checked);
  if (event.target.checked) {
    détails.style.display = "none";
  }else {
    détails.style.display = "block";
  }
} //fin fonction checkbox

function survolFilm(event) {
  var elementSurvolee = event.target.parentNode;
  var identifiantFilm = elementSurvolee.id;
  var position;

  if (identifiantFilm == "catalog") {
    return;
  }else if (identifiantFilm.length == 6) {
    //récupére le premier caractére dans films
    position = identifiantFilm[0];
  }else if (identifiantFilm.length == 7) {
    //récupére le deuxiéme caractére dans films
    position = identifiantFilm[0] +identifiantFilm[1];
  }else {
    return;
  }

  var descriptionFilm = filmData[position].text;
  document.getElementById("détails").innerHTML = descriptionFilm;

  //console.log(descriptionFilm);

}//fin fonction survolFilm

function finSurvol(event) {
    document.getElementById("détails").innerHTML = "";
}//fin fonction finSurvol

function sélectionFilm(event) {
  //récupére l'élément sur lequel on a détecté le click
 var film = event.target.parentNode;
 var select1 = document.getElementById("sélection1");
 var select2 = document.getElementById("sélection2");

//mettre l'événement sur le film qui a été récupéré
film.addEventListener("mouseover", survolFilm);
film.addEventListener("mouseout", finSurvol);
//récupere tous les noeuds enfants de la partie sélection1, les noeuds st les éléments
 var select1Child = select1.childNodes;
 var select2Child = select2.childNodes;

 if (select1Child.length == 1) {
   //partie sélection1 est vide
   //l'élément à insérer est en premier position
   select1.insertBefore(film, select1Child[0]);
 }else if (select2Child.length == 1) {
   //partie sélection2 est vide
   select2.insertBefore(film, select2Child[0]);
 }else {
   alert("Désolé, vous avez déjà choisi deux films!");
 }
  console.log(select2Child);
}// fin fonction sélectionFilm

function clickSelection(event) {
  var elementClickee = event.target;
  //pour cibler le film
  var film = elementClickee.parentNode;
  //cibler la partie sélection
  var select = film.parentNode;
  var selectChild = select.childNodes;

  if (selectChild[0].className == "film") {
    var copyFilm = selectChild[0]; //copie le film dans une variable
    select.removeChild(copyFilm);
    document.getElementById("films").appendChild(film);
  }
  // console.log(selectChild);
}



}
