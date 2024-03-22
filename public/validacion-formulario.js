document.addEventListener("DOMContentLoaded", function() {
  let botonContacto = document.getElementById("contacto");
  let botonReserva = document.getElementById("azul");
  if (botonContacto != null){
    botonContacto.addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que se envíe el formulario automáticamente
        if (!validarFormulariop()) { // Validar el formulario
            // En caso de error, no hacer nada adicional aquí
        }
    });
  }

  if (botonReserva != null){
    botonReserva.addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que se envíe el formulario automáticamente
        if (!validarFormulario()) { // Validar el formulario
            // En caso de error, no hacer nada adicional aquí
        }
    });

  }
  
  
  // Función para validar el formulario
  function validarFormulario() {
      let nombre = document.getElementById("nombre").value;
      let apellidos = document.getElementById("apellidos").value;
      let n_personas = document.getElementById("personas").value;
      let salaSeleccionada = document.getElementById("actividad").value;
      let horaInicio = document.getElementById("inicio").value;
      let horaFin = document.getElementById("fin").value;

      let booleano = true;

      // Verificar que todos los campos estén completos
      if (nombre == "" || apellidos == "" || n_personas == "" || salaSeleccionada == "" || horaInicio == "" || horaFin == "") {
          alert("Por favor, complete todos los campos del formulario.");
          booleano = false;
      }

      // Verificar si el nombre contiene solo caracteres alfabéticos
      if (!soloLetras(nombre)) {
          mostrarMensajeError("El nombre solo puede contener letras.", "nombre");
          booleano = false;
      } else {
          ocultarMensajeError("nombre"); // Ocultar el mensaje de error si la validación pasa
      }

      // Verificar si los apellidos contienen solo caracteres alfabéticos
      if (!soloLetras(apellidos)) {
          mostrarMensajeError("Apellidos solo pueden contener letras.", "apellidos");
          booleano = false;
      } else {
          ocultarMensajeError("apellidos"); // Ocultar el mensaje de error si la validación pasa
      }

      if (!salas_cor()) booleano = false;
  
      // Verificar si la fecha de reserva es válida (no puede ser anterior a la fecha actual)
      if (!fecha_cor()) booleano = false;
  
      if (!verificarHoras()) booleano = false;

      if (!tlfn_correcto()) booleano = false;

      if (!booleano) return booleano;

      else{
        alert("¡Formulario enviado con éxito!");
        return true;
      }
      // Si todo está correcto, se envía el formulario
      
  }

  function validarFormulariop() {
      let nombre = document.getElementById("nombre").value;
      let apellidos = document.getElementById("apellidos").value;
      let salaSeleccionada = document.getElementById("actividad").value;
      let mensaje = document.getElementById("mensaje").value;

      let booleano = true;

      // Verificar que todos los campos estén completos
      if (nombre == "" || apellidos == "" || salaSeleccionada == "" || mensaje == "") {
          alert("Por favor, complete todos los campos del formulario.");
          booleano = false;
      }

      // Verificar si el nombre contiene solo caracteres alfabéticos
      if (!soloLetras(nombre)) {
          mostrarMensajeError("El nombre solo puede contener letras.", "nombre");
          booleano = false;
      } else {
          ocultarMensajeError("nombre"); // Ocultar el mensaje de error si la validación pasa
      }

      // Verificar si los apellidos contienen solo caracteres alfabéticos
      if (!soloLetras(apellidos)) {
          mostrarMensajeError("Apellidos solo pueden contener letras.", "apellidos");
          booleano = false;
      } else {
          ocultarMensajeError("apellidos"); // Ocultar el mensaje de error si la validación pasa
      }

    if (salaSeleccionada == "") {
        mostrarMensajeError("Elige un taller", "taller");
        booleano = false;
    } else {
        ocultarMensajeError("taller"); // Ocultar el mensaje de error si la validación pasa
    }

    if (mensaje == "") {
        mostrarMensajeError("Escribe el mensaje que desees enviar", "mensaje");
        booleano = false;
    } else {
        ocultarMensajeError("mensaje"); // Ocultar el mensaje de error si la validación pasa
    }

      if (!tlfn_correcto()) booleano = false;

      if (!booleano) return booleano;

      else{
        alert("¡Formulario enviado con éxito!");
        return true;
      }
      // Si todo está correcto, se envía el formulario

  }

  // Función para verificar si una cadena contiene solo letras
  function soloLetras(cadena) {
      return /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(cadena);
  }
  
  // Función para mostrar mensaje de error en la tabla
  function mostrarMensajeError(mensaje, campo) {
      let errorElement = document.createElement("tr");
      errorElement.id = "error-" + campo;
      errorElement.innerHTML = "<td>" + mensaje + "</td>";
      errorElement.style.color = "red";

      // Verificar si ya existe un mensaje de error para el campo
      if (!document.getElementById("error-" + campo)) {
          let tablaErrores = document.querySelector('.formulario table');
          if (!tablaErrores) {
              tablaErrores = document.createElement("table");
              tablaErrores.innerHTML = "<hr><tr><td><b>Errores</b></td></tr><hr>";
              document.getElementById("formulario_error").appendChild(tablaErrores);
          }

          tablaErrores.appendChild(errorElement);

          // Desplazar la página hacia arriba para mostrar el error al usuario
          document.getElementById("formulario_error").scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  }


  // Función para ocultar mensaje de error de la tabla
  function ocultarMensajeError(campo) {
      let errorElement = document.getElementById("error-" + campo);
      if (errorElement) {
          errorElement.remove();
      }

      // Verificar si se deben ocultar todos los errores
      let tablaErrores = document.querySelector('.formulario table');
      if (tablaErrores && tablaErrores.childElementCount === 1) {
          tablaErrores.remove();
      }
  }


  function verificarHoras() {
      // Obtener los elementos de hora de inicio y fin
      let horaInicioElemento = document.getElementById("inicio");
      let horaFinElemento = document.getElementById("fin");

      // Obtener la hora de inicio y fin en formato HH:MM
      let horaInicio = horaInicioElemento.value;
      let horaFin = horaFinElemento.value;

      // Extraer las horas y los minutos de la hora de inicio
      let horaInicioArray = horaInicio.split(':');
      let horaInicioHora = parseInt(horaInicioArray[0]);
      let horaInicioMinutos = parseInt(horaInicioArray[1]);

      // Extraer las horas y los minutos de la hora de fin
      let horaFinArray = horaFin.split(':');
      let horaFinHora = parseInt(horaFinArray[0]);
      let horaFinMinutos = parseInt(horaFinArray[1]);

      // Comparar horas
      if (horaInicioHora < 9 || horaInicio > 18)
      {
        ocultarMensajeError("hora");
        mostrarMensajeError("Solo trabajamos de 9:00 a 18:00.", "hora");
        return false;
      }
      else if (horaFinHora < 11 || horaInicio > 20)
      {
        ocultarMensajeError("hora");
        mostrarMensajeError("Solo trabajamos de 9:00 a 20:00.", "hora");
        return false;
      }
      else
      {
        if (horaInicioHora > horaFinHora) {
            ocultarMensajeError("hora");
            mostrarMensajeError("Horas incorrectas.", "hora");
            return false;
        } else if (horaInicioHora > (horaFinHora-2)) {
            ocultarMensajeError("hora");
            mostrarMensajeError("Las actividades tienen una duración mínima de dos horas.", "hora");
            return false;
        } else if (horaInicioHora <= (horaFinHora-2) && horaInicioMinutos <= horaFinMinutos) {
            ocultarMensajeError("hora");
            return true;
        } else if (horaInicioHora < (horaFinHora-2)) {
            ocultarMensajeError("hora");
            return true;
        }
        else{
            ocultarMensajeError("hora");
            mostrarMensajeError("Hay algún error en las horas, por favor, vuelva a introducir una fecha correcta", "hora");
            return false;
        }
      }
  }

  function tlfn_correcto() {
      let numero = document.getElementById("telefono").value;
      var numeroString = numero.toString();

      // Comprobamos si la longitud de la cadena es igual a 9
      if (numeroString.length === 9 && (numeroString[0] == 6 || numeroString[0] == 7)) {
          ocultarMensajeError("telefono");
          return true; // Si tiene 9 cifras, retornamos true
      } else {
        mostrarMensajeError("Introduce un número de teléfono correcto (9 cifras, tlfn España)", "telefono");
          return false; // Si no tiene 9 cifras, retornamos false
      }
  }

  function salas_cor()
  {
    let salita = document.getElementById("actividad");
    let personas = document.getElementById("personas");

    if (personas.value < 1)
    {
      ocultarMensajeError("salas");
      mostrarMensajeError("Debe ser mayor a 0 el nº de personas", "salas");
      personas.value = "";
      return false;
    }
    else
    {
      switch (parseInt(salita.value))
      {
        case 1:
          if (personas.value > 10)
          {
            ocultarMensajeError("salas");
            mostrarMensajeError("Tamaño máximo para Grafitis: 10", "salas");
            personas.value = "";
            return false;
          }
          break;
        case 2:
          if (personas.value > 30)
          {
            ocultarMensajeError("salas");
            mostrarMensajeError("Tamaño máximo para Manualidades: 30", "salas");
            personas.value = "";
            return false;
          }
          break;
        case 3:
          if (personas.value > 40)
          {
            ocultarMensajeError("salas");
            mostrarMensajeError("Tamaño máximo para Bellas Artes: 40", "salas");
            personas.value = "";
            return false;
          }
          break;
        default:
          ocultarMensajeError("salas");
          mostrarMensajeError("Por favor, indique una actividad", "salas");
          personas.value = "";
          return false;
      }
      ocultarMensajeError("salas");
      return true;
    }
  }

  function fecha_cor()
  {
    let fechaInput = document.getElementById("fecha");
    let fechaSeleccionada = new Date(fechaInput.value);
    let fechaActual = new Date();

    if (fechaSeleccionada < fechaActual) {
        mostrarMensajeError("La fecha de reserva no puede ser anterior a la fecha actual.", "fecha");
        fechaInput.value = null;
        return false;
    } else {
        ocultarMensajeError("fecha");
        return true;
    }
  }
});