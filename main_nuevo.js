var contenedor_pag = document.getElementById("pagina");
var ventana_flotante = document.getElementById("ventana_popul");
var ventana_ocr = document.getElementById("ventana_ocr");
var tipo_dato;
var nombre = document.getElementById("nombre");
var curp = document.getElementById("curp");
var apellidopat = document.getElementById("apellidopat");
var apellidomat = document.getElementById("apellidomat");
var dia_nacimiento = document.getElementById("dia");
var estado_nacimiento = document.getElementById("e_nac");
var correo = document.getElementById("correo");
var calle = document.getElementById("calle");
var numero_ext = document.getElementById("ext");
var numero_interior = document.getElementById("int");
var codigo_postal = document.getElementById("cp");
var municipio = document.getElementById("municipio");
var estado = document.getElementById("estado");
var ciudad = document.getElementById("ciudad");
var alias = document.getElementById("alias");
var calle_fiscal = document.getElementById("calle_fiscal");
var numero_ext_fiscal = document.getElementById("ext_fiscal");
var numero_int_fiscal = document.getElementById("int_fiscal");
var cp_fiscal = document.getElementById("cp_fiscal");
var municipio_fiscal = document.getElementById("municipio_fiscal");
var estado_fiscal = document.getElementById("estado_fiscal");
var ciudad_fiscal = document.getElementById("ciudad_fiscal");
var repeticion = 0;
var rfc = document.getElementById("rfc");
var ocupacion = document.getElementById("ocupacion");
var btn_enviar = document.getElementById("btn-enviar");
var doc_id = document.getElementById("doc_id");
var noidentificacion = document.getElementById("noidentificacion");
var telefono = document.getElementById("telefono");
var telefono_oficina = document.getElementById("telefono_oficina");
var telefono_movil = document.getElementById("telefono_movil");
var autoridad_emisora = document.getElementById("autoridad_emisora");
var datos_escanear = document.querySelectorAll(".datos_escanear");
var datos_escanear_moral = document.querySelectorAll(".datos_escanear_moral");
var civil = document.getElementById("civil");
var rfc_Curp = document.getElementById("rfc_Curp");
var valor_boton;
var title_escanea = document.getElementById("title_escanea");
var AutoridadEmisora2 = document.getElementById("AutoridadEmisora2");
var mes_dia_text = document.getElementById("mes_dia_text");
var AutoridadEmisora2 = document.getElementById("AutoridadEmisora2");
var mes_dia = document.getElementById("mes_dia");
var colonia = document.getElementById("colonia");
var colonia_fiscal = document.getElementById("colonia_fiscal");
var manzana = document.getElementById("manzana");
var manzana_fiscal = document.getElementById("manzana_fiscal");
var lote = document.getElementById("lote");
var lote_fiscal = document.getElementById("lote_fiscal");
var pais = document.getElementById("pais");
var pais_fiscal = document.getElementById("pais_fiscal");
var genero = document.getElementById("genero");
var regimen_fiscal = document.getElementById("regimen_fiscal");

function abrir_videoOCR() {
  cerrar_ventana_video();
  contenedor_pag.style.opacity = "0.4";
  ventana_ocr.style.display = "block";
  contenedor_pag.style.pointerEvents = "none";
}
function cerrar_ventana_video() {
  contenedor_pag.style.opacity = "1";
  contenedor_pag.style.pointerEvents = "all";
  ventana_flotante.style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
  tipo_de_persona("fisica");
});
//se crea una funcion para identificar
var genero = document.getElementById("genero");
function IdetificadorDocumento(respuesta) {
  if (respuesta.data[26].length == 13) {
    rfc.value = respuesta.data[26].substring(8, 21);
  } else if (respuesta.data[24].length == 12) {
    rfc.value = respuesta.data[24].substring(8, 20);
  } else if (v) {
    curp.value = datos[0];
  } else if (u) {
  }
}

