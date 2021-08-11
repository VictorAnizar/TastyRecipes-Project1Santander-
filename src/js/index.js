import { get } from "jquery";
import "../css/styles.scss";

window.addEventListener('load', function () {

    //Se van a listar 8 recetas de comida
    for (let index = 1; index <= 8; index++) {
        getRecetaRandom()
            .then(
                data => {
                    creaTarjetaReceta(data);
                }
            );
    }
});

//funcion para hacer fetch a la API
function getRecetaRandom() {
    return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(
            (data) => data.json()
        );
}

//funcion que crea una tarjeta de receta y la agrega al div de recectas 
//la creacion de esta tarjeta esta basada en las tarjetas que nos ofrece bootstrap
//las clases que se agregan son las que usa Bootstrap
function creaTarjetaReceta(data){
    //se ccrea el elemento div
    let div_card = document.createElement("div");
    //se le agrega la clase al elemento div creado
    div_card.classList.add("card");
    //se crea un elemento imagen
    let img_card = document.createElement("img");
    img_card.src=data.meals[0].strMealThumb;
    //se le agregan clases a la imagen
    img_card.classList.add("card-img-top");
    //se introduce como hijo la imagen al div creado
    div_card.appendChild(img_card);
    //se crea el div del cuerpo de la tarjeta
    let div_body = document.createElement("div");
    //se le agrega la clase
    div_body.classList.add("card-body");
    //se introduce como hijo el div_body al div_card
    div_card.appendChild(div_body);
    //se crea el titulo
    let h5 = document.createElement("h5");
    //se le agrega el nombre de la comda al titulo
    h5.append(data.meals[0].strMeal);
    //se agrega el titulo como hijo del div_body
    div_body.appendChild(h5);
    //se crea el parafo de la comida
    let p = document.createElement("p");
    p.append("Categoría: " + data.meals[0].strCategory);
    //se agregan las clases al parrafo
    p.classList.add("card-text");
    //se agrega el parrafo como hijo del div_body
    div_body.appendChild(p);
    //se crea el boton de la comida
    let a = document.createElement("a");
    a.append("Ver receta ");
    //se agregan las clases al boton
    a.classList.add("btn");
    a.classList.add("btn-primary");
    //se agrega el parrafo como hijo del div_body
    div_body.appendChild(a);
    //se agrega todo al div principal
    document.querySelector("#section_lista").appendChild(div_card);
}