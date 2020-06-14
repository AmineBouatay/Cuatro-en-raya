document.addEventListener('DOMContentLoaded', () => {
    const plazas = document.querySelectorAll('.grid div')
    const resultado = document.querySelector('#resultado')
    const mostrarTurnoHum = document.querySelector('#t-hum')
    const mostrarTurnoOrd = document.querySelector('#t-ord')
    const mostrarHumano = document.querySelector('.humano')
    const mostrarOrdenador = document.querySelector('.ordenador')

    let turnoJugador = 1,
        resultadoHumano = 0,
        resultadoOrdenador = 0,
        finJuego = true,
        Profundidad = 3
    var tabla

    var initTabla = () => {

        tabla = new Array(6);
        // inicializar la tabla de juego
        for (var i = 0; i < 6; i++) {
            tabla[i] = new Array(7);
            for (let j = 0; j < 7; j++) {
                tabla[i][j] = 0
            }
        }
    }
    initTabla()

    for (let i = 0, asignarClase = 0; i < plazas.length; i++) {
        plazas[i].setAttribute('id', asignarClase)
        asignarClase++
        if (asignarClase >= 7)
            asignarClase = 0
    }
    for (var i = 0; i < plazas.length; i++) {
        (function(index) {
            plazas[i].onclick = function() {
                var array = []

                plazas.forEach(element => {
                    if (element.getAttribute('id') === plazas[index].getAttribute('id')) {
                        array.push(element)
                        y = element.getAttribute('id');

                    }
                })
                if (finJuego) {
                    for (let rec = array.length - 1; rec > -1; rec--) {
                        if (array[rec].classList.contains('turno')) {
                            continue
                        } else {
                            if (turnoJugador === 1) {
                                array[rec].classList.add('turno')
                                array[rec].classList.add('jugador-humano')

                                //cambia jugador
                                turnoJugador = 1
                                mostrarTurnoOrd.classList.add('turno-ordenador')
                                mostrarTurnoHum.classList.remove('turno-jugador')


                                tabla[rec][y] = 1

                                if (estaGanado(tabla) != 1)
                                    minimax(tabla)

                            } else if (turnoJugador === 2) {
                                array[rec].classList.add('turno')
                                array[rec].classList.add('jugador-ordenador')

                                mostrarTurnoHum.classList.add('turno-jugador')
                                mostrarTurnoOrd.classList.remove('turno-ordenador')
                                    //cambia jugador
                                turnoJugador = 1

                                tabla[rec][y] = 2

                            }
                            break
                        }
                    }
                }
            }
        })(i)
    }

    function estaGanado(tabla) {
        var gana = 0
        const m = tabla
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {

                if (i + 3 < 6) {
                    if (m[i][j] == 1 && m[i + 1][j] == 1 && m[i + 2][j] == 1 && m[i + 3][j] == 1) {
                        gana = 1;
                    }
                }
                if (j + 3 < 7) {
                    if (m[i][j] == 1 && m[i][j + 1] == 1 && m[i][j + 2] == 1 && m[i][j + 3] == 1) {
                        gana = 1;
                    }
                }

                if (i + 3 < 6 && j + 3 < 7) {
                    if (m[i][j] == 1 && m[i + 1][j + 1] == 1 && m[i + 2][j + 2] == 1 && m[i + 3][j + 3] == 1) {
                        gana = 1;
                    }
                }
                if (j - 3 > -1 && i + 3 < 6) {
                    if (m[i][j] == 1 && m[i + 1][j - 1] == 1 && m[i + 2][j - 2] == 1 && m[i + 3][j - 3] == 1) {
                        gana = 1;
                    }
                }
                if (j + 3 < 7 && i - 3 > -1) {
                    if (m[i][j] == 1 && m[i - 1][j + 1] == 1 && m[i - 2][j + 2] == 1 && m[i - 3][j + 3] == 1) {
                        gana = 1;
                    }
                }

                if (i + 3 < 6) {
                    if (m[i][j] == 2 && m[i + 1][j] == 2 && m[i + 2][j] == 2 && m[i + 3][j] == 2) {
                        gana = 2;
                    }
                }
                if (j + 3 < 7) {
                    if (m[i][j] == 2 && m[i][j + 1] == 2 && m[i][j + 2] == 2 && m[i][j + 3] == 2) {
                        gana = 2;
                    }
                }

                if (i + 3 < 6 && j + 3 < 7) {
                    if (m[i][j] == 2 && m[i + 1][j + 1] == 2 && m[i + 2][j + 2] == 2 && m[i + 3][j + 3] == 2) {
                        gana = 2;
                    }
                }
                if (j - 3 > -1 && i + 3 < 6) {
                    if (m[i][j] == 2 && m[i + 1][j - 1] == 2 && m[i + 2][j - 2] == 2 && m[i + 3][j - 3] == 2) {
                        gana = 2;
                    }
                }
                if (j + 3 < 7 && i - 3 > -1) {
                    if (m[i][j] == 2 && m[i - 1][j + 1] == 2 && m[i - 2][j + 2] == 2 && m[i - 3][j + 3] == 2) {
                        gana = 2;
                    }
                }
            }
        }
        return gana;
    }

    function verificarTabla() {
        const gana = estaGanado(tabla)

        if (finJuego)
            if (gana == 1) {
                resultado.style.color = 'red';
                resultado.innerHTML = 'Humano gana!';
                resultadoHumano++;
                mostrarHumano.innerHTML = 'humano gana: ' + resultadoHumano;
                mostrarOrdenador.innerHTML = 'Ordenador pierde: ' + resultadoOrdenador;
                finJuego = false;
            } else if (gana == 2) {
            resultadoOrdenador++;
            mostrarHumano.innerHTML = 'humano pierde: ' + resultadoHumano;
            mostrarOrdenador.innerHTML = 'ordenador gana: ' + resultadoOrdenador;
            resultado.style.color = 'blue';
            resultado.innerHTML = 'ordenador gana!';
            finJuego = false;

        }
    }

    const tablaMovimiento = (tabla) => {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (tabla[i][j] == 0)
                    return false;
            }
        }
        return true;
    }

    //EventListener para cada elemento para la funcion verificarTabla function al hacer Clic
    plazas.forEach(square => square.addEventListener('click', verificarTabla));

    reiniciarJuego = () => {
        initTabla()
        finJuego = true
        for (var i = 0; i < plazas.length - 7; i++) {
            plazas[i].classList.remove('turno');
            plazas[i].classList.remove('jugador-humano');
            plazas[i].classList.remove('jugador-ordenador');

        }
        resultado.innerHTML = "";
    }

    const movimientoValido = (m, col) => {
        let validator = false;
        for (let i = 0; i < 6; i++) {
            if (m[i][col] == 0)
                validator = true;
        }
        return validator;
    }

    const nuevoMovimiento = (m, col) => {
        for (let i = 5; i > -1; i--) {
            if (m[i][col] == 0)
                return i;
        }
    }
    const minimax = (tabla) => {
        let max, beastf = -1,
            beastc = -1,
            turnoMax = 0;
        max = Number.NEGATIVE_INFINITY;

        for (let j = 0; j < 7; j++) {
            if (movimientoValido(tabla, j)) {
                let fila = nuevoMovimiento(tabla, j)

                tabla[fila][j] = 2;

                turnoMax = valormin(tabla, 0, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);

                tabla[fila][j] = 0;

                if (max < turnoMax) {
                    max = turnoMax;
                    beastc = j;
                    beastf = fila;

                }
            }
        }
        tabla[beastf][beastc] = 2
        for (let index = plazas.length - 1; index > -1; index--) {
            if (beastc == plazas[index].getAttribute('id')) {
                if (!plazas[index].classList.contains("turno")) {
                    plazas[index].classList.add("turno");
                    plazas[index].classList.add("jugador-ordenador");
                    break;
                }
            }
        }
    }

    const valormin = (m, profundidad, alpha, beta) => {

        if (estaGanado(m) == 1 || estaGanado(m) == 2)
            return Heuristica(m);
        if (tablaMovimiento(m))
            return Heuristica(m);
        if (profundidad > Profundidad)
            return Heuristica(m)

        for (let j = 0; j < 7; j++) {
            if (movimientoValido(m, j)) {
                let fila = nuevoMovimiento(m, j);

                m[fila][j] = 1;

                beta = Math.min(beta, valormax(m, profundidad + 1, alpha, beta));

                m[fila][j] = 0;

                if (alpha > beta) {
                    return alpha;
                }
            }
        }
        return beta;
    }


    const valormax = (m, profundidad, alpha, beta) => {

        if (estaGanado(m) == 1 || estaGanado(m) == 2)
            return Heuristica(m);
        if (tablaMovimiento(m))
            return Heuristica(m);

        for (let j = 0; j < 7; j++) {
            if (movimientoValido(tabla, j)) {
                let fila = nuevoMovimiento(tabla, j);

                tabla[fila][j] = 2;

                alpha = Math.max(alpha, valormin(m, profundidad + 1, alpha, beta));

                tabla[fila][j] = 0;

                if (alpha > beta) {
                    return beta;
                }
            }
        }
        return alpha;
    }
    const Heuristica = (m) => {
        return Costo(m, 2) - Costo(m, 1);
    }

    const Costo = (m, jugador) => {
        var value = 0;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                //para 4
                if (j + 3 < 7) {
                    if (m[i][j] == jugador && m[i][j + 1] == jugador && m[i][j + 2] == jugador && m[i][j + 3] == jugador) {
                        return 10000;
                    }
                }
                if (i + 3 < 6) {
                    if (m[i][j] == jugador && m[i + 1][j] == jugador && m[i + 2][j] == jugador && m[i + 3][j] == jugador) {
                        return 10000;
                    }
                }
                if (j + 3 < 7 && i + 3 < 6) {
                    if (m[i][j] == jugador && m[i + 1][j + 1] == jugador && m[i + 2][j + 2] == jugador && m[i + 3][j + 3] == jugador) {
                        return 10000;
                    }
                }
                if (j + 3 < 7 && i - 3 > -1) {
                    if (m[i][j] == jugador && m[i - 1][j + 1] == jugador && m[i - 2][j + 2] == jugador && m[i - 3][j + 3] == jugador) {
                        return 10000;
                    }
                }
                if (i + 3 < 6 && j - 3 > -1) {
                    if (m[i][j] == jugador && m[i + 1][j - 1] == jugador && m[i + 2][j - 2] == jugador && m[i + 3][j - 3] == jugador) {
                        return 10000;
                    }
                }

                //para 3
                if (j + 2 < 7) {
                    if (m[i][j] == jugador && m[i][j + 1] == jugador && m[i][j + 2] == jugador) {
                        value = 1000;
                    }
                }
                if (i + 2 < 6) {
                    if (m[i][j] == jugador && m[i + 1][j] == jugador && m[i + 2][j] == jugador) {
                        value = 1000;
                    }
                }
                if (j + 2 < 7 && i + 2 < 6) {
                    if (m[i][j] == jugador && m[i + 1][j + 1] == jugador && m[i + 2][j + 2] == jugador) {
                        value = 1000;
                    }
                }
                if (j + 2 < 7 && i - 2 > -1) {
                    if (m[i][j] == jugador && m[i - 1][j + 1] == jugador && m[i - 2][j + 2] == jugador) {
                        value = 1000;
                    }
                }
                if (i + 2 < 6 && j - 2 > -1) {
                    if (m[i][j] == jugador && m[i + 1][j - 1] == jugador && m[i + 2][j - 2] == jugador) {
                        value = 1000;
                    }
                }
                //para 2
                if (j + 1 < 7) {
                    if (m[i][j] == jugador && m[i][j + 1] == jugador) {
                        if (value < 300)
                            value = 300;
                    }
                }
                if (i + 1 < 6) {
                    if (m[i][j] == jugador && m[i + 1][j] == jugador) {
                        if (value < 300)
                            value = 300;
                    }
                }
                if (j + 1 < 7 && i + 1 < 6) {
                    if (m[i][j] == jugador && m[i + 1][j + 1] == jugador) {
                        if (value < 300)
                            value = 300;
                    }
                }
                if (j + 1 < 7 && i - 1 > -1) {
                    if (m[i][j] == jugador && m[i - 1][j + 1] == jugador) {
                        if (value < 300)
                            value = 300;
                    }
                }
                if (i + 1 < 6 && j - 1 > -1) {
                    if (m[i][j] == jugador && m[i + 1][j - 1] == jugador) {
                        if (value < 300)
                            value = 300;
                    }
                }
            }
        }
        return value;
    }
})