// e8e16eafb2ff598cf53b1d180a0a77fd

function mensajeBienvenida() {
  let mensajeBienvenida = document.getElementById("mensajeBienvenida");
  mensajeBienvenida.innerText = `Bienvenido/a ${nombreEnSesion()}`;
}

function disponible(turno) {
  let { fecha, hora } = turno;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (JSON.parse(localStorage.getItem("turnos"))) {
        turnosConfirmados = JSON.parse(localStorage.getItem("turnos"));
      }
      if (
        turnosConfirmados.some((t) => t.fecha == fecha) &&
        turnosConfirmados.some((t) => t.hora == hora)
      ) {
        reject();
      } else {
        resolve();
      }
    });
  }, 2000);
}

const enviarForm = function () {
  let formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", (evt) => {
    evt.preventDefault();

    ingresoDatosDelTurno(formulario);

    disponible(turnoAConsultar)
      .then(() => {
        console.log(disponible(turnoAConsultar));
        confirmacionTurno();
        if (confirmacionTurno()) {
          turnoAConsultar.mensajeConfirmacionTurno();
          pronostico();
          borrarTurnoAConsultar();
        }
      })
      .catch((error) => {
        turnoAConsultar.mensajeTurnoNoDisponible();
        borrarTurnoAConsultar();
        return error;
      });
  });
};

function ingresoDatosDelTurno(formulario) {
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
  let confirmado = false;
  Swal.fire({
    title:
      "El turno que solicitaste se encuentra disponible.\nPrecio aproximado: $" +
      turnoAConsultar.precioFinal() +
      "\n Seña para reservar el turno: $" +
      turnoAConsultar.montoDeReserva() +
      "\n¿Deseas confirmarlo?",
    showDenyButton: true,
    confirmButtonText: "Confirmar",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      confirmado = true;
      Swal.fire(
        "Turno confirmado, para completar la reserva debes transferir la seña de $" +
          turnoAConsultar.montoDeReserva() +
          " al siguiente alias: " +
          ALIAS,
        "Recuerda que tienes hasta 2 horas para realizar el pago, de lo contrario el turno quedará liberado.",
        "success",
        agregarTurnoConfirmado()
      );
    } else if (result.isDenied) {
      Swal.fire("El turno no ha sido reservado", "", "info");
    }
  });
  return confirmado;
}

function agregarTurnoConfirmado() {
  turnosConfirmados.push(turnoAConsultar);
  localStorage.setItem("turnos", JSON.stringify(turnosConfirmados));
}

const borrarTurnoAConsultar = function () {
  turnoAConsultar = {};
  sessionStorage.removeItem("turnoAConsultar");
};

function pronostico() {
  const key = "e8e16eafb2ff598cf53b1d180a0a77fd";
  let url = `http://api.openweathermap.org/data/2.5/forecast?lat=-31.45&lon=-64.16&appid=e8e16eafb2ff598cf53b1d180a0a77fd&units=metric&lang=es`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((clima) => {
      for (i = 0; i < 5; i += 1) {
        let min = Number(clima.list[i].main.temp_min).toFixed(1) + "ºC";
        let max = Number(clima.list[i].main.temp_max).toFixed(1) + "ºC";
        let descripcion = clima.list[i].weather[0].description;
        document.getElementById("dia" + (i + 1)).innerHTML =
          "Min: " + min + "<br>Max: " + max;

        document.getElementById("img" + (i + 1)).src =
          "http://openweathermap.org/img/wn/" +
          clima.list[i].weather[0].icon +
          ".png";
        document.getElementById("img" + (i + 1)).alt = descripcion;
      }
    })
    .catch((error) => console.log(error));

  const d = new Date();
  const diasDeSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  function controlDia(dia) {
    if (dia + d.getDay() > 6) {
      return dia + d.getDay() - 7;
    } else {
      return dia + d.getDay();
    }
  }
  for (let i = 0; i < 5; i += 1) {
    document.getElementsByClassName("dia" + (i + 1))[0].innerHTML +=
      diasDeSemana[controlDia(i)];
  }
}

mensajeBienvenida();
pronostico();
enviarForm();
