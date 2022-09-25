let menuIni = "1 - Invitado\n2 - Ingresar como usuario\n3 - Registrase\n4 - Salir"
let nombre = ""
let phone = ""
let usser = "Jardin"
let pass = "1234"
let optIni = ""
let correctInvi = false
let correctLoggin = false


// inicio de funciones funciones
function correctLog(u, p) {
    if ((u === usser) && (p === pass)) {
        return true
    } else {
        return false
    }
}

function invitado() {
    do {
        nombre = prompt("Ingresa tu nombre: ")
        if ((nombre == "") || (nombre == null)) {
            alert("Debe ingresa tu nombre.")
        }
    } while ((nombre == "") || (nombre == null))

    do {
        phone = prompt("Ingresa tu número de teléfono, necesario para contactarnos: ")
        if ((phone == "") || (phone == null)) {
            alert("Debe ingresar un teléfono.")
        }
    } while ((phone == "") || (phone == null))
    alert("Bienvenido " + nombre)
    correctInvi = true
}

function usserLoggin() {
    let usserLoad = ""
    let passLoad = ""
    for (let i = 0; i <= 3; i += 1) {
        if (i < 3) {
            do {
                usserLoad = prompt("Ingresa tu usuario:")
                if (usserLoad == "") {
                    alert("Debe ingresar un usuario válido")
                }
            } while ((usserLoad == ""));

            do {
                passLoad = prompt("Ingresa tu contraseña:")
                if (passLoad == "") {
                    alert("Debe ingresar una contraseña")
                }
            } while (passLoad == "");

            if (correctLog(usserLoad, passLoad)) {
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
    usser = prompt("Ingresa un nombre de usuario:")
    pass = prompt("Ingresa una contraseña:")

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
            return "probabilidad de lluvia"
            break
        default:
            return "soleado"
            break
    }
}
// fin de funciones

// inicio de llamadas


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

console.log(nombre)
console.log(usser)
console.log(phone)
console.log(pass)