/*
function TipoConstancia(onScanSuccess) {
    const regexRFC = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;
    const regexCURP = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/;

    function ExtraerURL(url) {
        let segmentos = url.split('/');
        
        //aqui despues de separar los datos por / se separan depues por _ ya que en los ultimos digi           
        return segmentos[segmentos.length - 1];  // El último segmento de la URL
    }

    function identificarTipoPorURL(url) {
        const ultimoSegmento = ExtraerURL(url);

        if (regexRFC.test(ultimoSegmento)) {
            return "moral";
        } else if (regexCURP.test(ultimoSegmento)) {
            return "fiscal";
        } else {
            return "desconocido";  // Si no coincide con ninguno
        }
    }
*/
function manejarEscaneo(url, formularioSeleccionado) {
  const tipoConstancia = identificarTipoPorURL(url);

  if (tipoConstancia !== formularioSeleccionado) {
    alert(
      "El tipo de constancia escaneada no coincide con el formulario seleccionado."
    );
    // Aquí puedes redirigir al formulario correcto o dar alguna otra instrucción
  } else {
    // Rellenar los campos del formulario con los datos de la URL
    rellenarFormulario(url); // Asegúrate de definir esta función
  }
}
//

function resetForm() {
  document.querySelector(".form-register").reset();
}

