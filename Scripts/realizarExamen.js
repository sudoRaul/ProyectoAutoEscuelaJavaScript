window.addEventListener('DOMContentLoaded', function () {
    //Recuperamos los arrays del localStorage
    let examenesArray = JSON.parse(localStorage.getItem("examenes")) || [];
    let intentosArray = JSON.parse(localStorage.getItem("intentos")) || [];
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    // Obtenemos el contenedor principal de la página
    let container = document.getElementById("container");
    container.style.marginTop = "8%";
    container.style.marginLeft = "auto";
    container.style.marginRight = "auto";
    container.style.width = "60%";

    // Mostramos la tabla de exámenes asignados
    function mostrarExamenesAsignados() {
        container.innerHTML = `<h2 style="text-align: center;">Exámenes pendientes</h2>`;
        let tabla = document.createElement("table");
        tabla.style.width = "100%";
        tabla.style.borderCollapse = "collapse";

        let encabezado = `
            <tr>
                <th style="border: 1px solid black; padding: 10px;">Nombre del Examen</th>
                <th style="border: 1px solid black; padding: 10px;">Fecha</th>
                <th style="border: 1px solid black; padding: 10px;">Acción</th>
            </tr>`;
        tabla.innerHTML = encabezado;
        //Filtramos los intentos que pertenecen al usuario activo
        let intentosUsuario = intentosArray.filter(intent => intent.usuario === usuarioActivo.email);
        //Recorremos el array filtrado y mostramos la tabla con los exámenes pendientes
        intentosUsuario.forEach((intento) => {
            //Busca en el array de examenes el nombre del examen que coincida con el nombre del examen 
            //del intento (la clase Intento tiene un campo nombreEx)
            let examen = examenesArray.find(ex => ex.nombre === intento.nombreEx);
            if (examen) {
                //Creamos una tabla si hay examen/es
                let fila = document.createElement("tr");

                fila.innerHTML = `
                    <td style="border: 1px solid black; padding: 10px;">${examen.nombre}</td>
                    <td style="border: 1px solid black; padding: 10px;">${examen.fecha}</td>
                    <td style="border: 1px solid black; padding: 10px;">
                        <button class="realizar-examen" data-examen="${examen.nombre}" style="background: #5bb9c0; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;">
                            Realizar
                        </button>
                    </td>`;
                tabla.appendChild(fila);
            }
        });

        container.appendChild(tabla);
        // Se inicia el examen específico que ha pulsado gracias al dataset 
        document.querySelectorAll(".realizar-examen").forEach(boton => {
            boton.addEventListener("click", function () {
                let examenSeleccionado = examenesArray.find(ex => ex.nombre === this.dataset.examen);
                if (examenSeleccionado) {
                    iniciarExamen(examenSeleccionado);
                }
            });
        });
    }
    // Funcion para mostrar el examen
    function iniciarExamen(examen) {
        //Inicializamos las variables para saber el nº de preguntas, el índice de la pregunta para
        //el carrusel y los aciertos para el resultado
        let arrayPreguntas = examen.preguntas;
        let currentIndex = 0;
        let aciertos = 0;
        // Función para mostrar la pregunta según el índice
        function mostrarPregunta(index) {
            //Limpiamos el contenedor cada vez para mostrar una nueva pregunta
            container.innerHTML = "";
            // Mostramos la pregunta con el enunciado, y las posibles respuestas
            let enunciado = document.createElement("label");
            enunciado.textContent = (index + 1) + "- " + arrayPreguntas[index].enunciado;
            enunciado.style.fontSize = "24px";
            enunciado.style.fontWeight = "600";
            enunciado.style.textAlign = "center";
            container.appendChild(enunciado);

            container.appendChild(document.createElement("br"));
            let opciones = ["A", "B", "C"];
            //Creamos tantos inputs como opciones tenemos
            opciones.forEach(opcion => {
                let input = document.createElement("input");
                input.type = "checkbox";
                input.id = opcion.toLowerCase();
                //Creamos una etiqueta para mostrar el contenido de las opciones
                let label = document.createElement("label");
                label.textContent = arrayPreguntas[index]["opcion" + opcion];
                label.style.marginLeft = "10px";
                label.dataset.opcion = opcion.toLowerCase(); // Asociar la opción
                // Evento para cuando se seleccione una opción se deshabiliten el resto
                //y se ponga en verde si es correcta y sino se pone en rojo y en verde la correcta
                input.addEventListener("change", function () {
                    let checkboxes = container.querySelectorAll('input[type="checkbox"]');
                    //Deshabilita los checks
                    checkboxes.forEach(chk => chk.disabled = true);

                    let labels = container.querySelectorAll("label[data-opcion]");
                    labels.forEach(lbl => {
                        if (lbl.dataset.opcion === arrayPreguntas[index].resCorrecta) {
                            // Correcta en verde
                            lbl.style.color = "green"; 
                        } else if (lbl.dataset.opcion === opcion.toLowerCase()) {
                            // Incorrecta seleccionada en rojo
                            lbl.style.color = "red"; 
                        }
                    });
                    //Si la respuesta es correcta se suma un acierto
                    if (opcion.toLowerCase() === arrayPreguntas[index].resCorrecta) {
                        aciertos++;
                    }
                });

                container.appendChild(input);
                container.appendChild(label);
                container.appendChild(document.createElement("br"));
            });
            // Se crea un contenedor para añadir los botones
            let botonesContainer = document.createElement("div");
            botonesContainer.id = "botonesContainer";
            
            //Boton de atrás
            let botonAtras = document.createElement("button");
            botonAtras.textContent = "Atrás";
            botonAtras.disabled = index === 0;
            botonAtras.style.backgroundColor = index === 0 ? "#ccc" : "#5bb9c0";
            botonAtras.style.color = "white";
            botonAtras.style.border = "none";
            botonAtras.style.padding = "10px";
            botonAtras.style.borderRadius = "5px";
            //Si es la primera pregunta no se puede ir hacia atrás
            botonAtras.style.cursor = index === 0 ? "not-allowed" : "pointer";
            botonAtras.addEventListener("click", function () {
                if (index > 0) {
                    mostrarPregunta(index - 1);
                }
            });
            //Boton de alante
            let botonSiguiente = document.createElement("button");
            //Si es la última pregunta mostramos para terminar el intento
            botonSiguiente.textContent = index === arrayPreguntas.length - 1 ? "Terminar" : "Siguiente";
            botonSiguiente.id = "botonSiguiente";
            botonSiguiente.style.backgroundColor = "#5bb9c0";
            botonSiguiente.style.color = "white";
            botonSiguiente.style.border = "none";
            botonSiguiente.style.padding = "10px";
            botonSiguiente.style.borderRadius = "5px";
            botonSiguiente.style.cursor = "pointer";
            botonSiguiente.addEventListener("click", function () {
                //Si está en la última pregunta
                if (index === arrayPreguntas.length - 1) {
                    //Actualizamos los aciertos y los añadimos al localStorage para poder mostrarlos 
                    //en el apartaado de mostrar resultados
                    localStorage.setItem("aciertos", aciertos);
                    localStorage.setItem("cantidadPreguntas", arrayPreguntas.length);
                    mostrarResultados();
                } else {
                    mostrarPregunta(index + 1);
                }
            });
            //Añade los botones
            botonesContainer.appendChild(botonAtras);
            botonesContainer.appendChild(botonSiguiente);

            container.appendChild(botonesContainer);
        }
        //Redirige a verCorreccionesAlumno.html donde podrá ver el resultado
        function mostrarResultados() {
            location.href = "verCorreccionesAlumno.html";
        }
        //Llama a la función para mostrar la pregunta correspondiente
        mostrarPregunta(currentIndex);
    }
    //Muestra a tabla con los exámenes correspondientes asociados
    mostrarExamenesAsignados();
});
