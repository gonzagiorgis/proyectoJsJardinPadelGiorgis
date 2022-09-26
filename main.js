let menuIni = "1 - Invitado\n2 - Ingresar como usuario\n3 - Registrase\n4 - Salir"
let nombre = ""
let phone = ""
let usser = "Jardin"
let pass = "1234"
let optIni = ""
let correctInvi = false
let correctLoggin = false
let diaTurno = 0
let mesTurno = 0
let respuestaConsulta = ""
let hora = 0
let duracion = 0
let creditCard = ""
const ALIAS = "jardin-club"
const PRECIOHORA = 2000
const PRECIOHORAPROMO = 1000
const PRECIOHORALUZ = 2300

// inicio de funciones

const precio = dur => Number.parseFloat(dur * PRECIOHORA).toFixed(2)
const precioConLuz = dur => Number.parseFloat(dur * PRECIOHORALUZ).toFixed(2)
const precioPromo = dur => Number.parseFloat(dur * PRECIOHORAPROMO).toFixed(2)
const horaFinTurno = dur => dur + hora
const sign = monto => Number.parseFloat(monto * 0.4).toFixed(2)

function validUsser(u, p) {
    if ((u === usser) && (p === pass)) {
        return true
    } else {
        return false
    }
}

function validEntry(item) {
    do {
        t = prompt("Ingresa tu " + item + ":")
        if (t == "") {
            alert("Débes ingresar tu " + item + ".")
        } else if (t == null) {
            break
        }
    } while (t == "")
    return t
}

function validEntryTurn(item) {
    do {
        t = prompt("Ingresa " + item + ":")
        if (t == "") {
            alert("Débes ingresar " + item + ".")
        } else if (t == null) {
            break
        }
    } while (t == "")
    return t
}

function validHours(h) {
    if (h) {

    }
}

function invitado() {
    nombre = validEntry("nombre")
    phone = validEntry("teléfono")
    if (nombre != null && phone != null) {
        alert("Bienvenido " + nombre)
        correctInvi = true
    } else {
        alert("Debes ingresar nombre y teléfono para poder solicitar o consultar turnos.")
    }
}

function usserLoggin() {
    let usserLoad = ""
    let passLoad = ""
    for (let i = 0; i <= 3; i += 1) {
        if (i < 3) {
            usserLoad = validEntry("usuario")
            passLoad = validEntry("contraseña")
            if (validUsser(usserLoad, passLoad)) {
                alert("Bienvenido " + usser)
                correctLoggin = true
                break;
            } else {
                alert("Usuario o contraseña incorrecto")
            }
        } else {
            alert("Vuelva a intentarlo más tarde, ha utilizado los 3 intentos permitidos.")
            break
        }

    }
}

function usserRegist() {
    usser = validEntry("usuario")
    phone = validEntry("teléfono")
    pass = validEntry("contraseña")
    if (usser != null && phone != null && pass != null) {
        for (let i = 0; i <= 3; i += 1) {
            if (i < 3) {
                let passCheck = prompt("Ingresa nuevamente la contraseña:")
                if (pass === passCheck) {
                    alert("Gracias por registrarte " + usser + ", recuerda tu contraseña.")
                    correctLoggin = true
                    break;
                } else {
                    alert("La contraseña no coincide, vuelve a ingresarla.")
                }
            } else {
                alert("Contraseña incorrecta. Imposible registrar")
                usser = ""
                pass = ""
                break;
            }
        }
    } else {
        alert("Faltan datos para proceder con el registro.")
    }
}

function validOption(p) {
    if (isNaN(p)) {
        return false
    } else {
        if (p < 0 || p > 4) {
            return false
        } else {
            return true
        }
    }
}

function menu() {
    alert("Bienvenido a Jardín Padel Club!\nEn esta sección podrás solicitar y reservar un turno.")
    do {
        alert("Opciones de ingreso: \n" + menuIni)
        optIni = Number(prompt("Ingresa el número correspondiente a la opción deseada:"))
        if (!validOption(optIni)) {
            alert("Debes ingresar una opción válida")
        } else if (optIni == 0) {
            alert("Inicio cancelado - No ha ingresado opción")
            break
        }
    } while (!validOption(optIni));
    return optIni
}

function usserInSession() {
    if (correctInvi) {
        return nombre
    } else {
        return usser
    }
}

function pronostico() {
    let suerte = Math.round(Math.random() * 3.3)

    switch (suerte) {
        case 1:
            return "parcialmente nublado"
            break
        case 2:
            return "nublado"
            break
        case 3:
            return "probabilidad de lluvia, es solo un pronóstico ;)"
            break
        default:
            return "soleado"
            break
    }
}

function disponible() {
    let a = Math.random()
    if (a > 0.5) {
        return true
    } else {
        return false
    }
}

