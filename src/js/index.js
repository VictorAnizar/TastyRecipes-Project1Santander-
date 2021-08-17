import { get } from "jquery";
import "../css/styles.scss";
//funcion "main"

import backgroundModal from '../svg/wave.svg';
console.log(backgroundModal);
window.addEventListener('load', function () {







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
    




    let search_input = document.querySelector("#search_input");
    let btn_buscar = document.querySelector("#btn_buscar");

    btn_buscar.addEventListener('click', function () {
        if (search_input.value != "") {
            console.log(search_input.value);

            setTimeout(() => {
                document.querySelector("#btn_random").style.display = "none";
                document.querySelector("#div_recipe_random").style.display = "none";
            }, 300);
            document.querySelector("#btn_random").classList.add("closed");
            document.querySelector("#div_recipe_random").classList.add("closed");

            
            let sectionLista = document.querySelector("#section_lista");

            sectionLista.innerHTML = '<hr>';

            getRecetaSearch(search_input.value)
                .then(
                    data => {
                        document.querySelector("#title_section_lista").innerHTML = " "+data.meals.length+" resultados para \"" + search_input.value + "\"";
                        document.querySelector("#footer").style.position="";
                        document.querySelector("#footer").style.bottom="";
                        for (let index = 0; index < data.meals.length; index++) {
                            console.log(data);
                            //se ccrea el elemento div
                            let div_card = document.createElement("div");
                            //se le agrega la clase al elemento div creado
                            div_card.classList.add("card");
                            //se crea un elemento imagen
                            let img_card = document.createElement("img");
                            img_card.src = data.meals[index].strMealThumb;
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
                            //Se crea un div para el titulo
                            let div_title = document.createElement("div");
                            //se le agrega la clase
                            div_title.classList.add("card-title");
                            //se crea el titulo
                            let h5 = document.createElement("h5");
                            //se le agrega el nombre de la comda al titulo
                            h5.append(data.meals[index].strMeal);
                            // console.log(data.meals[index].strMeal.toLowerCase().indexOf(search_input.value.toString()));
                           
                            //se agrega el titulo como hijo de div_title
                            div_title.appendChild(h5);
                            //se agrega div_title como hijo de div_body
                            div_body.appendChild(div_title);
                            //se crea el parafo de la comida
                            let p = document.createElement("p");
                            p.append("Categoría: " + data.meals[index].strCategory);
                            //se agregan las clases al parrafo
                            p.classList.add("card-text");
                            //se agrega el parrafo como hijo del div_body
                            div_body.appendChild(p);
                            //se genera un Listener para la tarjeta
                            div_card.style.animationName="modal-open";
                            div_card.style.animationDuration="300ms";
                            div_card.style.animationTimingFunction="linear";
                

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
                                img_modal.src = data.meals[index].strMealThumb;

                                //se genera el titulo
                                let h2_modal = document.createElement("h2");
                                h2_modal.append(data.meals[index].strMeal);

                                let arrIngredientes = [];
                                arrIngredientes.push("<ul>")
                                for (let jindex = 1; jindex <= 20; jindex++) {

                                    if (data.meals[index]["strIngredient" + jindex] == "" || data.meals[index]["strIngredient" + jindex] == null) {
                                        continue
                                    } else {
                                        arrIngredientes.push("<li>" + " " + data.meals[index]["strIngredient" + jindex] + " ( " + data.meals[index]["strMeasure" + jindex] + " ) </li>");
                                    }

                                }
                                arrIngredientes.push("</ul>")
                                // arrIngredientes=arrIngredientes.join();
                                document.querySelector(".modal-content").innerHTML = (
                                    `<div id="image-title-modal">
                                    <img src="${data.meals[index].strMealThumb}"/>
                                    <h1>
                                    ${data.meals[index].strMeal} 
                                    </h1>
                                    <h4>
                                        Categoría: ${data.meals[index].strCategory}
                                    </h4>
                                    </div>
                                    <div id="body-info-modal">
                                        <h2>Ingredientes</h2>
                                        ${arrIngredientes.toString().replaceAll(",", "")}
                                        <h2>Instrucciones</h2>
                                        <p>${data.meals[index].strInstructions}<p/>
                                    </div>`
                                );
                                

                                document.querySelector(".modal-content").style.animationName = ("modal-open");
                            });
                            
                            document.querySelector("#section_lista").appendChild(div_card);
                        }
                    }
                )
                .catch(
                    () =>  {
                        document.querySelector("#footer").style.position="fixed";
                        document.querySelector("#footer").style.bottom="0";
                        document.querySelector("#title_section_lista").innerHTML = "No se encontraron resultados para \"" + search_input.value + "\"";
                    }
                );


        }
    });

});
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
                return creaTarjetaReceta(data);
            }
        )
        .then(function (div_card) {
            const recetaSorpresaAleatoria = document.querySelector(".receta-sorpresa");
            recetaSorpresaAleatoria.innerHTML = '';
            recetaSorpresaAleatoria.appendChild(div_card);
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
    const div_row = document.createElement("div");
    div_row.classList.add("row");
    const card = [];
    for (let i = 0; i < 5; i++) {

            getRecetaRandom()
                .then(
                    data => {
                        return creaTarjetaReceta(data);
                    }
                )
            .then(function (div_card) {

                //Creamos un nuevo div que funciona como celda
                const div_col = document.createElement("div");
                div_col.classList.add("col", "container-box-padding");
                //Añadimos la tarjeta que recibimos a un nuevo div que funciona como celda
                div_col.appendChild(div_card);
                //Añadimos la nueva celda a la fila
                div_row.appendChild(div_col);
                //Enviamos la fila
                document.querySelector("#section_lista").appendChild(div_row);
                return div_card;
            })
            .then(
                div_card => {
                    card.push(div_card);
                }
            );
    }
    return card;

}


//funcion que crea una tarjeta de receta y la agrega al div de recectas 
//la creacion de esta tarjeta esta basada en las tarjetas que nos ofrece bootstrap
//las clases que se agregan son las que usa Bootstrap
function creaTarjetaReceta(data) {
    console.log(data);
    //se ccrea el elemento div
    let div_card = document.createElement("div");
    //se le agrega la clase al elemento div creado
    div_card.classList.add("card");
    //se crea un elemento imagen
    let img_card = document.createElement("img");
    img_card.src = data.meals[0].strMealThumb;
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
    //Se crea un div para el titulo
    let div_title = document.createElement("div");
    //se le agrega la clase
    div_title.classList.add("card-title");
    //se crea el titulo
    let h5 = document.createElement("h5");
    //se le agrega el nombre de la comda al titulo
    h5.append(data.meals[0].strMeal);
    //se agrega el titulo como hijo de div_title
    div_title.appendChild(h5);
    //se agrega div_title como hijo de div_body
    div_body.appendChild(div_title);
    //se crea el parafo de la comida
    let p = document.createElement("p");
    p.append("Categoría: " + data.meals[0].strCategory);
    //se agregan las clases al parrafo
    p.classList.add("card-text");
    //se agrega el parrafo como hijo del div_body
    div_body.appendChild(p);
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
        img_modal.src = data.meals[0].strMealThumb;

        //se genera el titulo
        let h2_modal = document.createElement("h2");
        h2_modal.append(data.meals[0].strMeal);

        let arrIngredientes = [];
        arrIngredientes.push("<ul>")
        for (let index = 1; index <= 20; index++) {

            if (data.meals[0]["strIngredient" + index] == "" || data.meals[0]["strIngredient" + index] == null) {
                continue
            } else {
                arrIngredientes.push("<li>" + " " + data.meals[0]["strIngredient" + index] + " ( " + data.meals[0]["strMeasure" + index] + " ) </li>");
            }

        }
        arrIngredientes.push("</ul>")
        // arrIngredientes=arrIngredientes.join();
        const modalActive= document.querySelector(".modal-content");
        modalActive.innerHTML = (
            `<div id="image-title-modal">
            <img src="${data.meals[0].strMealThumb}"/>
            <h1>
               ${data.meals[0].strMeal} 
            </h1>
            <h4>
                Categoría: ${data.meals[0].strCategory}
            </h4>
            </div>
            <div id="body-info-modal">
                <h2>Ingredientes</h2>
                ${arrIngredientes.toString().replaceAll(",", "")}
                <h2>Instrucciones</h2>
                <p>${data.meals[0].strInstructions}<p/>
            </div>`
        );
        modalActive.style.animationName = ("modal-open");
        modalActive.style.backgroundImage = 'url("'+backgroundModal+'")';
        modalActive.style.backgroundRepeat = 'no-repeat';
        modalActive.style.backgroundPosition = 'bottom';
    });
    return div_card;
}