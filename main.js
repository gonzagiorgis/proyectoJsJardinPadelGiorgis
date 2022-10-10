let listaMenuInicio = "1 - Invitado\n2 - Ingresar como usuario\n3 - Registrase\n4 - Salir"
let nombreInvitado = ""
let telefono = ""
let nombreUsuario = "Jardin"
let password = "1234"
let opcionInicio = ""
let invitadoCorrecto = false
let inicioSesionCorrecto = false
let diaTurno = 0
let mesTurno = 0
let respuestaConsulta = ""
let hora = 0
let duracion = 0
let tarjetaCredito = ""
let mensaje = ""
const ALIAS = "jardin-club"
const PRECIOHORA = 2000
const PRECIOHORAPROMO = 1000
const PRECIOHORALUZ = 2300

// inicio de funciones

const salida = () => opcionInicio === "4"
class Turno {
    constructor(fecha, hora, duracion) {
        this.fecha = fecha
        this.hora = hora
        this.duracion = duracion
    }

    precio = duracion => Number.parseFloat(duracion * PRECIOHORA).toFixed(2)
    precioConLuz = duracion => Number.parseFloat(duracion * PRECIOHORALUZ).toFixed(2)
    precioPromo = duracion => Number.parseFloat(duracion * PRECIOHORAPROMO).toFixed(2)
    horaFinTurno = duracion => duracion + hora
    reserva = monto => Number.parseFloat(monto * 0.4).toFixed(2)
}

const precio = duracion => Number.parseFloat(duracion * PRECIOHORA).toFixed(2)
const precioConLuz = duracion => Number.parseFloat(duracion * PRECIOHORALUZ).toFixed(2)
const precioPromo = duracion => Number.parseFloat(duracion * PRECIOHORAPROMO).toFixed(2)
const horaFinTurno = duracion => duracion + hora
const reserva = monto => Number.parseFloat(monto * 0.4).toFixed(2)

function usuarioValido(usuario, pass) {
    if ((nombreUsuario === usuario) && (password === pass)) {
        return true
    } else {
        return false
    }
}

function entradaValida(entrada) {
    do {
        mensaje = prompt("Ingresa tu " + entrada + ":")
        if (mensaje == "") {
            alert("Débes ingresar tu " + entrada + ".")
        } else if (mensaje == null) {
            break
        }
    } while (mensaje == "")
    return mensaje
}

function entradaValidaTurno(entrada) {
    do {
        mensaje = prompt("Ingresa " + entrada + ":")
        if (mensaje == "") {
            alert("Débes ingresar " + entrada + ".")
        } else if (mensaje == null) {
            break
        }
    } while (mensaje == "")
    return mensaje
}

function invitado() {
    nombreInvitado = entradaValida("nombre")
    telefono = entradaValida("teléfono")
    if (nombreInvitado != null && telefono != null) {
        alert("Bienvenido " + nombreInvitado)
        invitadoCorrecto = true
    } else {
        alert("Debes ingresar nombre y teléfono para poder solicitar o consultar turnos.")
    }
}