function validLoggin() {
    if (correctInvi == true || correctLoggin == true) {
        return true
    } else {
        return false
    }
}

function entryTurnData() {
    do {
        mesTurno = validEntryTurn("el mes (1-12)")
        if (isNaN(mesTurno) || mesTurno < 1 || mesTurno > 12) {
            alert("Mes ingresado inválido, ingresar nuevamente.")
        }
    } while (isNaN(mesTurno) || mesTurno < 1 || mesTurno > 12)

    do {
        diaTurno = validEntryTurn("el día (1 a 31)")
        if (isNaN(diaTurno) || diaTurno < 1 || diaTurno > 31) {
            alert("Día ingresado inválido, ingresar nuevamente.")
        } else {
            break
        }
    } while (isNaN(diaTurno) || diaTurno < 1 || diaTurno > 31)

    do {
        hora = Number(validEntryTurn("la hora (8 a 23)"))
        if (isNaN(hora) || hora < 8 || hora > 23) {
            alert("Hora ingresada inválida, ingresar nuevamente.")
        } else {
            break
        }

    } while (isNaN(hora) || hora < 8 || hora > 23)


    do {
        duracion = Number(validEntryTurn("la duración (Eje.: 1.5 = hora y media)"))
        if (isNaN(duracion) || duracion < 1 || duracion > 4) {
            alert("Duración ingresada inválida, ingresar nuevamente.")
        } else {
            break
        }

    } while (isNaN(duracion) || duracion < 1 || duracion > 4)
}

function precioFinal() {
    if (hora < 17) {
        return precioPromo(duracion)
    } else if (hora > 19) {
        return precioConLuz(duracion)
    } else {
        return precio(duracion)
    }
}

function convertHora(h) {
    let hora = parseInt(h)
    let minutos = parseInt(60 * (h - hora))
    return hora + ":" + minutos + "hs."
}

function loggin() {
    switch (menu()) {
        case 1:
            invitado()
            break;

        case 2:
            usserLoggin()
            break;

        case 3:
            usserRegist()
            break;

        case 4:
            alert("¡Vuelve pronto!")
            break;
        default:
            break;
    }
}

function confirmTurn() {
    return confirm(usserInSession() + ", el turno que solicitaste se encuentra disponible.\nPrecio aproximado: $" + precioFinal() + "\n Seña para reservar el turno: $" + sign(precioFinal()) + "\n¿Deseas confirmarlo?")
}

function signPay() {
    let opt = Number(prompt("Selecciona un medio de pago para la seña:\n1 - Tarjeta de crédito\n2 - Transferencia"))
    // let pay = false
    do {

        if (!validOption(opt)) {
            alert("Debes ingresar una opción válida")
        } else if (opt == 0) {
            alert("Cancelado el pago de la seña - No ha ingresado datos.")
            break
        }
    } while (!validOption(opt));
    // do {
    switch (opt) {
        case 1:
            creditCard = prompt("Ingrese el número de la tarjeta de credito.\nDe cancelar el turno antes de las 24hs. se reintegrará la seña")
            // pay = true
            return true
            break
        case 2:
            // pay = true
            alert("Realice la transferencia al siguiente alias: " + ALIAS + "\nDe cancelar el turno antes de las 24hs. se reintegrará la seña")
            return true
            break
        default:
            // pay = false
            return false
            break
    }
    // } while (!pay)
}

function messageConfirmTurn(dia, mes, h, d) {
    return alert(usserInSession() + "confirmamos tu turno para el " + dia + "/" + mes + " desde las " + h + " hs., hasta las " + convertHora(horaFinTurno(d)) + "\nTen en cuenta que el valor del turno puede variar dependiendo del uso de la luz a pedido de los jugadores.\nPronóstico para ese día: " + pronostico() + ".\n ¡Los esperamos!\nJardín Padel Club")
}

function messageTurnNotAvailable(dia, mes, h) {
    return alert(usserInSession() + ", el turno que solicitaste no se encuentra disponible para el " + dia + "/" + mes + " a las " + h + "hs.")
}
// fin de funciones

// inicio de llamadas

loggin()
do {
    if (validLoggin()) {
        let dispo = false
        do {
            entryTurnData()
            if (disponible()) {
                dispo = true
                if (confirmTurn()) {
                    if (signPay()) {
                        messageConfirmTurn(diaTurno, mesTurno, hora, duracion)
                    } else {
                        alert("Turno no confirmado, debe abonar la seña.")
                    }
                } else {
                    alert("Turno no confirmado.")
                }
            } else {
                messageTurnNotAvailable(diaTurno, mesTurno, duracion)
            }
        } while (!dispo);

    } else {
        alert("Datos incorrectos para iniciar la consulta. Intente nuevamente")
    }
} while (!validLoggin);