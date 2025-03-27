const video = document.getElementById("webcam");
const liveView = document.getElementById("liveView");
let demosSection = document.getElementById("demos");
let tarjeta_ocr_reverso = document.getElementById("tarjeta_ocr_reverso");
let enableWebcamButton = document.getElementById("webcamButton");
const imagen_ine = document.getElementById("img_Ine");

var ani_Post = document.getElementById("ani_Post");
var ani_Post2 = document.getElementById("ani_Post2");
var ani_Post3 = document.getElementById("ani_Post3");
var title_INE = document.getElementById("title_INE");

var manualUso_Buttom2=document.getElementById("manualUso_Buttom");
var opciones_menucam = document.getElementById("opciones");
var loadAti2 = document.getElementById("carga_Ati");
let isRunning = false;

var canvas_dos;
var context_dos;
let stop_capatacion_video;
// cameraViewTitle.style.display ="none";

// Agrega eventos al video
video.addEventListener("play", function () {
  setInterval(capturar_frame, 100);
});
video.addEventListener("pause", function () {
  clearInterval(stop_capatacion_video);
});
video.addEventListener("ended", function () {
  clearInterval(intervaloCaptura);
});

let resultado_enfoque = document.getElementById("status");
let stream_g;
let video_en_curso = false;

// Habilita la cámara web
function enableCam(event) {
  canvas_dos = document.getElementById("canvas2");
  context_dos = canvas_dos.getContext("2d");
  if (!video_en_curso) {
    // Solo continúa si el COCO-SSD ha terminado de cargarse.
    if (!model) {
      alert("Espere unos momentos estamos preparando todo para su escaneo");
      return;
    }

    enableWebcamButton.textContent = "Detener";
    const selectOpciones = document.getElementById("opciones");
    const deviceIdSeleccionado = selectOpciones.value;

    video.style.display = "block";
    imagen_ine.style.display = "none";

    const constraints = {
      video: {
        deviceId: deviceIdSeleccionado
          ? { exact: deviceIdSeleccionado }
          : undefined,
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        const video = document.getElementById("webcam"); // Asegúrate de que tengas un elemento <video> en tu HTML con id="video"
        video.srcObject = stream;
        video.addEventListener("loadeddata", predictWebcam);
        video.addEventListener(
          "canplay",
          function (ev) {
            if (!streaming) {
              height = video.videoHeight / (video.videoWidth / width);

              if (isNaN(height)) {
                height = width / (4 / 3);
              }

              canvas_dos.setAttribute("width", width);
              canvas_dos.setAttribute("height", height);
              streaming = true; // Marca que la cámara ha comenzado a funcionar

              video.removeAttribute("controls");
            }
          },
          false
        );
        video.play();
        stream_g = stream;
        video_en_curso = true;
        // console.log(video_en_curso);
      })
      .catch(function (error) {
       // console.error("Error al iniciar la cámara:", error);
      });
  } else {
    enableWebcamButton.textContent = "comenzar";

    video_en_curso = false;
    if (stream_g) {
      stream_g.getVideoTracks().forEach((track) => {
        track.enabled = false;
        track.stop();
      });
    }
    // console.log(video_en_curso);
  }
}

// Parámetros para getUserMedia
const constraints = {
  video: true,
};

var contenedor_pag = document.getElementById("pagina");
var ventana_flotante = document.getElementById("ventana_popul");
var ventana_ocr = document.getElementById("ventana_ocr");

// Cierra la ventana de video OCR
function cerrar_ventana_videoOCR() {
  isRunning = true;
  manualUso_Buttom2.style.transform="translateX(-0px)";
  title_INE.textContent = "Escanea la parte de enfrente";
  if (stream_g) {
    stream_g.getVideoTracks().forEach((track) => {
      track.enabled = false;
      track.stop();
    });
  }
  enableWebcamButton.textContent = "Comenzar";
  video_en_curso = false;
  repeticion_captura_OCR = 0;
  contenedor_pag.style.opacity = "1";
  contenedor_pag.style.pointerEvents = "all";
  ventana_ocr.style.display = "none";
  repeticion_captura_OCR = 0;
        demosSection.style.display = "block";
        tarjeta_ocr_reverso.style.display = "none";
        enableWebcamButton.textContent = "Comenzar";
        video_en_curso = false;
  
}

