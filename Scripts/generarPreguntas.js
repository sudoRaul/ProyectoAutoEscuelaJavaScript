window.addEventListener("DOMContentLoaded", function () {
    // Definimos la clase Pregunta
    class Pregunta {
        constructor(enunciado, opcionA, opcionB, opcionC, resCorrecta, dificultad, categoria) {
            this.enunciado = enunciado;
            this.opcionA = opcionA;
            this.opcionB = opcionB;
            this.opcionC = opcionC;
            this.resCorrecta = resCorrecta;
            this.dificultad = dificultad;
            this.categoria = categoria;
            
        }
    }

    

    // Obtenemos las preguntas desde localStorage
    let arrayPreguntas = JSON.parse(localStorage.getItem("preguntas")) || [];
    // Obtenemos las categorias desde localStorage
    let arrayCategorias = JSON.parse(localStorage.getItem("categorias")) || []
    
    let enunciadoPregunta = document.getElementById("enunciado");
    //Creamos un elemento select para mostrar las categorías
    let selectCategorias = document.createElement("select");
    selectCategorias.id = "categoria";
    //Recorremos el array de categorias y las mostramos como opciones
    enunciadoPregunta.after(selectCategorias);
    for(let i = 0; i < arrayCategorias.length; i++){
        let optionCategoria = document.createElement("option");
        optionCategoria.textContent = arrayCategorias[i];
        optionCategoria.value = arrayCategorias[i];
        selectCategorias.append(optionCategoria)
    }

    //Obtenemos los valores de la pregunta (enunciado, categoría, dificultad, posibles respuestas, y respuesta correcta)
    document.querySelector("button").addEventListener("click", function (e) {
        e.preventDefault();
        let enunciado = document.getElementById("enunciado").value;
        let opcionA = document.getElementById("a").value;
        let opcionB = document.getElementById("b").value;
        let opcionC = document.getElementById("c").value;
        let resCorrecta = document.getElementById("respuesta").value;
        let dificultad = document.getElementById("dificultad").value;
        let categoria = document.getElementById("categoria").value;

        // Validamos campos
        if (enunciado.length > 1 && resCorrecta.length == 1 && categoria.length > 1) {
            //Creamos la pregunta
            let pregunta = new Pregunta(enunciado,opcionA, opcionB, opcionC, resCorrecta, dificultad, categoria);
            arrayPreguntas.push(pregunta);
            localStorage.setItem("preguntas", JSON.stringify(arrayPreguntas));

            // Mostramos un mensaje para informar que se ha añadido
            let mensajeError = document.createElement("p");
            mensajeError.innerHTML = "Pregunta añadida";
            mensajeError.style.color = "green";
            document.getElementsByTagName("form")[0].after(mensajeError);
            setTimeout(() => {
                mensajeError.textContent = "";
            }, 2500);

        } else {
            // Se muestra un mensaje de error en caso de no crearse
            let mensajeError = document.createElement("p");
            mensajeError.innerHTML = "Complete todos los campos correctamente.";
            mensajeError.style.color = "red";
            document.getElementsByTagName("form")[0].after(mensajeError);
            setTimeout(() => {
                mensajeError.textContent = "";
            }, 2500);
        }
    });
    //Creamos y añadimos un botón para volver al área principal
    let botonVolver = document.createElement("button");
    botonVolver.setAttribute("id", "botonVolver");
    botonVolver.textContent = "Volver al área principal"
    botonVolver.style.marginTop = "3%"
    botonVolver.style.marginLeft = "40%"
    botonVolver.style.width = "20%"
    botonVolver.style.border = "none";
    botonVolver.style.background = "#5bb9c0";
    botonVolver.style.padding = "10px 20px";
    botonVolver.style.fontSize = "18px";
    botonVolver.style.borderRadius = "7px";
    botonVolver.style.cursor = "pointer";
    botonVolver.style.color = "white";
    document.getElementsByTagName("form")[0].after(botonVolver)
    botonVolver.addEventListener("click", function(){
        location.href = "profesor.html"
    })
});
