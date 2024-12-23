window.addEventListener("DOMContentLoaded", function () {
    // Cogemos el array del localStorage
    let usuarios = JSON.parse(localStorage.getItem("users")) || [];

    // Comprobamos que el usuario sea correcto y esté validado
    document.getElementById("formu").addEventListener("submit", function (e) {
        e.preventDefault();
        let emailUser = document.getElementById("emailUser").value;
        let passUser = document.getElementById("passUser").value;

        // Recorremos el array de usuarios, y depende del rol redirigimos a una página u otra
        for (let i = 0; i < usuarios.length; i++) {
            if ((usuarios[i].email == emailUser) && (usuarios[i].contrasena == passUser) && (usuarios[i].isValid)) {
                // Guardamos el usuario logueado en localStorage
                localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[i]));

                // Redirigimos según el rol
                if (usuarios[i].rol === "profesor") {
                    location.href = "profesor.html";
                    return;
                } else if (usuarios[i].rol === "alumno") {
                    location.href = "alumno.html";
                    return;
                }
                location.href = "admin.html";
                return;
            }
        }

        // Si existe algún error mostramos un mensaje
        let mensajeError = document.createElement("p");
        mensajeError.textContent = "Credenciales incorrectas o usuario en revisión";
        mensajeError.style.color = "red";
        document.getElementsByTagName("button")[0].after(mensajeError);
        setTimeout(() => {
            mensajeError.textContent = "";
        }, 2500);
    });
});