// Abre el video OCR
function abrir_videoOCR() {
  isRunning=false;
  cerrar_ventana_video();
  permiso_camara();
  manualUso_Buttom2.style.transform="translateX(-150px)";
  contenedor_pag.style.opacity = "0.4";
  ventana_ocr.style.display = "block";
  contenedor_pag.style.pointerEvents = "none";
  ani_Post.style.animation = "OCR-Aparicion 0.5s ease-out";
  ani_Post2.style.animation = "OCR-Aparicion2 0.8s ease";
  ani_Post3.style.animation = "OCR-Aparicion3 0.65s ease";
  video.style.display = "none";
  imagen_ine.style.display = "block";
}

// Cierra la ventana del video
function cerrar_ventana_video() {
  
  manualUso_Buttom2.style.transform="translateX(0px)";
  contenedor_pag.style.opacity = "1";
  contenedor_pag.style.pointerEvents = "all";
  ventana_flotante.style.display = "none";
}

// Agrega evento al botón de habilitar cámara
enableWebcamButton.addEventListener("click", function () {
  enableCam();
});

// Permiso para usar la cámara
function permiso_camara(event) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      // Detener los tracks para liberar la cámara después de obtener la lista de dispositivos
      stream.getTracks().forEach((track) => track.stop());

      // Enumerar los dispositivos
      navigator.mediaDevices
        .enumerateDevices()
        .then(function (respuesta) {
          const videos = respuesta.filter(
            (dispositivo) => dispositivo.kind === "videoinput"
          );
          let selectOpciones = opciones_menucam;
          // Lista de opciones para mostrar los videos
          if (selectOpciones.children.length == 0) {
            for (let i = 0; i < videos.length; i++) {
              const opcionNueva = document.createElement("option");
              opcionNueva.value = videos[i].deviceId;
              opcionNueva.text = videos[i].label;
              selectOpciones.appendChild(opcionNueva);
            }
          }
        })
        .catch(function (error) {
        //  console.error("Error al enumerar los dispositivos:", error);
        });
    })
    .catch(function (error) {
    //  console.error("Error al obtener el stream de video:", error);
    });
}

// Modelo simulado cargado
var model = true;
demosSection.classList.remove("invisible");

// Almacena el modelo resultante
var model = undefined;

// Antes de que podamos usar la clase COCO-SSD debemos esperar a que termine
// cargando. Los modelos de aprendizaje automático pueden ser grandes y tardar un momento
// para obtener todo lo necesario para ejecutar.
// Nota: cocoSsd es un objeto externo cargado desde nuestro index.html
// importación de etiquetas de script, así que ignore cualquier advertencia en Glitch.

// Carga el modelo COCO-SSD
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  demosSection.classList.remove("invisible");
});

var children = [];
// console.log(children);

// Recorta el canvas
function trimCanvas(c) {
  var ctx = c.getContext("2d"),
    copy = document.createElement("canvas").getContext("2d"),
    pixels = ctx.getImageData(0, 0, c.width, c.height),
    l = pixels.data.length,
    i,
    bound = {
      top: null,
      left: null,
      right: null,
      bottom: null,
    },
    x,
    y;

  for (i = 0; i < l; i += 4) {
    if (pixels.data[i + 3] !== 0) {
      x = (i / 4) % c.width;
      y = ~~(i / 4 / c.width);

      if (bound.top === null) {
        bound.top = y;
      }

      if (bound.left === null) {
        bound.left = x;
      } else if (x < bound.left) {
        bound.left = x;
      }

      if (bound.right === null) {
        bound.right = x;
      } else if (bound.right < x) {
        bound.right = x;
      }

      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }

  // Calcular el alto y ancho del contenido
  var trimHeight = bound.bottom - bound.top,
    trimWidth = bound.right - bound.left,
    trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);

  // Return trimmed canvas
  return copy.canvas;
}