function onScanSuccess(qrCodeMessage) {
  if (repeticion == 0) {
    if (tipo_dato == 3 || tipo_dato == 4) {
      resetForm();
      axios
        .post("copiar_pag.php", {
          url: qrCodeMessage,
          // data: 1
        })
        .then(function (respuesta) {
          console.log(respuesta.data);
          if (tipo_dato == 3) {
            //Documento Fiscal
            if (respuesta.data.length == 27) {
              // Asignar valores a los campos de identificación
              curp.value = respuesta.data[1]; // CURP
              nombre.value = respuesta.data[2]; // Nombre
              apellidopat.value = respuesta.data[3]; // Apellido Paterno
              apellidomat.value = respuesta.data[4]; // Apellido Materno
              var fecha_nacimiento = respuesta.data[5].split("-");
              dia_nacimiento.value =
                fecha_nacimiento[2] +
                "-" +
                fecha_nacimiento[1] +
                "-" +
                fecha_nacimiento[0];
              correo.value = respuesta.data[19];

              rfc.value = respuesta.data[26].substring(8, 21);
              // Asignar valores de dirección
              calle.value = respuesta.data[15]; // Nombre de la vialidad
              numero_ext.value = respuesta.data[16]; // Número exterior
              numero_interior.value = respuesta.data[17]; // Número interior
              codigo_postal.value = respuesta.data[18]; // Código postal

              // Asignar valores de dirección fiscal
              calle_fiscal.value = respuesta.data[15]; // Calle fiscal
              numero_ext_fiscal.value = respuesta.data[16]; // Número exterior fiscal
              numero_int_fiscal.value = respuesta.data[17]; // Número interior fiscal
              cp_fiscal.value = respuesta.data[18]; // Código postal fiscal
              municipio_fiscal.value = respuesta.data[12]; // Municipio fiscal
              estado_fiscal.value = respuesta.data[11]; // Estado fiscal
              ciudad_fiscal.value = respuesta.data[13]; // Colonia fiscal

              // Extraer las últimas 11 letras de `respuesta.data[11]`
              let textoCompleto = respuesta.data[23];
              let ultimasLetras = textoCompleto.slice(-11); // Extraer últimas 11 letras

              // Buscar en el select cuál es la opción más parecida
              let selectElement = document.getElementById("regimen_fiscal"); // Asegúrate de que este ID sea correcto

              let opciones = selectElement.options;
              let opcionParecida = null;

              // Comparar cada opción del select con `ultimasLetras`
              for (let i = 0; i < opciones.length; i++) {
                if (opciones[i].value.includes(ultimasLetras)) {
                  opcionParecida = opciones[i];
                  break; // Salir del bucle si se encuentra una coincidencia
                }
              }

              // Si se encuentra una opción parecida, seleccionarla
              if (opcionParecida) {
                console.log(opcionParecida.value);
                selectElement.value = opcionParecida.value;
              } else {
                console.warn("No se encontró una opción parecida.");
                selectElement.value = respuesta.data[23];
              }
              buscarCodigoYColonias();
              buscarCodigoYColonias("_fiscal");
            } else {
              alertify.error("El documento escaneado no es el correcto");
            }
          } else {
            if (respuesta.data.length == 25) {
              nombre.value = respuesta.data[1]; // Denominación o Razón Social
              var fecha_nacimiento = respuesta.data[3].split("-");
              dia_nacimiento.value =
                fecha_nacimiento[2] +
                "-" +
                fecha_nacimiento[1] +
                "-" +
                fecha_nacimiento[0]; // Fecha de constitución
              estado_nacimiento.value = respuesta.data[9]; // Entidad federativa
              rfc.value = respuesta.data[24].substring(8, 20); //RFC
              correo.value = respuesta.data[17];
              //  dirección
              calle.value = respuesta.data[13]; // Nombre de la vialidad
              numero_ext.value = respuesta.data[14]; // Número exterior
              numero_interior.value = respuesta.data[15]; // Número interior
              codigo_postal.value = respuesta.data[16]; // Código postal
              codigo_postal.blur();
              municipio.value = respuesta.data[10]; // Municipio
              estado.value = respuesta.data[9]; // Estado
              ciudad.value = respuesta.data[11]; // Colonia
              //  dirección fiscal
              calle_fiscal.value = respuesta.data[13]; // Nombre de la vialidad (fiscal)
              numero_ext_fiscal.value = respuesta.data[14]; // Número exterior fiscal
              numero_int_fiscal.value = respuesta.data[15]; // Número interior fiscal
              cp_fiscal.value = respuesta.data[16]; // Código postal fiscal
              municipio_fiscal.value = respuesta.data[10]; // Municipio fiscal
              estado_fiscal.value = respuesta.data[9]; // Estado fiscal
              ciudad_fiscal.value = respuesta.data[11]; // Colonia fiscal
              regimen_fiscal.value = respuesta.data[21];

              // Extraer las últimas 11 letras de `respuesta.data[11]`
              let textoCompleto = respuesta.data[21];
              let ultimasLetras = textoCompleto.slice(-11); // Extraer últimas 11 letras

              // Buscar en el select cuál es la opción más parecida
              let selectElement = document.getElementById("regimen_fiscal"); // Asegúrate de que este ID sea correcto

              let opciones = selectElement.options;
              let opcionParecida = null;

              // Comparar cada opción del select con `ultimasLetras`
              for (let i = 0; i < opciones.length; i++) {
                if (opciones[i].value.includes(ultimasLetras)) {
                  opcionParecida = opciones[i];
                  break; // Salir del bucle si se encuentra una coincidencia
                }
              }

              // Si se encuentra una opción parecida, seleccionarla
              if (opcionParecida) {
                console.log(opcionParecida.value);
                selectElement.value = opcionParecida.value;
              } else {
                console.warn("No se encontró una opción parecida.");
              }
              console.log(respuesta.data);
            } else {
              alertify.error("El documento escaneado no es el correcto");
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      //CURP
      if (tipo_dato == 2) {
        var datos = qrCodeMessage.split("|");

        console.log(datos.length);
        if (datos.length == 10) {
          var fecha_nacimiento2 = datos[6].split("/");
          curp.value = datos[0]; // CURP
          genero.value = datos[5]; //Genero
          // console.log(datos[5]);
          apellidopat.value = datos[2]; // Apellido Paterno
          apellidomat.value = datos[3]; // Apellido Materno
          nombre.value = datos[4]; // Nombre
          dia_nacimiento.value =
            fecha_nacimiento2[2] +
            "-" +
            fecha_nacimiento2[1] +
            "-" +
            fecha_nacimiento2[0]; // Fecha de Nacimiento
          estado_nacimiento.value = datos[7]; // Estado de Nacimiento
          console.log(datos);
        } else {
          alertify.error("El documento escaneado no es el correcto");
        }
      } else {
        console.log(qrCodeMessage);
        //acta de nacimiento
        var words = qrCodeMessage.split(",");
        if (words.length === 17) {
          console.log(words);
          console.log(words[1].split(":")[1]); //MUNICIPIO
          var meses = [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
          ];
          var num_mes;
          for (var i = 0; i < meses.length; i++) {
            if (meses[i] == words[12].split(":")[1]) {
              num_mes = i;
              break;
            }
          }
          municipio.value = words[1].split(":")[1];
          municipio_fiscal.value = words[1].split(":")[1];
          dia_nacimiento.value =
            words[11].split(":")[1] +
            "-" +
            (num_mes + 1) +
            "-" +
            words[13].split(":")[1];
          apellidopat.value = words[8].split(":")[1];
          apellidomat.value = words[9].split(":")[1];
          nombre.value = words[10].split(":")[1];
          curp.value = words[15].split(":")[1];
        } else {
          alertify.error("El documento escaneado no es el correcto");
        }
      }
    }
    contenedor_pag.style.opacity = "1";
    contenedor_pag.style.pointerEvents = "all";
    ventana_flotante.style.display = "none";
    repeticion = 1;
    html5QrcodeScanner
      .clear()
      .then((_) => {})
      .catch((error) => {
        alertify.error("No pudimos apagar la camara reinicie la pagina");
      });
  }
}

function cerrar_ventana_videoOCR() {
  contenedor_pag.style.opacity = "1";
  contenedor_pag.style.pointerEvents = "all";
  ventana_ocr.style.display = "none";
}
function onScanError(errorMessage) {
  //handle scan error
}
//hacer nueva istancia de html5QrcodeScannerb para poder iniciar el escaner
var html5QrcodeScanner;
const buttonOCR = document.getElementById("buttonOCR");
function abrir_video(valor) {
  cerrar_ventana_videoOCR();
  repeticion = 0;
  contenedor_pag.style.opacity = "0.4";
  ventana_flotante.style.display = "block";
  contenedor_pag.style.pointerEvents = "none";
  tipo_dato = valor;
  html5QrcodeScanner = new Html5QrcodeScanner("reader", {
    fps: 10,
    qrbox: 250,
  });
  html5QrcodeScanner.render(onScanSuccess, onScanError);
}
window.addEventListener("resize", function () {
  if (valor_boton === "moral") {
    title_escanea.style.transform = "";
    if (window.innerHeight <= 848 && window.innerWidth <= 850) {
      title_escanea.style.transform = "translate( 50%,400%) ";
    } else if (window.innerHeight >= 848 && window.innerWidth <= 850) {
      title_escanea.style.transform = "translate( 50%,300%) ";
    } else {
      title_escanea.style.transform = "translate( 50%,100%) ";
    }
  }
});
function tipo_de_persona(valor) {
  valor_boton = valor;
  if (valor === "moral") {
    rfc.maxLength = "12";

    title_escanea.style.transform = "";
    if (window.innerHeight <= 848 && window.innerWidth <= 850) {
      title_escanea.style.transform = "translate( 50%,500%) ";
    } else if (window.innerHeight >= 848 && window.innerWidth <= 850) {
      title_escanea.style.transform = "translate( 50%,500%) ";
    } else {
      title_escanea.style.transform = "translate( 50%,150%) ";
    }
    for (let index = 0; index < datos_escanear_moral.length; index++) {
      var element = datos_escanear_moral[index];
      element.style.visibility = "visible";
    }
    for (let index = 0; index < datos_escanear.length; index++) {
      var element = datos_escanear[index];
      element.style.visibility = "hidden";
    }
    esconder_ver_parametros("none");

    nombre.placeholder = "Denominación Social";
    curp.placeholder = "C.U.D";
  } else {
    title_escanea.style.transform = "translate( 50%,-100%) ";
    rfc.maxLength = "13";

    for (let index = 0; index < datos_escanear_moral.length; index++) {
      var element = datos_escanear_moral[index];
      element.style.visibility = "hidden";
    }
    for (let index = 0; index < datos_escanear.length; index++) {
      var element = datos_escanear[index];
      element.style.visibility = "visible";
    }
    esconder_ver_parametros("grid");
    nombre.placeholder = "Nombre (s)";
    curp.placeholder = "CURP";

    rfc.maxlength = "13";
  }
  var input = document.querySelectorAll('input:not([type="button"])');
  for (let index = 0; index < input.length; index++) {
    const element = input[index];
    element.value = "";
    if (element.id == "btn_enviar") {
      element.value = "Enviar";
    }
  }
}
document
  .getElementById("copy_direccion")
  .addEventListener("click", async function (evento) {
    evento.preventDefault();

    // Copia valores directamente
    calle_fiscal.value = calle.value;
    numero_ext_fiscal.value = numero_ext.value;
    numero_int_fiscal.value = numero_interior.value;
    manzana_fiscal.value = manzana.value;
    lote_fiscal.value = lote.value;
    cp_fiscal.value = codigo_postal.value;
    municipio_fiscal.value = municipio.value;
    estado_fiscal.value = estado.value;
    ciudad_fiscal.value = ciudad.value;
    pais_fiscal.value = pais.value;

    try {
      // Espera a que las colonias se carguen
      await buscarCodigoYColonias("_fiscal");

      // Busca la colonia en las opciones y selecciónala
      const selectColoniaFiscal = document.getElementById("colonia_fiscal");
      const coloniaValue = colonia.value;

      // Busca si la colonia ya está en las opciones
      let opcionEncontrada = false;
      for (let opcion of selectColoniaFiscal.options) {
        if (opcion.value === coloniaValue) {
          opcionEncontrada = true;
          opcion.selected = true; // Selecciona la opción existente
          break;
        }
      }

      // Si no existe, agrégala como una nueva opción y selecciona
      if (!opcionEncontrada) {
        const nuevaOpcion = document.createElement("option");
        nuevaOpcion.value = coloniaValue;
        nuevaOpcion.text = coloniaValue;
        selectColoniaFiscal.appendChild(nuevaOpcion);
        nuevaOpcion.selected = true;
      }
    } catch (error) {
      console.error("Error al buscar colonias:", error);
    }
  });

function esconder_ver_parametros(tipo) {
  mes_dia_text.style.display = `${tipo}`;
  mes_dia.style.display = `${tipo}`;
  AutoridadEmisora2.style.display = `${tipo}`;
  apellidomat.style.display = `${tipo}`;
  apellidopat.style.display = `${tipo}`;
  ocupacion.style.display = `${tipo}`;
  alias.style.display = `${tipo}`;
  genero.style.display = `${tipo}`;
  doc_id.style.display = `${tipo}`;
  noidentificacion.style.display = `${tipo}`;
  autoridad_emisora.style.display = `${tipo}`;
  telefono_movil.style.display = `${tipo}`;
  telefono.style.display = `${tipo}`;
  telefono_oficina.style.display = `${tipo}`;
  civil.style.display = `${tipo}`;
  rfc_Curp.style.display = `${tipo}`;
  identificacion.style.display = `${tipo}`;
}
function convertirMayusculas(input) {
  input.value = input.value.toUpperCase();
}
function muestraMas() {
  var var1 = document.getElementById("civil").value;
  var var2 = document.getElementById("regimen");
  var var4 = document.getElementById("regimenText");
  var var3 = document.getElementById("Plus_Conyugue");
  var conyugalFields = document.getElementsByClassName("datos_conyugal");

  if (var1 == "Casado") {
    var2.style.display = "block";
    var3.style.display = "block";
    var4.style.display = "block";
    for (var i = 0; i < conyugalFields.length; i++) {
      conyugalFields[i].setAttribute("required", true);
      conyugalFields[i].classList.add("required");
    }
  } else {
    var2.style.display = "none";
    var3.style.display = "none";
    var4.style.display = "none";
    for (var i = 0; i < conyugalFields.length; i++) {
      conyugalFields[i].removeAttribute("required");
      conyugalFields[i].classList.remove("required");
    }
  }
}
window.buscarCodigoYColonias = buscarCodigoYColonias;
function buscarCodigoYColonias(prefijo = "") {
  return new Promise((resolve, reject) => {
    var cpField = document.getElementById("cp" + prefijo).value;
    var municipioField = document.getElementById("municipio" + prefijo);
    var estadoField = document.getElementById("estado" + prefijo);
    var ciudadField = document.getElementById("ciudad" + prefijo);
    var selectColonia = document.getElementById("colonia" + prefijo);
    selectColonia.innerHTML = ""; // Limpia el campo de selección

    // Crear una instancia de XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Configurar la solicitud
    xhr.open("POST", "buscar_codigo_postal.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Definir lo que sucede en la carga de la respuesta
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        try {
          // La solicitud fue exitosa
          var respuesta = JSON.parse(xhr.responseText);

          // Actualizar los campos con la información recibida
          municipioField.value = respuesta.municipio;
          estadoField.value = respuesta.estado;
          ciudadField.value = respuesta.ciudad;

          selectColonia.innerHTML = ""; // Limpia el campo de selección

          if (respuesta.colonias.length > 0) {
            for (var i = 0; i < respuesta.colonias.length; i++) {
              var option = document.createElement("option");
              option.value = respuesta.colonias[i];
              option.text = respuesta.colonias[i];
              selectColonia.appendChild(option);
            }
          }

          resolve(); // Indica que terminó correctamente
        } catch (error) {
          reject(error); // Error en el parseo de JSON
        }
      } else {
        reject("Error en la solicitud"); // Error en la respuesta
      }
    };

    // Manejar errores de red
    xhr.onerror = function () {
      reject("Error de red");
    };

    // Enviar la solicitud con el código postal
    xhr.send("cp=" + cpField);
  });
}

function scannerTranslator() {
  const traducciones = [
    // Html5QrcodeStrings
    {
      original:
        "QR code parse error, error = R: No MultiFormat Readers were able to detect the code.",
      traduccion: "Error al escanear el Qr",
    },
    {
      original: "QR code parse error, error =",
      traduccion: "Error al analizar el código QR, error =",
    },
    {
      original: "Error getting userMedia, error =",
      traduccion: "Error al obtener userMedia, error =",
    },
    {
      original:
        "The device doesn't support navigator.mediaDevices , only supported cameraIdOrConfig in this case is deviceId parameter (string).",
      traduccion:
        "El dispositivo no admite navigator.mediaDevices, en este caso sólo se admite cameraIdOrConfig como parámetro deviceId (cadena).",
    },
    {
      original: "Camera streaming not supported by the browser.",
      traduccion: "El navegador no admite la transmisión de la cámara.",
    },
    {
      original: "Unable to query supported devices, unknown error.",
      traduccion:
        "No se puede consultar los dispositivos compatibles, error desconocido.",
    },
    {
      original:
        "Camera access is only supported in secure context like https or localhost.",
      traduccion:
        "El acceso a la cámara sólo es compatible en un contexto seguro como https o localhost.",
    },
    { original: "Scanner paused", traduccion: "Escáner en pausa" },

    // Html5QrcodeScannerStrings
    {
      original: "NotAllowedError : Permission denied",
      traduccion: "Permiso denegado",
    },
    { original: "Scanning", traduccion: "Escaneando" },
    { original: "Idle", traduccion: "Inactivo" },
    { original: "Error", traduccion: "Error" },
    { original: "Permission", traduccion: "Permiso" },
    { original: "No Cameras", traduccion: "Sin cámaras" },
    { original: "Last Match:", traduccion: "Última coincidencia:" },
    { original: "Code Scanner", traduccion: "Escáner de código" },
    {
      original: "Request Camera Permissions",
      traduccion: "Solicitar permisos de cámara",
    },
    {
      original: "Requesting camera permissions...",
      traduccion: "Solicitando permisos de cámara...",
    },
    {
      original: "No camera found",
      traduccion: "No se encontró ninguna cámara",
    },
    { original: "Stop Scanning", traduccion: "Detener escaneo" },
    { original: "Start Scanning", traduccion: "Iniciar escaneo" },
    { original: "Switch On Torch", traduccion: "Encender linterna" },
    { original: "Switch Off Torch", traduccion: "Apagar linterna" },
    {
      original: "Failed to turn on torch",
      traduccion: "Error al encender la linterna",
    },
    {
      original: "Failed to turn off torch",
      traduccion: "Error al apagar la linterna",
    },
    { original: "Launching Camera...", traduccion: "Iniciando cámara..." },
    {
      original: "Scan an Image File",
      traduccion: "Escanear un archivo de imagen",
    },
    {
      original: "Scan using camera directly",
      traduccion: "Escanear usando la cámara directamente",
    },
    { original: "Select Camera", traduccion: "Seleccionar cámara" },
    { original: "Choose Image", traduccion: "Elegir imagen" },
    { original: "Choose Another", traduccion: "Elegir otra" },
    { original: "No image choosen", traduccion: "Ninguna imagen seleccionada" },
    { original: "Anonymous Camera", traduccion: "Cámara anónima" },
    {
      original: "Or drop an image to scan",
      traduccion: "O arrastra una imagen para escanear",
    },
    {
      original: "Or drop an image to scan (other files not supported)",
      traduccion:
        "O arrastra una imagen para escanear (otros archivos no soportados)",
    },
    { original: "zoom", traduccion: "zoom" },
    { original: "Loading image...", traduccion: "Cargando imagen..." },
    { original: "Camera based scan", traduccion: "Escaneo basado en cámara" },
    { original: "Fule based scan", traduccion: "Escaneo basado en archivo" },

    // LibraryInfoStrings
    { original: "Powered by ", traduccion: "Desarrollado por " },
    { original: "Report issues", traduccion: "Informar de problemas" },

    // Others
    {
      original: "NotAllowedError: Permission denied",
      traduccion: "Permiso denegado para acceder a la cámara",
    },
  ];

  // Función para traducir un texto
  function traducirTexto(texto) {
    const traduccion = traducciones.find((t) => t.original === texto);
    return traduccion ? traduccion.traduccion : texto;
  }

  // Función para traducir los nodos de texto
  function traducirNodosDeTexto(nodo) {
    if (nodo.nodeType === Node.TEXT_NODE) {
      nodo.textContent = traducirTexto(nodo.textContent.trim());
    } else {
      for (let i = 0; i < nodo.childNodes.length; i++) {
        traducirNodosDeTexto(nodo.childNodes[i]);
      }
    }
  }

  // Crear el MutationObserver
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((nodo) => {
          traducirNodosDeTexto(nodo);
        });
      }
    });
  });

  // Configurar y ejecutar el observer
  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);

  // Traducir el contenido inicial
  traducirNodosDeTexto(document.body);
}

document.addEventListener("DOMContentLoaded", function () {
  // Utilizando la función scannerTranslator
  scannerTranslator(document.querySelector("#qr-reader"));
});
document.getElementById("mes_dia").addEventListener("change", function () {
  let dia_mes = document.getElementById("mes_dia").value;

  var date = new Date(dia_mes + "-1");
  var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  console.log(ultimoDia.getDate());
  document.getElementById("dia_escondido").value =
    dia_mes + "-" + ultimoDia.getDate();
});
