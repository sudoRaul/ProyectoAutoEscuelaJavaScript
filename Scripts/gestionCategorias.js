window.addEventListener("DOMContentLoaded", function() {
    // Recuperamos las categorías del localStorage o inicializar como un array vacío
    let arrayCategorias = JSON.parse(localStorage.getItem("categorias")) || [];
    let mostrarCategorias = document.getElementById("mostrarCategorias");

    // Creamos una tabla para mostrar las categorías
    let tablaCategorias = document.createElement("table");
    mostrarCategorias.appendChild(tablaCategorias);

    // Añadimos las categorías a la tabla
    for (let i = 0; i < arrayCategorias.length; i++) {
        let fila = document.createElement("tr");

        // Celda para el nombre de la categoría
        let celdaCategoria = document.createElement("td");
        celdaCategoria.textContent = arrayCategorias[i];
        fila.appendChild(celdaCategoria);

        // Celda para la imagen de eliminar
        let celdaEliminar = document.createElement("td");

        let imagenEliminar = document.createElement("img");
        imagenEliminar.src = "papelera.png";
        imagenEliminar.alt = "Eliminar";
        imagenEliminar.style.cursor = "pointer";

        //Realizamos el evento click para borrar la categorías
        imagenEliminar.addEventListener("click", function() {
            //Elimina ese registro del array, debido a que coge el índice y elimina uno gracias al segundo parámetro del splice
            arrayCategorias.splice(i, 1);
            // Actualiza el localStorage
            localStorage.setItem("categorias", JSON.stringify(arrayCategorias)); 
            // Elimina la fila correspondiente en el DOM
            fila.remove(); 
        });

        celdaEliminar.appendChild(imagenEliminar);
        fila.appendChild(celdaEliminar);

        tablaCategorias.appendChild(fila);
    }

    // Evento para añadir nuevas categorías
    document.getElementsByTagName("button")[0].addEventListener("click", function(e) {
        e.preventDefault();
        //Obtenemos el valor del input
        let categoria = document.getElementById("categoria").value;
        //Comprueba que haya algo escrito en el input
        if (categoria.length > 1) {
            // Añadimos la categoría al array
            arrayCategorias.push(categoria);
            // Guardamos el array en localStorage
            localStorage.setItem("categorias", JSON.stringify(arrayCategorias));

            // Creamos un mensaje de éxito
            let mensajeExito = document.createElement("p");
            mensajeExito.textContent = "Categoría añadida";
            mensajeExito.style.color = "green";
            document.getElementsByTagName("form")[0].after(mensajeExito);
            setTimeout(() => {
                mensajeExito.textContent="";
            }, 3000);

            // Limpia el formulario
            document.getElementById("categoria").value = "";

            // Crea una nueva fila para la categoría añadida
            let fila = document.createElement("tr");

            // Celda para el nombre de la categoría
            let celdaCategoria = document.createElement("td");
            celdaCategoria.textContent = categoria;
            fila.appendChild(celdaCategoria);

            // Celda para la imagen de eliminar
            let celdaEliminar = document.createElement("td");

            let imagenEliminar = document.createElement("img");
            imagenEliminar.src = "papelera.png";
            imagenEliminar.alt = "eliminar";
            imagenEliminar.style.cursor = "pointer";

            //Añadimos el evento para eliminar categorías
            imagenEliminar.addEventListener("click", function() {
                // Eliminamos la categoría del array, coge el índice para saber qué fila de la tabla debe borrar
                let index = arrayCategorias.indexOf(categoria);
                if (index > -1) {
                    //Elimina ese registro del array, debido a que coge el índice y elimina uno gracias al segundo parámetro del splice
                    arrayCategorias.splice(index, 1);
                    // Actualiza el localStorage
                    localStorage.setItem("categorias", JSON.stringify(arrayCategorias));
                    // Elimina la fila correspondiente en el DOM
                    fila.remove(); 
                }
            });

            celdaEliminar.appendChild(imagenEliminar);
            fila.appendChild(celdaEliminar);

            tablaCategorias.appendChild(fila);
        } else {
            // Muestra el mensaje de error si la categoría no es válida
            let mensajeError = document.createElement("p");
            mensajeError.textContent = "Complete todos los campos correctamente.";
            mensajeError.style.color = "red";
            document.getElementsByTagName("form")[0].after(mensajeError);
            setTimeout(() => {
                mensajeError.remove();
            }, 3000);
        }
    });
    // Crea y añade un botón para volver al área principal
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
    mostrarCategorias.appendChild(botonVolver);
    botonVolver.addEventListener("click", function(){
        location.href = "profesor.html"
    })
});
