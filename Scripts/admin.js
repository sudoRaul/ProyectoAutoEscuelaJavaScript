window.addEventListener("DOMContentLoaded", function () {
    // Obtenemos el usuario activo del localStorage
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    //Si no hay ningún usuario activo no permitimos que genere un examen
    if (!usuarioActivo) {
        this.document.write("<h1 style='color:red'>NO PUEDE ACCEDER AQUÍ SIN ESTAR LOGUEADO</h1>")
        setTimeout(() => {
            location.href = "index.html";
        }, 3000);
        return;
    }
    // Creamos los listeners para redirigir cuando se pulse en los botones
    document.getElementsByClassName("button")[0].addEventListener("click", function () {
        location.href = "profesor.html";
    });
    document.getElementsByClassName("button")[1].addEventListener("click", function () {
        location.href = "alumno.html";
    });

    // Recuperamos el array de Usuarios del LocalStorage
    let usuarios = JSON.parse(localStorage.getItem("users"));

    let container = document.getElementById("validar");

    // Creamos una tabla
    let tabla = document.createElement("table");

    // Creamos la fila de encabezado
    let encabezado = document.createElement("tr");

    let thEmail = document.createElement("th");
    thEmail.textContent = "Email";
    encabezado.appendChild(thEmail);

    let thPassword = document.createElement("th");
    thPassword.textContent = "Contraseña";
    encabezado.appendChild(thPassword);

    let thValidar = document.createElement("th");
    thValidar.textContent = "Validar";
    encabezado.appendChild(thValidar);

    let thRol = document.createElement("th");
    thRol.textContent = "Rol";
    encabezado.appendChild(thRol);

    tabla.appendChild(encabezado);

    // Generamos una fila por cada usuario
    for (let i = 1; i < usuarios.length; i++) {
        let fila = document.createElement("tr");

        // Celda para el email
        let celdaEmail = document.createElement("td");
        let inputEmail = document.createElement("input");
        inputEmail.type = "text";
        inputEmail.value = usuarios[i].email;
        //Utilizamos el evento blur para que se actualize el valor cuando se pierda el foco del elemento
        inputEmail.addEventListener("blur", function () {
            // Actualizamos el email del usuario
            usuarios[i].email = inputEmail.value;
            localStorage.setItem("users", JSON.stringify(usuarios));
        });
        celdaEmail.appendChild(inputEmail);
        fila.appendChild(celdaEmail);

        // Celda para la contraseña
        let celdaPassword = document.createElement("td");
        let inputPassword = document.createElement("input");
        inputPassword.type = "text";
        inputPassword.value = usuarios[i].contrasena;
        //Utilizamos el evento blur para que se actualize el valor cuando se pierda el foco del elemento
        inputPassword.addEventListener("blur", function () {
            // Actualizamos la contraseña del usuario
            usuarios[i].contrasena = inputPassword.value;
            localStorage.setItem("users", JSON.stringify(usuarios));
        });
        celdaPassword.appendChild(inputPassword);
        fila.appendChild(celdaPassword);

        // Celda para el checkbox de validación
        let celdaCheckbox = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = usuarios[i].isValid;
        checkbox.addEventListener("click", function () {
            // Modificamos el valor isValid del usuario correspondiente
            usuarios[i].isValid = checkbox.checked;
            localStorage.setItem("users", JSON.stringify(usuarios));
        });
        celdaCheckbox.appendChild(checkbox);
        fila.appendChild(celdaCheckbox);

        // Celda para el rol
        let celdaRol = document.createElement("td");
        let select = document.createElement("select");

        // Opción del profesor
        let optionProfesor = document.createElement("option");
        optionProfesor.value = "profesor";
        optionProfesor.textContent = "profesor";
        if (usuarios[i].rol === "profesor") {
            optionProfesor.selected = true;
        }
        select.appendChild(optionProfesor);

        // Opción del alumno
        let optionAlumno = document.createElement("option");
        optionAlumno.value = "alumno";
        optionAlumno.textContent = "alumno";
        if (usuarios[i].rol === "alumno") {
            optionAlumno.selected = true;
        }
        select.appendChild(optionAlumno);

        // Usamos el evento change para cambiar el valor cuando se modifique cada vez
        select.addEventListener("change", function () {
            usuarios[i].rol = select.value;
            localStorage.setItem("users", JSON.stringify(usuarios));
        });

        celdaRol.appendChild(select);
        fila.appendChild(celdaRol);

        // Añadimos la fila a la tabla
        tabla.appendChild(fila);
    }

    // Añadimos la tabla al contenedor
    container.appendChild(tabla);
    
});
