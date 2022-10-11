let listaMenuInicio = "1 - Invitado\n2 - Ingresar como usuario\n3 - Registrase\n4 - Salir"
let nombreInvitado = ""
let telefonoInvitado = ""
let usuarioEnSesion = ""
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
let turnoAConsultar = ""
const ALIAS = "jardin-club"
const PRECIOHORA = 2000
const PRECIOHORAPROMO = 1000
const PRECIOHORALUZ = 2300
const DESCUENTOUSUARIOREGISTRADO = 0.05
const usuariosRegistrados = []
const turnosConfirmados = []

// inicio de funciones

const salida = () => opcionInicio === "4"
class Turno {
    constructor(usuario, telefono, fecha, hora, duracion) {
        this.usuario = usuario
        this.telefono = telefono
        this.fecha = fecha
        this.hora = hora
        this.duracion = duracion
    }

    precio = () => Number.parseFloat(this.duracion * PRECIOHORA).toFixed(2)
    precioConLuz = () => Number.parseFloat(this.duracion * PRECIOHORALUZ).toFixed(2)
    precioPromo = () => Number.parseFloat(this.duracion * PRECIOHORAPROMO).toFixed(2)
    horaFinTurno = () => this.duracion + this.hora

    precioFinal() {
        let precio = 0
        if (hora < 17) {
            precio = this.precioPromo()
        } else if (hora > 19) {
            precio = this.precioConLuz()
        } else {
            precio = this.precio()
        }
        if (inicioSesionCorrecto === true) {
            precio -= precio * DESCUENTOUSUARIOREGISTRADO
        }
        return precio
    }

    montoDeReserva() {
        return Number.parseFloat(this.precioFinal()).toFixed(2)
    }

    mensajeConfirmacionTurno() {
        return alert(this.usuario + " confirmamos tu turno para el " + this.fecha + " desde las " + this.hora + " hs., hasta las " + convertirFloatAHora(this.horaFinTurno()) + "\nTen en cuenta que el valor del turno puede variar dependiendo del uso de la luz a pedido de los jugadores.")
    }

    mensajeTurnoNoDisponible() {
        return alert(this.usuario + ", el turno que solicitaste no se encuentra disponible para el " + this.fecha + " a las " + this.hora + "hs.")
    }
}
class Usuario {
    constructor(nombre, password, telefono,) {
        this.nombre = nombre
        this.password = password
        this.telefono = telefono
    }

    paswordCorrecto(password) {
        if (password === this.password) {
            return true
        } else {
            return false
        }
    }
}

function usuarioValido(nombreUsuario, pass) {
    const usuarioEncontrado = usuariosRegistrados.find((usu) => usu.nombre === nombreUsuario)
    if (usuarioEncontrado != undefined && usuarioEncontrado.paswordCorrecto(pass)) {
        return true
    } else {
        return false
    }
}

function usuarioExistente(nombreUsuario) {
    if (usuariosRegistrados.find((usu) => usu.nombre === nombreUsuario) === undefined) {
        return false
    } else {
        return true
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
    telefonoInvitado = entradaValida("teléfono")
    if (nombreInvitado != null && telefonoInvitado != null) {
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
                alert("Bienvenido " + usuarioIngresado)
                inicioSesionCorrecto = true
                usuarioEnSesion = usuarioIngresado
                break;
            } else {
                alert("Usuario o contraseña incorrecto")
                inicioSesionCorrecto = false
            }
        } else {
            alert("Vuelva a intentarlo más tarde, ha utilizado los 3 intentos permitidos.")
            inicioSesionCorrecto = false
            break
        }
    }
}

