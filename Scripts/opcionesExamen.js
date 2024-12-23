window.addEventListener("DOMContentLoaded", function () {
    // Recuperamos todos los arrays del localStorage
    let arrayPreguntas = JSON.parse(localStorage.getItem("preguntas")) || [];
    let arrayCategorias = JSON.parse(localStorage.getItem("categorias")) || [];
    let examenes = JSON.parse(localStorage.getItem("examenes")) || [];
    let intentos = JSON.parse(localStorage.getItem("intentos")) || [];
    let usuarios = JSON.parse(localStorage.getItem("users")) || [];
    //Obtenemos el contenedor para modificar el DOM
    let container = document.getElementById("container");
    container.style.width = "50%";
    container.style.marginLeft = "2%";
    //Creamos y añadimos un botón para volver al área principal
    let botonVolver = document.createElement("button");
    botonVolver.setAttribute("id", "botonVolver");
    botonVolver.textContent = "Volver al área principal"
    botonVolver.style.marginTop = "3%"
    botonVolver.style.width = "100%"
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
    // Creamos un select para mostrar las categorías
    let selectCategorias = document.createElement("select");
    selectCategorias.setAttribute("id", "selectCategorias");
    selectCategorias.style.width = "100%";
    selectCategorias.style.padding = "10px 10px";
    selectCategorias.style.borderRadius = "6px";
    selectCategorias.style.marginBottom = "15px";
    container.appendChild(selectCategorias);
    //Creamos una opción inicial para que se deba elegir alguna categoría
    let opcionInicial = document.createElement("option");
    opcionInicial.textContent = "Elige una categoría";
    selectCategorias.appendChild(opcionInicial);
    //Recorremos las categorías y las añadimos al select
    arrayCategorias.forEach(categoria => {
        let opcion = document.createElement("option");
        opcion.value = categoria;
        opcion.textContent = categoria;
        selectCategorias.appendChild(opcion);
    });

    // Creamos un contenedor para las preguntas
    let contenedorPreguntas = document.createElement("div");
    contenedorPreguntas.setAttribute("id", "contenedorPreguntas");
    container.appendChild(contenedorPreguntas);

    // Evento para mostrar preguntas según la categoría seleccionada
    selectCategorias.addEventListener("change", function () {
        let categoriaSeleccionada = selectCategorias.value;
        // Limpia el contenedor de preguntas
        contenedorPreguntas.innerHTML = ""; 

        // Filtramos preguntas por categoría seleccionada
        let preguntasFiltradas = arrayPreguntas.filter(pregunta => pregunta.categoria === categoriaSeleccionada);
        //Recorremos las preguntas de las categorías filtradas
        preguntasFiltradas.forEach((pregunta, index) => {
            let divPregunta = document.createElement("div");
            divPregunta.style.marginBottom = "10px";

            let enunciado = document.createElement("p");
            enunciado.textContent = `${index + 1}. ${pregunta.enunciado}`;
            enunciado.style.fontWeight = "bold";
            divPregunta.appendChild(enunciado);

            let opciones = [pregunta.opcionA, pregunta.opcionB, pregunta.opcionC];
            opciones.forEach(opcion => {
                let divOpcion = document.createElement("div");
                let input = document.createElement("input");
                input.type = "checkbox";

                let label = document.createElement("label");
                label.textContent = opcion;
                label.style.marginLeft = "5px";

                divOpcion.appendChild(input);
                divOpcion.appendChild(label);
                divPregunta.appendChild(divOpcion);
            });

            divPregunta.appendChild(document.createElement("hr"));
            contenedorPreguntas.appendChild(divPregunta);
        });
    });

    // Obtenemos el contenedor del formulario
    let opcionesExamen = document.getElementById("creacionExamen");

    // Clase Examen
    class Examen {
        constructor(fecha, nombre, preguntas) {
            this.fecha = fecha;
            this.nombre = nombre;
            this.preguntas = preguntas;
        }
    }

    // Clase Intento
    class Intento {
        constructor(usuario, nombreEx) {
            this.usuario = usuario;
            this.nombreEx = nombreEx;
            this.estado = "pendiente";
            this.respuestas = [];
        }
    }
    // Evento para crear un nuevo examen y un nuevo intento para cada uno de los alumnos registrados
    document.querySelector("#creacionExamen button").addEventListener("click", function (e) {
        e.preventDefault();

        let fechaExamen = document.getElementById("fecha").value;
        let nombreExamen = document.getElementById("nombreExamen").value;
        let examen = new Examen(fechaExamen, nombreExamen, arrayPreguntas);
        //Añadimos el examen al array y al localStorage
        examenes.push(examen);
        localStorage.setItem("examenes", JSON.stringify(examenes));
        // Intento por cada usuario
        usuarios.forEach(usuario => {
            if (usuario.isValid) {
                let intento = new Intento(usuario.email, examen.nombre);
                intentos.push(intento);
            }
        });

        localStorage.setItem("intentos", JSON.stringify(intentos));
        //Mensaje de éxito si todo funciona bien
        let mensajeExito = document.createElement("p");
        mensajeExito.textContent = "Examen generado correctamente y asignado a los usuarios.";
        mensajeExito.style.color = "green";
        mensajeExito.style.marginTop = "10px";
        opcionesExamen.appendChild(mensajeExito);

        setTimeout(() => {
            mensajeExito.textContent = "";
        }, 3000);
    });

    // Mostramos los exámenes según el usuario activo
    if (usuarioActivo.rol === "alumno") {
        let tablaExamenes = document.getElementById("tablaExamenes");
        let examenesAsignados = intentos.filter(intento => intento.usuario === usuarioActivo.email);
        //Se muestran los exámenes asignados al usuario
        examenesAsignados.forEach(intento => {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${intento.nombreEx}</td>
                <td>${intento.estado}</td>
                <td><button>Realizar</button></td>
            `;
            tablaExamenes.appendChild(fila);
        });
    }
});
