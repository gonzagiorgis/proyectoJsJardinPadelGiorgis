function mensajeBienvenida() {
  let mensajeBienvenida = document.getElementById("mensajeBienvenida");
  mensajeBienvenida.innerText = `Bienvenido/a ${nombreEnSesion()}`;
}

function disponible() {
  if (JSON.parse(localStorage.getItem("turnos"))) {
    turnosConfirmados = JSON.parse(localStorage.getItem("turnos"));
  }
  if (
    turnosConfirmados.some((turno) => turno.fecha == turnoAConsultar.fecha) &&
    turnosConfirmados.some((turno) => turno.hora == turnoAConsultar.hora)
  ) {
    return false;
  } else {
    return true;
  }
}

function pronostico() {
  let suerte = Math.round(Math.random() * 3.3);
  switch (suerte) {
    case 1:
      return alert(
        "El pronostico para ese dìa indica parcialmente nublado. ¡Los esperamos!\nJardín Padel Club"
      );

    case 2:
      return alert(
        "El pronostico para ese dìa indica nublado. ¡Los esperamos!\nJardín Padel Club"
      );

    case 3:
      return alert(
        "El pronostico para ese dìa indica probabilidad de lluvia, es solo un pronóstico ;). ¡Los esperamos!\nJardín Padel Club"
      );

    default:
      return alert(
        "El pronostico para ese día indica soleado, ¡no te lo pierdas, los esperamos!\nJardín Padel Club"
      );
  }
}

const enviarForm = function () {
  let formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", (evt) => {
    evt.preventDefault();

    ingresoDatosDelTurno();
    // if (turnoConDatosValidos()) {
    if (disponible()) {
      if (confirmacionTurno() && pagoReserva()) {
        turnoAConsultar.mensajeConfirmacionTurno();
        agregarTurnoConfirmado();
        pronostico();
        borrarTurnoAConsultar();
      } else {
        alert("Turno no confirmado.");
        borrarTurnoAConsultar();
      }
    } else {
      turnoAConsultar.mensajeTurnoNoDisponible();
      borrarTurnoAConsultar();
    }
  });
};

function ingresoDatosDelTurno() {
  let duracionIngresada = formulario.getElementsByClassName("radio");
  let fechaIngresada = formulario.fecha.value;
  let horaIngresada = formulario.hora.value;

  for (let i = 0; i < duracionIngresada.length; i += 1) {
    if (duracionIngresada[i].checked) {
      duracion = duracionIngresada[i].value;
    }
  }

  turnoAConsultar = new Turno(
    nombreEnSesion(),
    telefonoEnSesion(),
    fechaIngresada,
    horaIngresada,
    duracion
  );
  sessionStorage.setItem("turnoAConsultar", JSON.stringify(turnoAConsultar));
}

function confirmacionTurno() {
  return confirm(
    turnoAConsultar.usuario +
      ", el turno que solicitaste se encuentra disponible.\nPrecio aproximado: $" +
      turnoAConsultar.precioFinal() +
      "\n Seña para reservar el turno: $" +
      turnoAConsultar.montoDeReserva() +
      "\n¿Deseas confirmarlo?"
  );
}

function pagoReserva() {
  let opcionPago = prompt(
    "Selecciona un medio de pago para la seña:\n1 - Tarjeta de crédito\n2 - Transferencia"
  );
  // Swal.fire({
  //   title: "Selecciona un medio de pago para la seña:",
  //   showCancelButton: true,
  //   confirmButtonText: "Tarjeta de credito",
  //   confirmButtonText: "Transferencia",
  //   showCancelButton: true
  //   cancelButtonText: "Cancelar"
  // }).then((result) => {
  //   /* Read more about isConfirmed, isDenied below */
  //   if (result.isConfirmed) {
  //     Swal.fire("Saved!", "", "success");
  //   } else if (result.isDenied) {
  //     Swal.fire("Changes are not saved", "", "info");
  //   }
  // });

  do {
    if (opcionPago === null) {
      alert("Pago de la seña cancelado.");
      break;
    } else if (!opcionValidaPago(opcionPago)) {
      alert("Debes ingresar una opción válida");
      opcionPago = prompt(
        "Selecciona un medio de pago para la seña:\n1 - Tarjeta de crédito\n2 - Transferencia"
      );
    }
  } while (!opcionValidaPago(opcionPago));

  switch (opcionPago) {
    case "1":
      tarjetaCredito = prompt(
        "Ingresa el número de la tarjeta de credito.\nDe cancelar el turno antes de las 24hs. se reintegrará la seña"
      );
      return true;
      break;
    case "2":
      alert(
        nombreEnSesion() +
          " realiza la transferencia al siguiente alias: " +
          ALIAS +
          "\nDe cancelar el turno antes de las 24hs. se reintegrará la seña"
      );
      return true;
      break;
    default:
      return false;
      break;
  }
}

function agregarTurnoConfirmado() {
  turnosConfirmados.push(turnoAConsultar);
  localStorage.setItem("turnos", JSON.stringify(turnosConfirmados));
}

const borrarTurnoAConsultar = function () {
  turnoAConsultar = {};
  sessionStorage.removeItem("turnoAConsultar");
};

mensajeBienvenida();
enviarForm();
