import { get } from "jquery";
import "../css/styles.scss";

import './main.js';
import backgroundModal from '../svg/wave.svg';

//funcion "main"
window.addEventListener('load', function () {
    setTimeout(() => {
        setTimeout(() => {
            document.querySelector("#box_loader").style.display="none";
        }, 300);
        document.querySelector("#box_loader").classList.add("closed_opacity");
    }, 2000);

    //Generacion de Componentes al abrir la página
    (crearFilaRecetas());
    //escucha del boton receta Aleatoria
    document.querySelector("#btn_random").addEventListener('click', function (evt) {
        evt.preventDefault();
        recetaSorpresa();
    });
    //Cargamos la primer receta Sorpresa
    recetaSorpresa();
    escuchadoresCloseModal();
    




    logicaBuscador();
    activarEschuchaDark();

});

function logicaBuscador(){
    
    let search_input = document.querySelector("#search_input");
    let btn_buscar = document.querySelector("#btn_buscar");

    btn_buscar.addEventListener('click', function () {
        if (search_input.value != "") {
            console.log(search_input.value);

            setTimeout(() => {
                document.querySelector("#btn_random").style.display = "none";
                document.querySelector("#random").style.display = "none";
            }, 300);
            document.querySelector("#btn_random").classList.add("closed");
            document.querySelector("#div_recipe_random").classList.add("closed");


            getRecetaSearch(search_input.value)
                .then(
                    data => {
                        document.querySelector("#title_section_lista").innerHTML = " "+data.meals.length+" resultados para \"" + search_input.value + "\"";
                        for (let index = 0; index < data.meals.length; index++) {
                            const div_card =creaTarjetaReceta(data,index);
                            document.querySelector("#section_lista").appendChild(div_card);
                        }
                    }
                )
                .catch(
                    () =>  {
                        document.querySelector("#title_section_lista").innerHTML = "No se encontraron resultados para \"" + search_input.value + "\"";
                    }
                );


        }
    });
}

function escuchadoresCloseModal() {
    //listeners o escuchadores que estan a la espera de cerrar el modal
    let modal = document.querySelector("#modal");


    //si se le da click en cualquier lugar que no sea el area de receta
    modal.addEventListener('click', function () {
        setTimeout(() => {
            document.querySelector(".modal-content").style.display = "none";
            modal.style.display = "none";
        }, 300);
        document.querySelector(".modal-content").style.animationName = ("modal-close");
    });

}
//Generar receta Aleatoria
function recetaSorpresa() {

    getRecetaRandom()
        .then(
            data => {
                return creaTarjetaReceta(data,0);
            }
        )
        .then(function (div_card) {
            const recetaSorpresaAleatoria = document.querySelector(".receta-sorpresa");
            recetaSorpresaAleatoria.innerHTML = '';
            recetaSorpresaAleatoria.appendChild(div_card);
            console.log(div_card);
        });

}


//funcion para hacer fetch a la api y regresa las categorias
function getCategories() {
    return fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(
            (data) => data.json()
        );
}

//funcion para hacer fetch a la API y regresa recetas aleatorias
function getRecetaRandom() {
    return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(
            (data) => data.json()
        );
}

//funcion para hacer fetch a la API cuando se busca
function getRecetaSearch(search_input_value) {
    return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + search_input_value)
        .then(
            (data) => data.json()
        );
}


//Funcion para crear filas ordenadas de 5 columnas
function crearFilaRecetas() {
    for (let i = 0; i < 12; i++) {

            getRecetaRandom()
                .then(
                    data => {
                        return creaTarjetaReceta(data,0);
                    }
                )
            .then(function (div_card) {
                document.querySelector("#section_lista").appendChild(div_card);
            });
    }

}


//funcion que crea una tarjeta de receta y la agrega al div de recectas 
//la creacion de esta tarjeta esta basada en las tarjetas que nos ofrece bootstrap
//las clases que se agregan son las que usa Bootstrap
function creaTarjetaReceta(data, iterator) {
    console.log(data);
    //se ccrea el elemento div
    let div_card = document.createElement("div");
    //se le agrega la clase al elemento div creado
    div_card.classList.add("templateone__data");
    //se crea un elemento imagen
    let img_card = document.createElement("img");
    
    img_card.classList.add("templateone__img");
    img_card.src = data.meals[iterator].strMealThumb;
    div_card.appendChild(img_card);
    //se crea el titulo
    let h3 = document.createElement("h3");
    //se le agrega el nombre de la comda al titulo
    h3.append(data.meals[iterator].strMeal);
    //se agrega el titulo como hijo de div_title
    
    h3.classList.add("templateone__title");
    div_card.appendChild(h3);
    //se agrega div_title como hijo de div_body
    let p = document.createElement("p");
    p.append("Categoría: " + data.meals[iterator].strCategory);
    //se agregan las clases al parrafo
    p.classList.add("card-text");
    //se agrega el parrafo como hijo del div_body
    div_card.appendChild(p);
    //se genera un Listener para la tarjeta

    div_card.addEventListener('click', function () {
        let card_modal = document.createElement("div");
        card_modal.classList.add("modal-content");
        document.querySelector("#section_titulo").appendChild(card_modal);
        console.log("click en card");
        console.log(div_card);
        //aparece un modal
        modal.style.display = "block";
        document.querySelector(".modal-content").style.display = "grid";

        //se genera la imagen
        //se crea un elemento imagen
        let img_modal = document.createElement("img");
        img_modal.src = data.meals[iterator].strMealThumb;

        //se genera el titulo
        let h2_modal = document.createElement("h2");
        h2_modal.append(data.meals[iterator].strMeal);

        let arrIngredientes = [];
        arrIngredientes.push("<ul>")
        for (let index = 1; index <= 20; index++) {

            if (data.meals[iterator]["strIngredient" + index] == "" || data.meals[iterator]["strIngredient" + index] == null) {
                continue
            } else {
                arrIngredientes.push("<li>" + " " + data.meals[iterator]["strIngredient" + index] + " ( " + data.meals[iterator]["strMeasure" + index] + " ) </li>");
            }

        }
        arrIngredientes.push("</ul>")
        // arrIngredientes=arrIngredientes.join();
        const modalActive= document.querySelector(".modal-content");
        modalActive.innerHTML = (
            `<div id="image-title-modal">
            <img src="${data.meals[iterator].strMealThumb}"/>
            <h1>
               ${data.meals[iterator].strMeal} 
            </h1>
            <h4>
                Categoría: ${data.meals[iterator].strCategory}
            </h4>
            </div>
            <div id="body-info-modal">
                <h2>Ingredientes</h2>
                ${arrIngredientes.toString().replaceAll(",", "")}
                <h2>Instrucciones</h2>
                <p>${data.meals[iterator].strInstructions}<p/>
            </div>`
        );
        modalActive.style.animationName = ("modal-open");
        modalActive.style.backgroundImage = 'url("'+backgroundModal+'")';
        modalActive.style.backgroundRepeat = 'no-repeat';
        modalActive.style.backgroundPosition = 'bottom';
    });
    return div_card;
}