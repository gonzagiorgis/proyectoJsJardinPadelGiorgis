let nombreInvitado = sessionStorage.getItem("nombreInvitado");
let telefonoInvitado = sessionStorage.getItem("telefonoInvitado");
let usuarioEnSesion = sessionStorage.getItem("usuarioEnSesion");
let invitadoCorrecto = sessionStorage.getItem("invitadoCorrecto");
let inicioSesionCorrecto = sessionStorage.getItem("inicioSesionCorrecto");
let respuestaConsulta = "";
let tarjetaCredito = "";
let mensaje = "";
let turnoAConsultar = {};
let formulario = document.getElementById("formulario");
const ALIAS = "jardin-club";
const PRECIOHORA = 2000;
const PRECIOHORAPROMO = 1000;
const PRECIOHORALUZ = 2300;
const DESCUENTOUSUARIOREGISTRADO = 0.05;
const PORCENTAJERESERVA = 0.5;
let usuariosRegistrados = [];
let turnosConfirmados = [];

// inicio de funciones

const salida = () => opcionInicio === "4";
class Turno {
  constructor(usuario, telefono, fecha, hora, duracion) {
    this.usuario = usuario;
    this.telefono = telefono;
    this.fecha = fecha;
    this.hora = hora;
    this.duracion = duracion;
  }

  precio = () => Number.parseFloat(this.duracion * PRECIOHORA).toFixed(2);
  precioConLuz = () =>
    Number.parseFloat(this.duracion * PRECIOHORALUZ).toFixed(2);
  precioPromo = () =>
    Number.parseFloat(this.duracion * PRECIOHORAPROMO).toFixed(2);
  horaFinTurno = () => convertirFloatAHora(this.duracion);

  precioFinal() {
    let precio = 0;
    if (this.hora < 17) {
      precio = this.precioPromo();
    } else if (this.hora > 19) {
      precio = this.precioConLuz();
    } else {
      precio = this.precio();
    }
    if (inicioSesionCorrecto === true) {
      precio -= precio * DESCUENTOUSUARIOREGISTRADO;
    }
    return precio;
  }

  montoDeReserva() {
    return Number.parseFloat(this.precioFinal()).toFixed(2) * PORCENTAJERESERVA;
  }

  mensajeConfirmacionTurno() {
    return alert(
      this.usuario +
        " confirmamos tu turno para el " +
        this.fecha +
        " a las " +
        this.hora +
        " hs., duración: " +
        this.horaFinTurno() +
        "\nTen en cuenta que el valor del turno puede variar dependiendo del uso de la luz a pedido de los jugadores."
    );
  }

  mensajeTurnoNoDisponible() {
    return alert(
      this.usuario +
        ", el turno que solicitaste no se encuentra disponible para el " +
        this.fecha +
        " a las " +
        this.hora +
        "hs."
    );
  }
}
class Usuario {
  constructor(nombre, password, telefono) {
    this.nombre = nombre;
    this.password = password;
    this.telefono = telefono;
  }
}

function usuarioValido(nombreUsuario, pass) {
  if (JSON.parse(localStorage.getItem("usuarios"))) {
    usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios"));
  }

  let usuarioEncontrado = usuariosRegistrados.find(
    (usu) => usu.nombre === nombreUsuario
  );

  if (usuarioEncontrado != undefined && usuarioEncontrado.password === pass) {
    return true;
  } else {
    return false;
  }
}

function convertirFloatAHora(h) {
  let hora = parseInt(h);
  if (parseInt(60 * (h - hora)) < 10) {
    minutos = "0" + parseInt(60 * (h - hora));
  } else {
    minutos = parseInt(60 * (h - hora));
  }
  return hora + ":" + minutos + "hs.";
}

function usuarioExistente(nombreUsuario) {
  if (JSON.parse(localStorage.getItem("usuarios"))) {
    usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios"));
  }
  if (
    usuariosRegistrados.find((usu) => usu.nombre === nombreUsuario) ===
    undefined
  ) {
    return false;
  } else {
    return true;
  }
}

function entradaValida(entrada) {
  do {
    mensaje = prompt("Ingresa tu " + entrada + ":");
    if (mensaje == "") {
      alert("Débes ingresar tu " + entrada + ".");
    } else if (mensaje == null) {
      break;
    }
  } while (mensaje == "");
  return mensaje;
}

function invitado() {
  nombreInvitado = entradaValida("nombre");
  telefonoInvitado = entradaValida("teléfono");
  if (nombreInvitado != null && telefonoInvitado != null) {
    invitadoCorrecto = true;
    sessionStorage.setItem("invitadoCorrecto", invitadoCorrecto);
    sessionStorage.setItem("invitadoEnSesion", nombreInvitado);
    sessionStorage.setItem("telefonoInvitado", telefonoInvitado);
    window.location.assign("consulta.html");
  } else {
    alert(
      "Debes ingresar nombre y teléfono para poder solicitar o consultar turnos."
    );
  }
}

