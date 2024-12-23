window.addEventListener("DOMContentLoaded", function(){
    // Obtenemos el usuario activo del localStorage
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    document.querySelector("header a").addEventListener("click", function(){
    //Si no hay ningún usuario activo no permitimos que genere un examen
    if (usuarioActivo) {
        localStorage.removeItem("usuarioActivo");
    }
    })
    
    
});