function registroUsuario() {
    let nombreIngresado = ""
    do {
        nombreIngresado = entradaValida("usuario")
        if (usuarioExistente(nombreIngresado)) {
            alert("Usuario existente, ingresa otro nombre de usuario.")
        }
    } while (usuarioExistente(nombreIngresado))

    let telefonoIngresado = entradaValida("teléfono")
    let password = entradaValida("contraseña")

    if (nombreIngresado != null && telefonoIngresado != null && password != null) {
        for (let i = 0; i <= 3; i += 1) {
            if (i < 3) {
                let passCheck = prompt("Ingresa nuevamente la contraseña:")
                if (password === passCheck) {
                    alert("Gracias por registrarte " + nombreIngresado + ", recuerda tu contraseña.")
                    usuariosRegistrados.push(new Usuario(nombreIngresado, password, telefonoIngresado))
                    inicioSesionCorrecto = true
                    usuarioEnSesion = nombreIngresado
                    break;
                } else {
                    alert("La contraseña no coincide, vuelve a ingresarla.")
                    inicioSesionCorrecto = false
                }
            } else {
                alert("Contraseña incorrecta. Imposible registrar")
                inicioSesionCorrecto = false
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
    alert("Bienvenido a Jardín Padel Club!\nEn esta sección podrás solicitar y reservar un turno. \nRecuerda que si eres usuario registrado accedes a un descuento del " + (DESCUENTOUSUARIOREGISTRADO * 100) + "%")
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


function nombreEnSesion() {
    if (invitadoCorrecto) {
        return nombreInvitado
    } else if (inicioSesionCorrecto) {
        return usuarioEnSesion
    }
}

function telefonoEnSesion() {
    if (invitadoCorrecto) {
        return telefonoInvitado
    } else if (inicioSesionCorrecto) {
        return usuariosRegistrados.find((usu) => usu.nombre === nombreEnSesion()).telefono
    } else {
        return "no informado"
    }
}

function inicioValido() {
    if (invitadoCorrecto === true || inicioSesionCorrecto === true) {
        return true
    } else {
        return false
    }
}

function reiniciarMarcasInicio() {
    invitadoCorrecto = false
    inicioSesionCorrecto = false
}

function pronostico() {
    let suerte = Math.round(Math.random() * 3.3)
    switch (suerte) {
        case 1:
            return alert("El pronostico para ese dìa indica parcialmente nublado. ¡Los esperamos!\nJardín Padel Club")
            break
        case 2:
            return alert("El pronostico para ese dìa indica nublado. ¡Los esperamos!\nJardín Padel Club")
            break
        case 3:
            return alert("El pronostico para ese dìa indica probabilidad de lluvia, es solo un pronóstico ;). ¡Los esperamos!\nJardín Padel Club")
            break
        default:
            return alert("El pronostico para ese día indica soleado, ¡no te lo pierdas, los esperamos!\nJardín Padel Club")
            break
    }
}

function disponible() {

    if (turnosConfirmados.length == 0) {
        agregarTurnoConfirmado()
        return true
    } else if (turnosConfirmados.some((turno) => turno.fecha == fechaTurno()) && turnosConfirmados.some((turno) => turno.hora == hora)) {

        return false
    } else {
        agregarTurnoConfirmado()
        return true
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

    turnoAConsultar = new Turno(nombreEnSesion(), telefonoEnSesion(), fechaTurno(), hora, duracion)
}

function fechaTurno() {
    return diaTurno + "/" + mesTurno
}

function convertirFloatAHora(h) {
    let hora = parseInt(h)
    let minutos = parseInt(60 * (h - hora))
    return hora + ":" + minutos + "hs."
}

function confirmacionTurno() {
    return confirm(turnoAConsultar.usuario + ", el turno que solicitaste se encuentra disponible.\nPrecio aproximado: $" + turnoAConsultar.precioFinal() + "\n Seña para reservar el turno: $" + turnoAConsultar.montoDeReserva() + "\n¿Deseas confirmarlo?")
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
            alert(nombreEnSesion() + " realiza la transferencia al siguiente alias: " + ALIAS + "\nDe cancelar el turno antes de las 24hs. se reintegrará la seña")
            return true
            break
        default:
            return false
            break
    }

}

function agregarTurnoConfirmado() {
    turnosConfirmados.push(turnoAConsultar)
}

function borrarTurnoAConsultar() {
    turnoAConsultar = ""
}
// fin de funciones

// inicio de llamadas

do {
    menuInicio()
    if (inicioValido() && !salida()) {
        do {
            ingresoDatosDelTurno()
            if (disponible()) {
                if (confirmacionTurno() && pagoReserva()) {

                    turnoAConsultar.mensajeConfirmacionTurno()
                    pronostico()
                    break
                } else {
                    alert("Turno no confirmado.")
                }
            } else {
                turnoAConsultar.mensajeTurnoNoDisponible()
            }
        } while (!disponible())
    }
    reiniciarMarcasInicio()
} while (!salida());

