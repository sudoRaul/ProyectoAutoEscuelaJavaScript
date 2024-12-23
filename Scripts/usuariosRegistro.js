window.addEventListener("DOMContentLoaded", function () {
    //Creamos la clase Usuario con sus campos correspondientes
    class Usuario {
        constructor() {
            this.email = "";
            this.contrasena = "";
            this.rol = "";
            this.isValid = false;
        }
        setUsuario(email, contrasena, rol, isValid){
            this.email = email;
            this.contrasena = contrasena;
            this.rol = rol;
            this.isValid = isValid;
        }
        setRol(rol){
            this.rol = rol;
        }
    }
    //Añadimos el admin al array si el array está vacío
    let arrayUsuarios = JSON.parse(localStorage.getItem("users")) || [];;
    let admin = new Usuario();
    if (arrayUsuarios.length == 0){
        admin.setUsuario("admin", "admin", "admin", true);
        arrayUsuarios.unshift(admin);
        localStorage.setItem("users", JSON.stringify(arrayUsuarios))
    }
    


    this.document.getElementById("form").addEventListener("submit", function(event){
        //Esperamos a que se carguen los datos antes de enviar el formulario
        event.preventDefault();
        //Cogemos los valores del registro
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let repeat = document.getElementById("repeat").value;
        let rol = document.getElementById("rol").value;
        let user = new Usuario();
        //Si pasa la comprobación, añadimos al array y al localStorage y mostramos mensaje de usuario añadido
        if(comprobarContraseña(password) && password==repeat){
            user.setUsuario(email, password, rol, false);
            arrayUsuarios.push(user);
            localStorage.setItem("users", JSON.stringify(arrayUsuarios))
            let mensajeError = document.createElement("p");
            mensajeError.innerHTML = "Usuario creado <br> Espere a confirmación del administrador";
            mensajeError.style.color = "green";
            document.getElementById("enviar").before(mensajeError);
            setTimeout(() => {
                mensajeError.textContent = "";
            }, 2500);
        }else{
            //Si no mostramos el mensaje de error
            let mensajeError = document.createElement("p");
            mensajeError.textContent = "Error en la contraseña";
            mensajeError.style.color = "red";
            document.getElementById("enviar").before(mensajeError);
            setTimeout(() => {
                mensajeError.textContent = "";
            }, 2500);
        }

    })
    //Funciones para comprobar que la contraseña contiene Mayúsculas, minúsculas, la cadena es de minimo 8 y maximo 16 caracteres
    //números y caracteres especiales
    function lengthCorrect(str) {
        if (str.length >= 8 && str.length <=16){
           return true;
        }else{
            return false;
        }
    }
    function mayus(str){
        for (let i = 0; i < str.length; i++) {
            if (str[i] >= 'A' && str[i] <= 'Z'){
                return true;
            }
        }
        return false;
        
    }
    function minus(str){
        for (let i = 0; i < str.length; i++) {
            if (str[i] >= 'a' && str[i] <= 'z'){
                return true;
            }
        }
        return false;
        
    }
    function num(str){
        for (let i = 0; i < str.length; i++) {
            if(isNaN(str.charAt[i])){
                return true;
            }
        }
        return false;
    }
    function special(str){
        const especiales = '@#$%-&_'
        for (let i = 0; i < str.length; i++) {
            if (especiales.includes(str.charAt(i))){
                return true;
            }
        }
        return false;
    }
    
    function comprobarContraseña(pass){
        if(lengthCorrect(pass) && mayus(pass) && minus(pass) && num(pass) && special(pass)){
            return true;
        }else{
            return false;
        }
    }

})