// Función para esperar en milisegundos
async function sleep(milliseconds) {
  return await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

let presicion_ocr = 0.65;  /*--Tunned--6--ò--6.5*/
let repeticion_captura_OCR = 0;

// Predice usando la cámara web
function predictWebcam() {
  var targetObj = "book"; // El objeto que deseas detectar
  model.detect(video).then(async function (predictions) {
    // Elimina cualquier resaltado del fotograma anterior.
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);

    // Recorre las predicciones y dibuja las que tengan una puntuación de confianza alta.

    for (let n = 0; n < predictions.length; n++) {
      if (predictions[n].score > presicion_ocr) {
        if (predictions[n].class == targetObj && estatico_o_no == true) {
          let dx = predictions[n].bbox[0];
          let dy = predictions[n].bbox[1];
          let dw = predictions[n].bbox[2];
          let dh = predictions[n].bbox[3];

          // Crea un nuevo párrafo para mostrar la información.
          const p = document.createElement("p");
          p.style =
            "margin-left: " +
            predictions[n].bbox[0] +
            "px; margin-top: " +
            (predictions[n].bbox[1] - 10) +
            "px; width: " +
            (predictions[n].bbox[2] - 10) +
            "px; top: 0; left: 0;";

          // Resaltador
          const highlighter = document.createElement("div");
          highlighter.setAttribute("class", "highlighter");
          highlighter.style =
            "left: " +
            predictions[n].bbox[0] +
            "%; top: " +
            predictions[n].bbox[1] +
            "px; width: " +
            predictions[n].bbox[2] +
            "px; height: " +
            predictions[n].bbox[3] +
            "px;";

          liveView.appendChild(highlighter);
          liveView.appendChild(p);
          children.push(highlighter);
          children.push(p);

          // Obtener los elementos de canvas y video
          let canvas = document.getElementById("canva");
          let ctx = canvas.getContext("2d");

          canvas.width = dw;
          canvas.height = dh;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, dx, dy, dw, dh, 0, 0, dw, dh);
          const src = cv.imread(canvas);
          const gray = new cv.Mat();
          cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
          const laplacian = new cv.Mat();
          cv.Laplacian(gray, laplacian, cv.CV_64F);
          const mean = new cv.Mat();
          const stddev = new cv.Mat();
          cv.meanStdDev(laplacian, mean, stddev);

          const variance = Math.pow(stddev.data64F[0], 2);
          resultado_enfoque.textContent =
            variance < 135 ? "Imagen desenfocada" : "Imagen enfocada"; /*--Tunned--130--*/

          src.delete();
          gray.delete();
          laplacian.delete();
          mean.delete();
          stddev.delete();

          // Realiza un procesamiento adicional si es necesario (como recortar y modificar la imagen)
          var trimmedCanvas = trimCanvas(canvas);

          // Obtiene la URL de la imagen procesada
          let image_data_url = trimmedCanvas.toDataURL("image/png");
          if (image_data_url && variance > 135) {  /*--Tunned--130--*/
            repeticion_captura_OCR++;

            if ((await repeticion_captura_OCR) == 1) {
              // demosSection.style.display = "none";
              // tarjeta_ocr_reverso.style.display = "flex";
              // tarjeta_ocr_reverso.style.animation =
              //   "reverso 2s ease-in-out forwards";
              if (stream_g) {
                stream_g
                  .getVideoTracks()
                  .forEach((track) => (track.enabled = false));
                // console.log("Cámara pausada");
              } else {
                // console.log("No hay cámara activa");
              }

              // Verifica de la correcta extraccion de datos dependiendo de que documente se escaneo
            }
            // Luego, envía la imagen procesada al servidor con Axios
            canvas.toBlob(async (blob) => {
              const formData = new FormData();
              formData.append("file", blob, "canvas-image.jpg");
              
              await captacion_ocr(formData, repeticion_captura_OCR);
            }, "image/jpeg");
            if (repeticion_captura_OCR == 2) {
              title_INE.textContent = "Procesando informacion";
              if (stream_g) {
                stream_g
                  .getVideoTracks()
                  .forEach((track) => (track.enabled = false));
                // console.log("Cámara pausada");
              } else {
                // console.log("No hay cámara activa");
              }
            }
          } else {
            await sleep(1000);
          }
        }
      }
    }
    // Llama a la función nuevamente para seguir prediciendo.
    if (!isRunning) {
      window.requestAnimationFrame(predictWebcam);
    }else{
console.error("dsjkjsd");
    }
   
  });
}

