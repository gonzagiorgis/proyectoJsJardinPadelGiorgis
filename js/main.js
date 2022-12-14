let nombreInvitado = sessionStorage.getItem("nombreInvitado");
let telefonoInvitado = sessionStorage.getItem("telefonoInvitado");
let usuarioEnSesion = sessionStorage.getItem("usuarioEnSesion");
let invitadoCorrecto = sessionStorage.getItem("invitadoCorrecto");
let inicioSesionCorrecto = sessionStorage.getItem("inicioSesionCorrecto");
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
    return Swal.fire({
      icon: "error",
      title: this.usuario,
      text:
        "El turno que solicitaste no se encuentra disponible para el " +
        this.fecha +
        " a las " +
        this.hora +
        "hs. Prueba con otro día u horario.",
    });
  }
}
class Usuario {
  constructor(nombre, password, telefono) {
    this.nombre = nombre;
    this.password = password;
    this.telefono = telefono;
  }
}
// valida si el nombre de usuario y la contraseña ingresada existen en los usuarios registrados guardados en localStorage, devolviendo un booleno
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

// comprueba si el nombre de usuario ingresado al registrar uno nuevo ya existe
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

// maneja el renderizado sin tener que recargar la pagina al clickear sobre ingreso como invitado
const cambiarAInvitado = function () {
  let main = document.getElementById("principal");
  fetch("inicioinvitado.html")
    .then((pagina) => {
      return pagina.text();
    })
    .then((page) => {
      main.innerHTML = page;
    })
    .then(() => {
      invitado();
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: error,
      });
    });
};

// maneja el ingreso de los datos del formulario del invitado
function invitado() {
  let formulario = document.getElementById("invitado");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let nombre = formulario.nombreInvitado.value || false;
    let telefono = formulario.telefonoInvitado.value || false;

    if (nombre && telefono) {
      nombreInvitado = nombre;
      telefonoInvitado = telefono;
      invitadoCorrecto = true;
      sessionStorage.setItem("invitadoCorrecto", invitadoCorrecto);
      sessionStorage.setItem("invitadoEnSesion", nombreInvitado);
      sessionStorage.setItem("telefonoInvitado", telefonoInvitado);
      window.location.assign("consulta.html");
    } else {
      Swal.fire({
        title: "Datos incorrectos",
        icon: "warning",
        text: "Por favor asegúrate de haber ingresados los datos solicitados.",
      });
    }
  });
}
// renderiza la pagina para el ingreso del usuario registrado
const cambiarAInicioUsuario = function () {
  let main = document.getElementById("principal");
  fetch("iniciousuario.html")
    .then((pagina) => {
      return pagina.text();
    })
    .then((page) => {
      main.innerHTML = page;
    })
    .then(() => {
      inicioDeSesion();
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: error,
      });
    });
};

// maneja el ingreso y registro de los datos del formulario de ingreso del usuario registrado
function inicioDeSesion() {
  let formulario = document.getElementById("inicioSesion");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let usuario = formulario.nombreUsuario.value;
    let pass = formulario.password.value;
    if (usuarioValido(usuario, pass)) {
      inicioSesionCorrecto = true;
      usuarioEnSesion = usuario;
      sessionStorage.setItem("inicioSesionCorrecto", inicioSesionCorrecto);
      sessionStorage.setItem("usuarioEnSesion", usuarioEnSesion);
      window.location.assign("consulta.html");
    } else {
      Swal.fire({
        title: "Usuario y/o contraseña incorrecto/s.",
        icon: "warning",
      });
      inicioSesionCorrecto = false;
    }
  });
}

// renderiza el formulario de registro de un nuevo usuario
const cambiarARegistroUsuario = function () {
  let main = document.getElementById("principal");
  fetch("registrousuario.html")
    .then((pagina) => {
      return pagina.text();
    })
    .then((page) => {
      main.innerHTML = page;
    })
    .then(() => {
      registroUsuario();
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: error,
      });
    });
};

// maneja los datos ingresados en el formulario de registro de nuevo usuario
function registroUsuario() {
  let formulario = document.getElementById("usuarioRegistrado");

  if (JSON.parse(localStorage.getItem("usuarios"))) {
    usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios"));
  }

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let nombre = formulario.nombreUsuario.value;
    let pass1 = formulario.password1.value;
    let pass2 = formulario.password2.value;
    let telefono = formulario.telefono.value;
    if (usuarioExistente(nombre)) {
      Swal.fire({
        title: "Nombre de usuario en uso.",
        text: "Utiliza un nombre de usuario distinto.",
        icon: "warning",
      });
    } else if (pass1 === pass2) {
      usuariosRegistrados.push(new Usuario(nombre, pass1, telefono));
      localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
      inicioSesionCorrecto = true;
      usuarioEnSesion = nombre;
      sessionStorage.setItem("usuarioEnSesion", usuarioEnSesion);
      console.log(nombre);
      window.location.assign("consulta.html");
    } else {
      Swal.fire({
        title: "Las contraseñas no coinciden, vuelva a intentarlo.",
        icon: "warning",
      });
      inicioSesionCorrecto = false;
    }
    sessionStorage.setItem("inicioSesionCorrecto", inicioSesionCorrecto);
  });
}

// devuelve el nombre del usuario en la sesian actual para usado para el mensaje de bienvenida personalizado
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

// maneja los eventos del menu principal
const menuInicio = function () {
  let mensajeBienvenida = document.getElementById("mensajeBienvenida");
  mensajeBienvenida.textContent =
    "Bienvenido a Jardín Padel Club! En esta sección podrás solicitar y reservar un turno. Recuerda que si eres usuario registrado accedes a un descuento del " +
    parseInt(DESCUENTOUSUARIOREGISTRADO * 100) +
    "%.";
  // let main = document.getElementById("principal");

  let botonInicioInvitado = document.getElementById("botonInicioInvitado");
  let botonInicioUsuario = document.getElementById("botonInicioUsuario");
  let botonRegistroUsuario = document.getElementById("botonRegistroUsuario");

  if (botonInicioInvitado) {
    botonInicioInvitado.addEventListener("click", (evt) => {
      evt.preventDefault();
      cambiarAInvitado();
    });
  }

  if (botonInicioUsuario) {
    botonInicioUsuario.addEventListener("click", (evt) => {
      evt.preventDefault();
      cambiarAInicioUsuario();
    });
  }
  if (botonRegistroUsuario) {
    botonRegistroUsuario.addEventListener("click", (evt) => {
      evt.preventDefault();
      cambiarARegistroUsuario();
    });
  }
};

// fin de funciones

// inicio de llamadas

menuInicio();
