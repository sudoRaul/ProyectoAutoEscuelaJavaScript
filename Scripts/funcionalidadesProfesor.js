window.addEventListener("DOMContentLoaded", function(){
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
    //Acceder a la parte de crear Preguntas
    this.document.getElementsByClassName("button")[0].addEventListener("click", function(){
        location.href = "crearPregunta.html"
    })
    //Acceder a la parte de gestionar y crear Categorias
    this.document.getElementsByClassName("button")[1].addEventListener("click", function(){
        location.href = "gestionCategorias.html"
    })
    //Acceder a la parte de crear Examenes
    this.document.getElementsByClassName("button")[2].addEventListener("click", function(){
        location.href = "generarExamen.html"
    })
    //Acceder al área del alumno
    this.document.getElementsByClassName("button")[3].addEventListener("click", function(){
        location.href = "alumno.html"
    });
})