// Campos que puede extraer el OCR de la imagen
var all_campos_ocr = {
  fecha_nacimiento: "Fecha de nacimiento",
  sexo: "Sexo",
  nombre: "Nombre",
  apellido_p: "Apellido Paterno",
  apellido_m: "Apellido Materno",
  clave_lector: "ClaveLector",
  curp: "Curp",
  vigencia: "Vigencia",
  ocr_api: "OCR",
  id_mex: "IDMEX",
  codigo_ps: "Codigo Postal",
};
function convertirAMayusculas(obj) {
  if (typeof obj === 'object' && obj !== null) {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].toUpperCase();
      } else if (typeof obj[key] === 'object') {
        convertirAMayusculas(obj[key]); // Llamada recursiva si el valor es un objeto
      }
    }
  }
}
// Captura la imagen y extrae los datos con OCR
async function captacion_ocr(formData, repeticion) {
  
console.log(""+new Date().getMinutes()+":"+new Date().getSeconds());
  // Procesa la imagen y extrae los campos que se pueden leer con OCR
 // console.error("hola " + repeticion);
  if (repeticion == 1) {
    ventana_ocr.style.display = "none";
    loadAti2.style.visibility = "visible";
    await axios
      .post("src/processing.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (respuesta) {
        console.log(respuesta.data);
        console.log(""+new Date().getMinutes()+":"+new Date().getSeconds());
        // Acceder a la propiedad candidates, luego al primer candidato
        const candidato = respuesta.data.candidates[0];

        // Acceder a las partes dentro del objeto 'content'
        const partes = candidato.content.parts;

        // El texto está en la primera parte
        const textoJSON = partes[0].text;

        // Ahora puedes parsear el texto, que es un string JSON
        let textoParseado = JSON.parse(textoJSON);
        // Puedes acceder a los datos dentro del texto parseado
     
       
convertirAMayusculas(textoParseado);
        console.log(textoParseado);
        textoParseado.fecha_de_nacimiento != null
          ? (all_campos_ocr.fecha_nacimiento = true)
          : "Fecha de nacimiento";
        textoParseado.sexo != null ? (all_campos_ocr.sexo = true) : "sexo";
        textoParseado.nombre != null
          ? (all_campos_ocr.nombre = true)
          : "nombre";
        textoParseado.apellido_paterno != null
          ? (all_campos_ocr.apellido_p = true)
          : "Apellido Paterno";
        textoParseado.apellido_materno != null
          ? (all_campos_ocr.apellido_m = true)
          : "Apellido Materno";
        textoParseado.clave_del_lector != null
          ? (all_campos_ocr.clave_lector = true)
          : "ClaveLector";
        textoParseado.curp != null ? (all_campos_ocr.curp = true) : "Curp";
        textoParseado.vigencia != null
          ? (all_campos_ocr.vigencia = true)
          : "Vigencia";
        textoParseado.domicilio.codigo_postal != null
          ? (all_campos_ocr.codigo_ps = true)
          : "Codigo Postal";
        loadAti2.style.visibility = "hidden";
        console.log(verificar_datos());
       if( verificar_datos()==false){
        escribir_datos(textoParseado);
        $('#pais_nacimeinto_lista').val('Mexico (Estados Unidos Mexicanos)').trigger('change');
        $('#pais_1').val('Mexico (Estados Unidos Mexicanos)').trigger('change');
        $('#nacionalidad_input').val('Mexicana').trigger('change');
        buscarCodigoYColonias2();
        }else{
          Swal.fire({
            title: "",
            text: "¿Deseas sobre escribir posibles datos existentes?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, claro",
            cancelButtonText: "No, gracias",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                "¡Listo!",
                "Se han remplazado los datos existentes",
                "success"
              );
                     
        escribir_datos(textoParseado);   
           
        buscarCodigoYColonias2();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                "",
                "Se llenaran solo los datos que actualmente estan en blanco",
                "info"
              );
              
            document.getElementById("e_nac").value = document.getElementById("e_nac").value|| textoParseado.
            estado_de_nacimiento;
            document.getElementById("nombre").value =
              document.getElementById("nombre").value || textoParseado.nombre;
            document.getElementById("apellidopat").value =
              document.getElementById("apellidopat").value ||
              textoParseado.apellido_paterno;
            document.getElementById("apellidomat").value =
              document.getElementById("apellidomat").value ||
              textoParseado.apellido_materno;
            document.getElementById("genero").value =
              document.getElementById("genero").value ||
              (textoParseado.sexo == "M" ? "MUJER" : "HOMBRE");
            document.getElementById("dia").value =
              document.getElementById("dia").value ||
              textoParseado.fecha_de_nacimiento;
            document.getElementById("calle").value =
              document.getElementById("calle").value ||
              textoParseado.domicilio.calle;
            document.getElementById("colonia").value =
              document.getElementById("colonia").value ||
              textoParseado.domicilio.colonia;
            document.getElementById("estado").value =
              document.getElementById("estado").value ||
              textoParseado.domicilio.estado;
            document.getElementById("lote").value =
              document.getElementById("lote").value ||
              textoParseado.domicilio.lote;
            document.getElementById("municipio").value =
              document.getElementById("municipio").value ||
              textoParseado.domicilio.municipio;
            document.getElementById("manzana").value =
              document.getElementById("manzana").value ||
              textoParseado.domicilio.mz;
            document.getElementById("int").value =
              document.getElementById("int").value ||
              textoParseado.domicilio.numero_interior;
            document.getElementById("ext").value =
              document.getElementById("ext").value ||
              textoParseado.domicilio.numero_exterior;
            document.getElementById("cp").value =
              document.getElementById("cp").value ||
              textoParseado.domicilio.codigo_postal;
            document.getElementById("curp").value =
              document.getElementById("curp").value || textoParseado.curp;
            document.getElementById("noidentificacion").value =
              document.getElementById("noidentificacion").value ||
              textoParseado.clave_del_lector;
            document.getElementById("mes_dia").value =
              document.getElementById("mes_dia").value ||
              textoParseado.vigencia + "-01";
              
        buscarCodigoYColonias2();
            }

          });
          $('#pais_nacimeinto_lista').val('Mexico (Estados Unidos Mexicanos)').trigger('change');
          $('#pais_1').val('Mexico (Estados Unidos Mexicanos)').trigger('change');
          $('#nacionalidad_input').val('Mexicana').trigger('change');
        }
        
        ventana_ocr.style.display = "block";
        demosSection.style.display = "none";
        tarjeta_ocr_reverso.style.display = "flex";
        tarjeta_ocr_reverso.style.animation = "reverso 2s ease-in-out forwards";
        if (stream_g) {
          stream_g.getVideoTracks().forEach((track) => (track.enabled = false));
          // console.log("Cámara pausada");
        } else {
          // console.log("No hay cámara activa");
        }
        
        console.log(""+new Date().getMinutes()+":"+new Date().getSeconds()+''+new Date().getMilliseconds());
      })
     
      // Maneja errores en la solicitud
      .catch(function (error) {
        
        loadAti2.style.visibility = "hidden";
       // console.log(error);
        cerrar_ventana_videoOCR();
        Swal.fire({
          title: "ERROR",
          text: `Por el momento no se puede usar esta funcion, espere de 15 a 30 min para intentarlo de nuevo`,
          icon: "error",
        });
        repeticion_captura_OCR = 0;
        demosSection.style.display = "block";
        tarjeta_ocr_reverso.style.display = "none";
        enableWebcamButton.textContent = "Comenzar";
        video_en_curso = false;

        // console.log(error);
      });
     
      
  } else {
    //console.error(repeticion);
    await axios
      .post("src/processing2.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (respuesta) {
        if (
          respuesta.data &&
          respuesta.data.candidates &&
          respuesta.data.candidates.length > 0
        ) {
          // Acceder a la propiedad candidates, luego al primer candidato
          const candidato = respuesta.data.candidates[0];

          // Acceder a las partes dentro del objeto 'content'
          const partes = candidato.content.parts;

          // El texto está en la primera parte
          const textoJSON = partes[0].text;

          // Ahora puedes parsear el texto, que es un string JSON
          const textoParseado = JSON.parse(textoJSON);
          // Puedes acceder a los datos dentro del texto parseado

          console.log(textoParseado);
         // console.log(textoParseado[0]);
          if (textoParseado.length > 0) {
            textoParseado[0].IDMEX != ""
              ? (all_campos_ocr.id_mex = true)
              : "IDMEX";
            textoParseado[0].ZCR != ""
              ? (all_campos_ocr.ocr_api = true)
              : "OCR";
            document.getElementById("ocr").value =
              textoParseado[0].ZCR.split("MEX")[0] != ""
                ? textoParseado[0].ZCR.split("MEX")[0] + "MEX"
                : "";
                let idmex_text=textoParseado[0].IDMEX.includes('idmex')?true: false;
            document.getElementById("idmex").value = idmex_text==true? textoParseado[0].IDMEX:
              "IDMEX" + textoParseado[0].IDMEX;
          } else {
            textoParseado.IDMEX != ""
              ? (all_campos_ocr.id_mex = true)
              : "IDMEX";
            textoParseado.ZCR != "" ? (all_campos_ocr.ocr_api = true) : "OCR";
            document.getElementById("ocr").value =
              textoParseado.ZCR.split("MEX")[0] != ""
                ? textoParseado.ZCR.split("MEX")[0] + "MEX"
                : "";
                let idmex_text=textoParseado[0].IDMEX.include('idmex')?true: false;
                document.getElementById("idmex").value = idmex_text==true? textoParseado[0].IDMEX:
                  "IDMEX" + textoParseado[0].IDMEX;
          }
          cerrar_ventana_videoOCR();

          let info = "";

          for (const key in all_campos_ocr) {
            if (all_campos_ocr[key] != true) {
              info += all_campos_ocr[key] + " ";
            }
          }
          // No se pudieron extraer ciertos datos del OCR y regresa un mensaje al
          // usuario sobre lo que no se extrajo
          Swal.fire({
            title: "Escaneo exitoso",
            text:
              "Verifique los datos antes de enviar " +
              (info !== ""
                ? ", Lo lamentamos estos campos no pudimos llenarlos: " + info
                : ""),
            icon: "success",
          });

          if (stream_g) {
            stream_g
              .getVideoTracks()
              .forEach((track) => (track.enabled = false));
            enableWebcamButton.textContent = "Comenzar";
            video_en_curso = false;
            // console.log("Cámara pausada");
          } else {
            // console.log("No hay cámara activa");
          }
          // facilidad en la que se puede captar la imagen
          presicion_ocr = 0.65; /*--Tunned--6--ò--65*/
        } else {
          // Acceder a la propiedad candidates, luego al primer candidato
          const candidato = respuesta.data.candidates;

          // Acceder a las partes dentro del objeto 'content'
          const partes = candidato.content.parts;

          // El texto está en la primera parte
          const textoJSON = partes[0].text;

          // Ahora puedes parsear el texto, que es un string JSON
          const textoParseado = JSON.parse(textoJSON);
          // Puedes acceder a los datos dentro del texto parseado

          console.log(textoParseado);
          //console.log(textoParseado[0]);
          if (textoParseado.length > 0) {
            textoParseado[0].IDMEX != ""
              ? (all_campos_ocr.id_mex = true)
              : "IDMEX";
            textoParseado[0].ZCR != ""
              ? (all_campos_ocr.ocr_api = true)
              : "OCR";
            document.getElementById("ocr").value =
              textoParseado[0].ZCR.split("MEX")[0] != ""
                ? textoParseado[0].ZCR.split("MEX")[0] + "MEX"
                : "";
            document.getElementById("idmex").value =
              "IDMEX" + textoParseado[0].IDMEX;
          } else {
            textoParseado.IDMEX != ""
              ? (all_campos_ocr.id_mex = true)
              : "IDMEX";
            textoParseado.ZCR != "" ? (all_campos_ocr.ocr_api = true) : "OCR";
            document.getElementById("ocr").value =
              textoParseado.ZCR.split("MEX")[0] != ""
                ? textoParseado.ZCR.split("MEX")[0] + "MEX"
                : "";
            document.getElementById("idmex").value =
              "IDMEX" + textoParseado.IDMEX;
          }
        }

        let info = "";

        for (const key in all_campos_ocr) {
          if (all_campos_ocr[key] != true) {
            info += all_campos_ocr[key] + " ";
          }
        }
        // No se pudieron extraer ciertos datos del OCR y regresa un mensaje al
        // usuario sobre lo que no se extrajo
        Swal.fire({
          title: "Escaneo exitoso",
          text:
            "Verifique los datos antes de enviar " +
            (info !== ""
              ? ", Lo lamentamos estos campos no pudimos llenarlos: " + info
              : ""),
          icon: "success",
        });

        if (stream_g) {
          stream_g.getVideoTracks().forEach((track) => (track.enabled = false));
          enableWebcamButton.textContent = "Comenzar";
          video_en_curso = false;
          // console.log("Cámara pausada");
        } else {
          // console.log("No hay cámara activa");
        }
        // facilidad en la que se puede captar la imagen
        presicion_ocr = 0.65; /*--Tunned--6--ò--65*/
      })
      .catch(function (error) {
        
        loadAti2.style.visibility = "hidden";
       console.log(error);
        cerrar_ventana_videoOCR();
        Swal.fire({
          title: "ERROR",
          text: `Por el momento no se puede usar esta funcion, espere de 15 a 30 min para intentarlo de nuevo`,
          icon: "error",
        });
        repeticion_captura_OCR = 0;
        demosSection.style.display = "block";
        tarjeta_ocr_reverso.style.display = "none";
        enableWebcamButton.textContent = "Comenzar";
        video_en_curso = false;
      });
  }
}

