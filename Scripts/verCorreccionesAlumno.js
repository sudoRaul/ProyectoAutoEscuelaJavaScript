window.addEventListener('DOMContentLoaded', function () {
    //Recuperamos el número de aciertos y preguntas del último examen realizado
    let aciertos = localStorage.getItem("aciertos")
    let cantidadPreguntas = localStorage.getItem("cantidadPreguntas");
    let container = document.getElementById("container");
    //Comprobamos si el examen está aprobado o suspenso
    if (aciertos / cantidadPreguntas >= 0.5) {
        container.innerHTML = `
        <div class="resultado" style="text-align: center;">
            <h2 class="resultado-exito" style="color: green;">¡Aprobado! 🎉</h2>
            <h4>Has acertado ${aciertos} de ${cantidadPreguntas} preguntas</h4>
            <div class="grafico-resultado">
                <canvas id="graficoResultados" width="100" height="100"></canvas>
            </div>
        </div>`
            ;
        // Creamos el gráfico con Chart.js, que es una librería que permite crear gráficos interactivos y personalizables
        const ctx = document.getElementById('graficoResultados').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Aciertos', 'Fallos'],
                datasets: [{
                    data: [aciertos, cantidadPreguntas - aciertos],
                    backgroundColor: ['#4CAF50', '#FF6347'],
                    borderColor: 'transparent',
                }]
            }
        });
    } else {
        container.innerHTML = `
            <div class="resultado" style="text-align: center;">
                <h2 style="color: red;">¡Suspenso! 😔</h2>
                <h4>Has acertado ${aciertos} de ${cantidadPreguntas} preguntas</h4>
                <div class="grafico-resultado">
                    <canvas id="graficoResultados" width="100px" height="100px"></canvas>
                </div>
            </div>`
            ;
        const ctx = document.getElementById('graficoResultados').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Aciertos', 'Fallos'],
                datasets: [{
                    data: [aciertos, cantidadPreguntas - aciertos],
                    backgroundColor: ['#4CAF50', '#FF6347'],
                    borderColor: 'transparent',
                }]
            }
        });
    }
    // Creamos y añadimos un botón para volver para volver al área principal
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
    container.after(botonVolver);
    botonVolver.addEventListener("click", function(){
        location.href = "alumno.html"
    })
});