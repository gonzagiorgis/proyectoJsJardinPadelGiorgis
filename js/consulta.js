// renderizar mensaje de bienvenida personalizado
function mensajeBienvenida() {
  let mensajeBienvenida = document.getElementById("mensajeBienvenida");
  mensajeBienvenida.innerText = `Bienvenido/a ${nombreEnSesion()}`;
}

// comprueba si el turno está disponible según el almacenamiento local simulando petición al servidor
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

// funcion principal para el envio del formulario de consulta de turno que termina cuando se confirma y registra el turno o no está disponible
const enviarForm = function () {
  let formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", (evt) => {
    evt.preventDefault();

    ingresoDatosDelTurno(formulario);

    disponible(turnoAConsultar)
      .then(() => {
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

// maneja el ingreso de datos del formulario creando el objeto turno a consultar
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

// una vez establecida la disponibilidad del turno esta función pregunta al usuario si desea confirmarlo de confirmar dispara la función para registrar el turno
// en el alamcenamiento local (simulación de servidor) devolviendo en ultima instancia un booleano que establece si se confirmó o no el turno
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

// maneja el renderizado del pronostico en el formulario de consulta de turno de los proximos 5 dias tomando información desde openweather
function pronostico() {
  const key = "e8e16eafb2ff598cf53b1d180a0a77fd";
  let url = `https://api.openweathermap.org/data/2.5/forecast?lat=-31.45&lon=-64.16&appid=e8e16eafb2ff598cf53b1d180a0a77fd&units=metric&lang=es`;
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

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((clima) => {
      for (i = 0; i < 5; i += 1) {
        let descripcion = clima.list[i].weather[0].description;

        // con los array minimas y maximas filtramos los objetos de la api por día (suando el index) ya que se traen información de los próximos 5 días
        // por cada 3 horas de intervalo
        const minimas = clima.list.filter((info) => {
          let d = new Date().getDate() + (i + 1);
          let dia = new Date(
            Date.parse(info.dt_txt.replace(" ", "T"))
          ).getDate();
          if (d === dia) {
            return Number(info.main.temp_min).toFixed(1);
          }
        });

        const maximas = clima.list.filter((info) => {
          let d = new Date().getDate() + (i + 1);
          let dia = new Date(
            Date.parse(info.dt_txt.replace(" ", "T"))
          ).getDate();
          if (d === dia) {
            return Number(info.main.temp_max).toFixed(1);
          }
        });

        // conestas funciones generamos un array que contenga solamente las temperaturas, minimas o maximas del dia y devolvemos la temperatura minima o maxima con
        // el metodo Math al cual le pasamos el array construido con un spread
        function temperaturaMinima(array) {
          let temperaturas = [];
          for (let i = 0; i < array.length; i += 1) {
            temperaturas.push(Number(array[i].main.temp_min).toFixed(1));
          }
          return Math.min(...temperaturas);
        }

        function temperaturaMaximas(array) {
          let temperaturas = [];
          for (let i = 0; i < array.length; i += 1) {
            temperaturas.push(Number(array[i].main.temp_max).toFixed(1));
          }
          return Math.max(...temperaturas);
        }

        document.getElementById("dia" + (i + 1)).innerHTML =
          "Max: " +
          temperaturaMaximas(maximas) +
          "ºC" +
          "<br>Min: " +
          temperaturaMinima(minimas) +
          "ºC";

        document.getElementById("img" + (i + 1)).src =
          "https://openweathermap.org/img/wn/" +
          clima.list[i].weather[0].icon +
          ".png";
        document.getElementById("img" + (i + 1)).alt = descripcion;
      }
    })
    .catch((error) =>
      Swal.fire({
        title: error,
      })
    );

  function controlDia(dia) {
    if (dia + d.getDay() > 6) {
      return dia + d.getDay() - 7;
    } else {
      return dia + d.getDay();
    }
  }

  function renderDias() {
    for (let i = 0; i < 5; i += 1) {
      document.getElementsByClassName("dia" + (i + 1))[0].innerHTML +=
        diasDeSemana[controlDia(i)];
    }
  }
  renderDias();
}

mensajeBienvenida();
pronostico();
enviarForm();
