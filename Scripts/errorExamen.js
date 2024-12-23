window.addEventListener('DOMContentLoaded', function () {
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
    //Recuperamos el array de examenes
    let examenes = JSON.parse(this.localStorage.getItem('examenes')) || [];
    let contenedorAlumno = this.document.getElementsByClassName("secciones")[0];
    //Si el array está vacío el alumno no accederá a la parte de realizar examen
    if (examenes.length < 1) {
        //Mostramos el mensaje de que no hay examenes disponibles
        let parrafoError = document.createElement("h4")
        parrafoError.style.color = "#004d99";
        parrafoError.style.marginLeft = "3%"
        parrafoError.textContent = "No hay ningún examen pendiente ✅"
        contenedorAlumno.after(parrafoError);
    } else {
        //Mostramos el mensaje de que hay examenes pendientes
        let parrafoExamen = document.createElement("h3")
        parrafoExamen.style.color = " #004d99";
        parrafoExamen.style.marginLeft = "3%"
        parrafoExamen.textContent = "Tienes exámenes pendientes 🔔"
        contenedorAlumno.after(parrafoExamen);
    }
    //Si hay examenes pendientes permitimos acceder a la página de examen
    this.document.getElementsByClassName("button")[0].addEventListener("click", function () {
        if (examenes.length > 0) {
            location.href = "realizarExamen.html";
        }
    })
    //Acceder a visualizar la correccion de los examenes
    this.document.getElementsByClassName("button")[1].addEventListener("click", function () {

        location.href = "verCorreccionesAlumno.html";

    })


})