function inicioDeSesion() {
    let usuarioIngresado = ""
    let contraseñaIngresada = ""
    for (let i = 0; i <= 3; i += 1) {
        if (i < 3) {
            usuarioIngresado = entradaValida("usuario")
            contraseñaIngresada = entradaValida("contraseña")
            if (usuarioValido(usuarioIngresado, contraseñaIngresada)) {
                alert("Bienvenido " + nombreUsuario)
                inicioSesionCorrecto = true
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

function registroUsuario() {
    nombreUsuario = entradaValida("usuario")
    telefono = entradaValida("teléfono")
    password = entradaValida("contraseña")
    if (nombreUsuario != null && telefono != null && password != null) {
        for (let i = 0; i <= 3; i += 1) {
            if (i < 3) {
                let passCheck = prompt("Ingresa nuevamente la contraseña:")
                if (password === passCheck) {
                    alert("Gracias por registrarte " + nombreUsuario + ", recuerda tu contraseña.")
                    inicioSesionCorrecto = true
                    break;
                } else {
                    alert("La contraseña no coincide, vuelve a ingresarla.")
                }
            } else {
                alert("Contraseña incorrecta. Imposible registrar")
                nombreUsuario = ""
                password = ""
                break;
            }
        }
    } else {
        alert("Faltan datos para proceder con el registro.")
    }
}

function opcionValidaMenuInicio(opcion) {
    if (isNaN(opcion)) {
        return false
    } else {
        if (opcion <= 0 || opcion >= 5) {
            return false
        } else {
            return true
        }
    }
}

function opcionValidaPago(opcion) {
    if (isNaN(opcion)) {
        return false
    } else {
        if (opcion <= 0 || opcion >= 3) {
            return false
        } else {
            return true
        }
    }
}

function menuInicio() {
    alert("Bienvenido a Jardín Padel Club!\nEn esta sección podrás solicitar y reservar un turno.")
    do {
        opcionInicio = prompt("Opciones de ingreso: \n" + listaMenuInicio + "\nIngresa el número correspondiente a la opción deseada:")
        if (opcionInicio === null) {
            alert("Inicio cancelado - No ha ingresado opción")
            break
        } else if (!opcionValidaMenuInicio(opcionInicio)) {
            alert("Debes ingresar una opción válida")
        }
    } while (!opcionValidaMenuInicio(opcionInicio));

    switch (opcionInicio) {
        case "1":
            invitado()
            break;

        case "2":
            inicioDeSesion()
            break;

        case "3":
            registroUsuario()
            break;
        case "4":
            alert("¡Vuelve pronto!")
            break;
        default:
            break;
    }

}



function invitadoEnSesion() {
    if (invitadoCorrecto) {
        return nombreInvitado
    } else {
        return nombreUsuario
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

function inicioValido() {
    if (invitadoCorrecto == true || inicioSesionCorrecto == true) {
        return true
    } else {
        return false
    }
}

function ingresoDatosDelTurno() {
    do {
        mesTurno = entradaValidaTurno("el mes (1-12)")
        if (isNaN(mesTurno) || mesTurno < 1 || mesTurno > 12) {
            alert("Mes ingresado inválido, ingresar nuevamente.")
        }
    } while (isNaN(mesTurno) || mesTurno < 1 || mesTurno > 12)

    do {
        diaTurno = entradaValidaTurno("el día (1 a 31)")
        if (isNaN(diaTurno) || diaTurno < 1 || diaTurno > 31) {
            alert("Día ingresado inválido, ingresar nuevamente.")
        } else {
            break
        }
    } while (isNaN(diaTurno) || diaTurno < 1 || diaTurno > 31)

    do {
        hora = Number(entradaValidaTurno("la hora (8 a 23)"))
        if (isNaN(hora) || hora < 8 || hora > 23) {
            alert("Hora ingresada inválida, ingresar nuevamente.")
        } else {
            break
        }

    } while (isNaN(hora) || hora < 8 || hora > 23)


    do {
        duracion = Number(entradaValidaTurno("la duración (Eje.: 1.5 = hora y media)"))
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

function convertirFloatAHora(h) {
    let hora = parseInt(h)
    let minutos = parseInt(60 * (h - hora))
    return hora + ":" + minutos + "hs."
}

function confirmacionTurno() {
    return confirm(invitadoEnSesion() + ", el turno que solicitaste se encuentra disponible.\nPrecio aproximado: $" + precioFinal() + "\n Seña para reservar el turno: $" + reserva(precioFinal()) + "\n¿Deseas confirmarlo?")
}

function pagoReserva() {
    let opcionPago = prompt("Selecciona un medio de pago para la seña:\n1 - Tarjeta de crédito\n2 - Transferencia")
    do {
        if (opcionPago === null) {
            alert("Pago de la seña cancelado.")
            break
        } else if (!opcionValidaPago(opcionPago)) {
            alert("Debes ingresar una opción válida")
            opcionPago = prompt("Selecciona un medio de pago para la seña:\n1 - Tarjeta de crédito\n2 - Transferencia")
        }
    } while (!opcionValidaPago(opcionPago));


    switch (opcionPago) {
        case "1":
            tarjetaCredito = prompt("Ingresa el número de la tarjeta de credito.\nDe cancelar el turno antes de las 24hs. se reintegrará la seña")
            return true
            break
        case "2":
            alert(invitadoEnSesion() + " realiza la transferencia al siguiente alias: " + ALIAS + "\nDe cancelar el turno antes de las 24hs. se reintegrará la seña")
            return true
            break
        default:
            console.log(opcionPago)
            console.log(opcionValidaMenuInicio(opcionPago))
            return false
            break
    }

}

function mensajeConfirmacionTurno(dia, mes, hora, duracion) {
    return alert(invitadoEnSesion() + " confirmamos tu turno para el " + dia + "/" + mes + " desde las " + hora + " hs., hasta las " + convertirFloatAHora(horaFinTurno(duracion)) + "\nTen en cuenta que el valor del turno puede variar dependiendo del uso de la luz a pedido de los jugadores.\nPronóstico para ese día: " + pronostico() + ".\n ¡Los esperamos!\nJardín Padel Club")
}

function mensajeTurnoNoDisponible(dia, mes, hora) {
    return alert(invitadoEnSesion() + ", el turno que solicitaste no se encuentra disponible para el " + dia + "/" + mes + " a las " + hora + "hs.")
}
// fin de funciones

// inicio de llamadas

do {
    menuInicio()
    if (inicioValido() && !salida()) {
        let disponibilidad = false
        do {
            ingresoDatosDelTurno()
            if (disponible()) {
                disponibilidad = true
                if (confirmacionTurno() && pagoReserva()) {
                    mensajeConfirmacionTurno(diaTurno, mesTurno, hora, duracion)
                } else {
                    alert("Turno no confirmado.")
                }
            } else {
                mensajeTurnoNoDisponible(diaTurno, mesTurno, duracion)
            }
        } while (!disponibilidad);
    }
} while (!salida());