function inicioDeSesion() {
  let usuarioIngresado = "";
  let passIngresada = "";
  for (let i = 0; i <= 3; i += 1) {
    if (i < 3) {
      usuarioIngresado = entradaValida("usuario");
      passIngresada = entradaValida("contraseña");

      if (usuarioValido(usuarioIngresado, passIngresada)) {
        inicioSesionCorrecto = true;
        usuarioEnSesion = usuarioIngresado;
        sessionStorage.setItem("usuarioEnSesion", usuarioEnSesion);
        window.location.assign("consulta.html");

        break;
      } else {
        alert("Usuario o contraseña incorrecto");
        inicioSesionCorrecto = false;
      }
    } else {
      alert(
        "Vuelva a intentarlo más tarde, ha utilizado los 3 intentos permitidos."
      );
      inicioSesionCorrecto = false;
      break;
    }
  }
  sessionStorage.setItem("inicioSesionCorrecto", inicioSesionCorrecto);
}

function registroUsuario() {
  let nombreIngresado = "";
  if (JSON.parse(localStorage.getItem("usuarios"))) {
    usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios"));
  }

  do {
    nombreIngresado = entradaValida("usuario");
    if (usuarioExistente(nombreIngresado)) {
      alert("Usuario existente, ingresa otro nombre de usuario.");
    }
  } while (usuarioExistente(nombreIngresado));

  let telefonoIngresado = entradaValida("teléfono");
  let password = entradaValida("contraseña");

  if (
    nombreIngresado != null &&
    telefonoIngresado != null &&
    password != null
  ) {
    for (let i = 0; i <= 3; i += 1) {
      if (i < 3) {
        let passCheck = prompt("Ingresa nuevamente la contraseña:");
        if (password === passCheck) {
          usuariosRegistrados.push(
            new Usuario(nombreIngresado, password, telefonoIngresado)
          );
          localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
          inicioSesionCorrecto = true;
          usuarioEnSesion = nombreIngresado;
          sessionStorage.setItem("usuarioEnSesion", usuarioEnSesion);
          window.location.assign("consulta.html");
          break;
        } else {
          alert("La contraseña no coincide, vuelve a ingresarla.");
          inicioSesionCorrecto = false;
        }
      } else {
        alert("Contraseña incorrecta. Imposible registrar");
        inicioSesionCorrecto = false;
        break;
      }
    }
  } else {
    alert("Faltan datos para proceder con el registro.");
  }
  sessionStorage.setItem("inicioSesionCorrecto", inicioSesionCorrecto);
}

function opcionValidaMenuInicio(opcion) {
  if (isNaN(opcion)) {
    return false;
  } else {
    if (opcion <= 0 || opcion >= 5) {
      return false;
    } else {
      return true;
    }
  }
}

function opcionValidaPago(opcion) {
  if (isNaN(opcion)) {
    return false;
  } else {
    if (opcion <= 0 || opcion >= 3) {
      return false;
    } else {
      return true;
    }
  }
}

function nombreEnSesion() {
  let nombre = "";
  if (invitadoCorrecto) {
    nombre = sessionStorage.getItem("invitadoEnSesion");
  } else if (inicioSesionCorrecto) {
    nombre = sessionStorage.getItem("usuarioEnSesion");
  }
  return nombre;
}

function telefonoEnSesion() {
  if (invitadoCorrecto) {
    return sessionStorage.getItem("telefonoInvitado");
  } else if (inicioSesionCorrecto) {
    return JSON.parse(localStorage.getItem("usuarios")).find(
      (usu) => usu.nombre === usuarioEnSesion
    ).telefono;
  }
}

function inicioValido() {
  if (invitadoCorrecto === true || inicioSesionCorrecto === true) {
    return true;
  } else {
    return false;
  }
}

const salir = function () {
  sessionStorage.removeItem("invitadoCorrecto");
  sessionStorage.removeItem("inicioSesionCorrecto");
  sessionStorage.removeItem("nombreInvitado");
  sessionStorage.removeItem("telefonoInvitado");
  sessionStorage.removeItem("usuarioEnSesion");
  sessionStorage.removeItem("invitadoEnSesion");
  sessionStorage.removeItem("turnoAConsultar");
  window.location.assign("index.html");
};

const menuInicio = function () {
  let botonInicioInvitado = document.getElementById("botonInicioInvitado");
  let botonInicioUsuario = document.getElementById("botonInicioUsuario");
  let botonRegistroUsuario = document.getElementById("botonRegistroUsuario");

  if (botonInicioInvitado) {
    botonInicioInvitado.addEventListener("click", invitado);
  }

  if (botonInicioUsuario) {
    botonInicioUsuario.addEventListener("click", inicioDeSesion);
  }

  if (botonRegistroUsuario) {
    botonRegistroUsuario.addEventListener("click", registroUsuario);
  }
};

// fin de funciones

// inicio de llamadas

menuInicio();
