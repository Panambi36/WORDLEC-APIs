const API_URL = 'https://random-word.ryanrk.com/api/en/word/random/?length=5'

let intentos = 6
let palabra = '';

const BOTON = document.getElementById("guess-button");

async function obtenerPalabra() {
    try {
        const respuesta = await fetch(API_URL);
        const data = await respuesta.json();
        palabra = data[0].toUpperCase();

        console.log(palabra);

    } catch (error) {
        console.log("Hubo un error");
    }
}

BOTON.addEventListener("click", intentar)

//algoritmo

/*
si la palabra es igual a intento entonces imprimir GANASTE!😀
sino
    restar cantidad de intentos en 1
    sino si primer_intento es igual a primer_palabra entonces imprimir primer_intento verde
    sino si primer_intento existe palabra imprimir primer_intento amarillo
    sino entonces imprimir primer_intento gris
    si intentos es igual a cero entonces imprimir PERDISTE!😖
*/
function intentar() {
    const intento = leerintento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";
    console.log('div', ROW);
    console.log('palabra', palabra);

    intentos = intentos - 1;
    console.log("te quedan", intentos, "intentos");
    for (pos in palabra) {
        console.log("posicion del elemento", pos);
        const SPAN = document.createElement("span");
        SPAN.className = "letter";
        SPAN.innerHTML = intento[pos];
        if (intento[pos] === palabra[pos]) {
            console.log(intento[pos], "verde");
            SPAN.style.backgroundColor = "green";
        } else if (palabra.includes(intento[pos])) {
            console.log(intento[pos], "amarillo");
            SPAN.style.backgroundColor = "yellow";
        } else {
            console.log(intento[pos], "gris");
            SPAN.style.backgroundColor = "gray";
        }
        ROW.appendChild(SPAN);
    }

    //} 
    GRID.appendChild(ROW);

    if (palabra === intento) {
        terminar("<h1>GANASTE!😀</h1>");
        const container = document.querySelector(".container");
        container.style.backgroundColor = "#AFE745"
    }
    if (intentos === 0) {
        terminar("<h1>PERDISTE!😖</h1>");
        const container = document.querySelector(".container");
        container.style.backgroundColor = "red"
    }
}

function leerintento() {
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje) {
    let estado = document.getElementById("guesses");
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BOTON.disabled = true;
    estado.innerHTML = mensaje;
    console.log(estado, mensaje);
}

window.onload = obtenerPalabra();