// Agrega evento al botón de comenzar parte trasera
document
  .getElementById("comenzar_parte_atras")
  .addEventListener("click", function (param) {
    title_INE.textContent = "Escanea la parte de atrás";
    demosSection.style.display = "block";
    tarjeta_ocr_reverso.style.display = "none";
    presicion_ocr = 0.65; /*--Tunned--6--ò--65*/
    if (stream_g) {
      stream_g.getVideoTracks().forEach((track) => (track.enabled = true)); // console.log("Cámara reanudada");
    } else {
      // console.log("No hay cámara activa para reanudar");
    }
  });

// Variables para almacenar imágenes y controlar el streaming
var imagen1 = null;
var imagen2 = null;
var width = 320;
var height = 0;
var streaming = false; // Asegúrate de que 'streaming' esté definida correctamente aquí.
var resembleControl;
var repeticion_dos;

// Captura el frame del video
function capturar_frame() {
  context_dos.drawImage(video, 0, 0, width, height);
  imagen1 = imagen2;
  imagen2 = canvas_dos.toDataURL("image/png");
  if (imagen1 != null) {
    resembleControl = resemble(imagen1)
      .compareTo(imagen2)
      .onComplete(al_completar);
  }
}

// Informa al usuario si la imagen es estática o no
let estatico_o_no = false;
let p_estatico = document.getElementById("estatico");
function al_completar(data) {
  if (data.misMatchPercentage != 0) {
    if (Math.ceil(data.misMatchPercentage) <= 25) { /*--Tunned--30--*/
      p_estatico.textContent = "Estatico";
      estatico_o_no = true;
    } else {
      p_estatico.textContent = "No estatico";
      estatico_o_no = false;
    }
  }
}
function buscarCodigoYColonias2(prefijo = "") {
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
    xhr.open("POST", "src/buscar_codigo_postal.php", true);
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
function verificar_datos(){
  let dato_encontrado=false;
  const datos_all = document.querySelectorAll("input:not([type='button']):not([type='submit']):not([type='reset'])");
  for (let index = 0; index < datos_all.length; index++) {
    const element = datos_all[index];
    if(element.value!==""){
       dato_encontrado=true;
    }
  }
  return dato_encontrado;
}
function escribir_datos(textoParseado) { 
  

  document.getElementById("e_nac").value = textoParseado.
  estado_de_nacimiento;
  document.getElementById("nombre").value = textoParseado.nombre;
  document.getElementById("apellidopat").value =
    textoParseado.apellido_paterno;
  document.getElementById("apellidomat").value =
    textoParseado.apellido_materno;
  document.getElementById("genero").value =
    textoParseado.sexo == "M" ? "MUJER" : "HOMBRE";
  document.getElementById("dia").value =
    textoParseado.fecha_de_nacimiento;
  document.getElementById("calle").value =
    textoParseado.domicilio.calle;
  document.getElementById("colonia").value =
    textoParseado.domicilio.colonia;
  document.getElementById("estado").value =
    textoParseado.domicilio.estado;
  document.getElementById("lote").value = textoParseado.domicilio.lote;
  document.getElementById("municipio").value =
    textoParseado.domicilio.municipio;
  document.getElementById("manzana").value = textoParseado.domicilio.mz;
  document.getElementById("int").value =
    textoParseado.domicilio.numero_interior;
  document.getElementById("ext").value =
    textoParseado.domicilio.numero_exterior;
  document.getElementById("cp").value =
    textoParseado.domicilio.codigo_postal;
    if(curp.readOnly === false){
      document.getElementById("curp").value = textoParseado.curp;
      verificar_persona_bd();
    }
    let e = document.getElementById("curp").value.substring(11, 13);
let estado_nacimientos = document.getElementById('e_nac');

switch (e) {
  case "AS":
    estado_nacimientos.value = "AGUASCALIENTES";
    break;
  case "BC":
    estado_nacimientos.value = "BAJA CALIFORNIA";
    break;
  case "BS":
    estado_nacimientos.value = "BAJA CALIFORNIA SUR";
    break;
  case "CC":
    estado_nacimientos.value = "CAMPECHE";
    break;
  case "CL":
    estado_nacimientos.value = "COAHUILA";
    break;
  case "CM":
    estado_nacimientos.value = "COLIMA";
    break;
  case "CS":
    estado_nacimientos.value = "CHIAPAS";
    break;
  case "CH":
    estado_nacimientos.value = "CHIHUAHUA";
    break;
  case "DF":
    estado_nacimientos.value = "CIUDAD DE MÉXICO";
    break;
  case "DG":
    estado_nacimientos.value = "DURANGO";
    break;
  case "GT":
    estado_nacimientos.value = "GUANAJUATO";
    break;
  case "GR":
    estado_nacimientos.value = "GUERRERO";
    break;
  case "HG":
    estado_nacimientos.value = "HIDALGO";
    break;
  case "JC":
    estado_nacimientos.value = "JALISCO";
    break;
  case "MC":
    estado_nacimientos.value = "MÉXICO";
    break;
  case "MN":
    estado_nacimientos.value = "MICHOACÁN";
    break;
  case "MS":
    estado_nacimientos.value = "MORELOS";
    break;
  case "NT":
    estado_nacimientos.value = "NAYARIT";
    break;
  case "NL":
    estado_nacimientos.value = "NUEVO LEÓN";
    break;
  case "OC":
    estado_nacimientos.value = "OAXACA";
    break;
  case "PL":
    estado_nacimientos.value = "PUEBLA";
    break;
  case "QT":
    estado_nacimientos.value = "QUERÉTARO";
    break;
  case "QR":
    estado_nacimientos.value = "QUINTANA ROO";
    break;
  case "SP":
    estado_nacimientos.value = "SAN LUIS POTOSÍ";
    break;
  case "SL":
    estado_nacimientos.value = "SINALOA";
    break;
  case "SR":
    estado_nacimientos.value = "SONORA";
    break;
  case "TC":
    estado_nacimientos.value = "TABASCO";
    break;
  case "TS":
    estado_nacimientos.value = "TAMAULIPAS";
    break;
  case "TL":
    estado_nacimientos.value = "TLAXCALA";
    break;
  case "VZ":
    estado_nacimientos.value = "VERACRUZ";
    break;
  case "YN":
    estado_nacimientos.value = "YUCATÁN";
    break;
  case "ZS":
    estado_nacimientos.value = "ZACATECAS";
    break;
  case "NE":
    estado_nacimientos.value = "EXTRANJERO";
    break;
  default:
    break;
}


  document.getElementById("noidentificacion").value =
    textoParseado.clave_del_lector;
  document.getElementById("mes_dia").value =
    textoParseado.vigencia + "-01";  }