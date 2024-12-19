
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

var opciones_menucam= document.getElementById("opciones");

var canvas_dos;
var context_dos;
let stop_capatacion_video;
// cameraViewTitle.style.display ="none";
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
// Enable the live webcam view and start classification.
function enableCam(event) {
  canvas_dos = document.getElementById("canvas2");
  context_dos = canvas_dos.getContext("2d");
  if (!video_en_curso) {
    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
      alert("Espere unos momentos estamos preparando todo para su escaneo");
      return;
    }

    // Hide the button once clicked.
    //event.target.classList.add('removed');
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

              // video.setAttribute('width', width);
              // video.setAttribute('height', height);
              canvas_dos.setAttribute("width", width);
              canvas_dos.setAttribute("height", height);
              streaming = true; // Marca que la cámara ha comenzado a funcionar
            }
          },
          false
        );
        video.play();
        stream_g=stream;
        video_en_curso = true;
        console.log(video_en_curso);
      })
      .catch(function (error) {
        
        console.error("Error al iniciar la cámara:", error);
      });
  } else {
    enableWebcamButton.textContent = "comenzar";
    video.pause();

    video_en_curso = false;
    console.log(video_en_curso);
  }
}
// getUsermedia parameters to force video but not audio.
const constraints = {
  video: true,
};
var contenedor_pag = document.getElementById("pagina");

var ventana_flotante = document.getElementById("ventana_popul");
var ventana_ocr = document.getElementById("ventana_ocr");
function cerrar_ventana_videoOCR() {
  stream_g.getVideoTracks().forEach(track => (track.enabled = false));
  enableWebcamButton.textContent = "Comenzar";
      video_en_curso=false;
  repeticion_captura_OCR=0;
  contenedor_pag.style.opacity = "1";
  contenedor_pag.style.pointerEvents = "all";
  ventana_ocr.style.display = "none";
}
function abrir_videoOCR() {
  cerrar_ventana_video();
  permiso_camara();
  contenedor_pag.style.opacity = "0.4";
  ventana_ocr.style.display = "block";
  contenedor_pag.style.pointerEvents = "none";
  ani_Post.style.animation = "OCR-Aparicion 0.5s ease-out";
  ani_Post2.style.animation = "OCR-Aparicion2 0.8s ease";
  ani_Post3.style.animation = "OCR-Aparicion3 0.65s ease";
  video.style.display = "none";
  imagen_ine.style.display = "block";
}
function cerrar_ventana_video() {
  contenedor_pag.style.opacity = "1";
  contenedor_pag.style.pointerEvents = "all";
  ventana_flotante.style.display = "none";
}
enableWebcamButton.addEventListener("click", function () {
  enableCam();
});
function permiso_camara(event) {
  // Activate the webcam stream.
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

        if(selectOpciones.children.length==0){
          for (let i = 0; i < videos.length; i++) {
            const opcionNueva = document.createElement("option");
            opcionNueva.value = videos[i].deviceId;
            opcionNueva.text = videos[i].label;
            selectOpciones.appendChild(opcionNueva);
          }
        }
        })
        .catch(function (error) {
          console.error("Error al enumerar los dispositivos:", error);
        });
    })
    .catch(function (error) {
      console.error("Error al obtener el stream de video:", error);
    });
}

// Pretend model has loaded so we can try out the webcam code.
var model = true;
demosSection.classList.remove("invisible");

// Store the resulting model in the global scope of our app.
var model = undefined;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Show demo section now model is ready to use.
  demosSection.classList.remove("invisible");
});

var children = [];
console.log(children);

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

  // Iterate over every pixel to find the highest
  // and where it ends on every axis ()
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

  // Calculate the height and width of the content
  var trimHeight = bound.bottom - bound.top,
    trimWidth = bound.right - bound.left,
    trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);

  // Return trimmed canvas
  return copy.canvas;
}

//function to wait in milliseconds
async function sleep(milliseconds) {
  return await new Promise((resolve) => setTimeout(resolve, milliseconds));
}
let presicion_ocr=0.85;
let repeticion_captura_OCR = 0;
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
            variance < 130 ? "Imagen desenfocada" : "Imagen enfocada";

          src.delete();
          gray.delete();
          laplacian.delete();
          mean.delete();
          stddev.delete();

          // Realiza un procesamiento adicional si es necesario (como recortar y modificar la imagen)
          var trimmedCanvas = trimCanvas(canvas);

          // Obtiene la URL de la imagen procesada
          let image_data_url = trimmedCanvas.toDataURL("image/png");
          if (image_data_url && variance > 130) {
            repeticion_captura_OCR++;
            if (await repeticion_captura_OCR == 3) {
              demosSection.style.display = "none";
              tarjeta_ocr_reverso.style.display = "flex";
              tarjeta_ocr_reverso.style.animation =
                "reverso 2s ease-in-out forwards";
                if (stream_g) {
                  stream_g.getVideoTracks().forEach(track => (track.enabled = false));
                  console.log("Cámara pausada");
                } else {
                  console.log("No hay cámara activa");
                }
         
            } else if ( await repeticion_captura_OCR == 6) {
              cerrar_ventana_videoOCR();

              let info = ""; 

              for (const key in all_campos_ocr) {
                  if (all_campos_ocr[key]!=true) {
                      info +=  all_campos_ocr[key]+" "; 
                  }
              }
              
              await Swal.fire({
                  title: "Escaneo exitoso",
                  text: "Verifique los datos antes de enviar " + (info !== "" ? ", Lo lamentamos estos campos no pudimos llenarlos: " + info : ""),
                  icon: "success",
                  
              });
              
              if (stream_g) {
                stream_g.getVideoTracks().forEach(track => (track.enabled = false));
                enableWebcamButton.textContent = "Comenzar";
      video_en_curso=false;
                console.log("Cámara pausada");
              } else {
                console.log("No hay cámara activa");
              }
              presicion_ocr=0.82;
            }
            // Luego, envía la imagen procesada al servidor con Axios
            canvas.toBlob(async (blob) => {
              const formData = new FormData();
              formData.append("attachment", blob, "canvas-image.jpg");
             await captacion_ocr(formData, repeticion_captura_OCR);
            }, "image/jpeg");
          } else {
            await sleep(1000);
          }
        }
      }
    }

    // Llama a la función nuevamente para seguir prediciendo.
    window.requestAnimationFrame(predictWebcam);
  });
}
var all_campos_ocr={
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
  // calle: "Calle",
  // no_exterior: "Numero Exterior",
  // num_interior: "Numero Interior",
  // mz: "Manzana",
  // lt: "Lote",
   codigo_ps: "Codigo Postal",
  // colonia: "Colonia",
  // casa: "Casa"
  
}
async function captacion_ocr(formData, contador_funcion) {
  
  await axios
    .post("processing.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (respuesta) {
      
      let repeticion_fecha = 0;

      if (contador_funcion < 4) {
        let repeticion = 0;
        let valor_encontrado = "";
        let repeticion_curp = 0;
        const valores = [
          "nombre",
          "domicilio","domici",
          "clave de",
          "curp",
          "sexo",
          "fecha",
          "vigencia",
          "de regis",
          "estado",
          "municipio",
          "secci",
          "localidad",
          "emisi",
        ];
        for (
          let index = 0;
          index < respuesta.data[0].TextOverlay.Lines.length;
          index++
        ) {
          const element = respuesta.data[0].TextOverlay.Lines[index];

          for (let index2 = 0; index2 < valores.length; index2++) {
            const valores_ine = valores[index2];
            if (element.LineText.includes(valores_ine.toUpperCase())) {
              valor_encontrado = valores_ine;
              break;
            }
          }
          console.log(valor_encontrado);
          if (
            valor_encontrado
              .toLowerCase()
              .includes("nom", "omb", "ombre", "bre")
          ) {
            console.log("nombre:" + element.LineText);
            if (repeticion == 1) {
              document.getElementById("apellidopat").value = element.LineText || "";
              all_campos_ocr.apellido_p=document.getElementById("apellidopat").value==""?"Apellido paterno" :true;
            } else if (repeticion == 2) {
              document.getElementById("apellidomat").value = element.LineText ||"";
              
              all_campos_ocr.apellido_m=document.getElementById("apellidomat").value==""?"Apellido Materno" :true;
            } else if (repeticion == 3) {
              document.getElementById("nombre").value = element.LineText || "";
              all_campos_ocr.nombre=document.getElementById("apellidomat").value==""?"Nombre" :true;
            }
            repeticion++;
          } 
          else if (valor_encontrado.toLowerCase() == "fecha") {
            console.log("fecha:" + element.LineText);
            if (repeticion_fecha == 1) {
              const arreglo_fecha = element.LineText.split("/");
              console.log(arreglo_fecha);
              document.getElementById("dia").value =
                arreglo_fecha[2] +
                "-" +
                arreglo_fecha[1] +
                "-" +
                arreglo_fecha[0];
                all_campos_ocr.fecha_nacimiento=document.getElementById("dia").value?true: "Fecha de nacimiento"
            } else {
              console.log(element.LineText);
              console.log(repeticion_fecha);
            }
            repeticion_fecha++;
          } else if (
            valor_encontrado
              .toLowerCase()
              .includes("clave de", "lave des", "lector")
          ) {
            console.log("clave de:" + element.LineText);
            document.getElementById("noidentificacion").value =
              element.LineText.split(" ")[3]||"";
              all_campos_ocr.clave_lector=document.getElementById("noidentificacion").value==""?"Clave del lector" :true;
          } else if (
            valor_encontrado.toLowerCase().includes("curp", "cur", "urp")
          ) {
            console.log("curp:" + element.LineText);
            repeticion_curp++;
            if (repeticion_curp == 2) {
              document.getElementById("curp").value = element.LineText||"";
              all_campos_ocr.curp=document.getElementById("curp").value==""?"CURP" :true;
            } else {
              document.getElementById("curp").value =
                element.LineText.split(" ")[1] || "";
                all_campos_ocr.curp=document.getElementById("curp").value==""?"CURP" :true;
            }
          } else if (
            valor_encontrado.toLowerCase().includes("sexo", "exo", "sex")
          ) {
            console.log("sexo:" + element.LineText);
            let variable_sexo = document.getElementById("genero");
            if (element.LineText.split(" ")[1] == "H") {
              variable_sexo.value = "HOMBRE";
              all_campos_ocr.sexo=true;
            } else if (element.LineText.split(" ")[1] == "M") {
              variable_sexo.value = "MUJER";
              
              all_campos_ocr.sexo=true;
            }else{
              all_campos_ocr.sexo= all_campos_ocr.sexo==true?true:"Sexo";
            }
          
          } else if (
            valor_encontrado
              .toLowerCase()
              .includes("estado", "est", "tado", "ado")
          ) {
            console.log(element.LineText);
            document.getElementById("estado").value =
              element.LineText.split(" ")[1] || "";
              all_campos_ocr.estado=document.getElementById("estado").value==""?"Estado" :true;
          } else if (
            valor_encontrado
              .toLowerCase()
              .includes("vige", "vigencia", "igen", "ncia")
          ) {
            console.error("vigencia:" + element.LineText.split(" ").length);
            if (element.LineText.includes("-")) {
              document.getElementById("mes_dia").value =
                element.LineText.split("-")[1] + "-01";
                all_campos_ocr.vigencia= document.getElementById("mes_dia").value==""?"Vigencia":true;
            } else {
              document.getElementById("mes_dia").value =
                element.LineText.split(" ").length >= 2
                  ? element.LineText.split(" ")[2] + "-01"
                  : element.LineText.split(" ")[1] + "-01";
                  all_campos_ocr.vigencia= document.getElementById("mes_dia").value==""?"Vigencia":true;
            }
          } else if (
            valor_encontrado.toLowerCase().includes("dom", "mici", "micilio")
          ) {
            console.log("domicilio: " + element.LineText);
//calle
if (element.LineText.match(/^[^0-9]+/) 
  && !element.LineText.toLowerCase().includes("fracc") 
  && !element.LineText.toLowerCase().includes("frac") 
  && !element.LineText.match(/\b[A-Z]+\b(?=\s*,\s*MEX)/)
  && !element.LineText.match(/\bMEX\b/)
  && !element.LineText.match(/^[^0-9]+/)[0].trim().toLowerCase().includes("domicilio") 
  
  && !element.LineText.match(/^[^0-9]+/)[0].trim().toLowerCase().includes("fecha") 
  
  && !element.LineText.match(/^[^0-9]+/)[0].trim().toLowerCase().includes("nacimi") 
  && !element.LineText.match(/^[^0-9]+/)[0].trim().toLowerCase().includes("nacimiento") 
  && !element.LineText.match(/^[^0-9]+/)[0].trim().toLowerCase().includes("domi")
  && !element.LineText.match(/^[^0-9]+/)[0].trim().toLowerCase().includes("domici")
  && document.getElementById("calle").value == '') {

  let streetName = element.LineText.match(/^[^0-9]+/)[0].trim();
  
  if (!streetName.toLowerCase().includes("frac")) {
    document.getElementById("calle").value = streetName;
   // all_campos_ocr.calle=true;
    console.error(document.getElementById("calle").value);
  }
}


          if (element.LineText.match(/\b\d+\b/)&&document.getElementById("ext").value==''&& !element.LineText.match(/\b\d{5}\b/)) {
            document.getElementById("ext").value = element.LineText.match(/\b\d+\b/)[0];
            //all_campos_ocr.no_exterior=true;
        }
          if (element.LineText.match(/LT (\d+)/)) {
              document.getElementById("lote").value = element.LineText.match(/LT (\d+)/)[1];
             // all_campos_ocr.lt=true;
          }

          if (element.LineText.match(/CS (\d+)/)) {
              document.getElementById("int").value = element.LineText.match(/CS (\d+)/)[1];
             // all_campos_ocr.casa=true;
          }
          if (element.LineText.match(/MZ (\d+)/)) {
            document.getElementById("manzana").value = element.LineText.match(/MZ (\d+)/)[1];
           // all_campos_ocr.mz=true;
          }
          if (element.LineText.match(/\b\d{5}\b/) ) {
            all_campos_ocr.codigo_ps=true;
            document.getElementById("cp").value = element.LineText.match(/\b\d{5}\b/)[0];
            new Promise((resolve, reject) => {
                  var cpField = document.getElementById("cp" ).value;
                  var municipioField = document.getElementById("municipio" );
                  var estadoField = document.getElementById("estado" );
                  var ciudadField = document.getElementById("ciudad" );
                  var selectColonia = document.getElementById("colonia" );
                  selectColonia.innerHTML = ""; // Limpia el campo de selección
              
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
          }else {
            // console.log(respuesta.data[0].TextOverlay.Lines[index]);
          }
        }
      } else {
        for (
          let index = 0;
          index < respuesta.data[0].TextOverlay.Lines.length;
          index++
        ) {
          if (
            respuesta.data[0].TextOverlay.Lines[index].LineText.includes(
              "IDMEX"
            ) ||respuesta.data[0].TextOverlay.Lines[index].LineText.includes(
              "DMEX"
            )||respuesta.data[0].TextOverlay.Lines[index].LineText.includes(
              "IDM"
            )
          ) {
            
            let id_mex_resultado= respuesta.data[0].TextOverlay.Lines[index].Words[0].WordText|| "";
            let ocr= respuesta.data[0].TextOverlay.Lines[index].Words[2].WordText|| "";
         if(ocr!=""){
          document.getElementById("ocr").value=ocr;
          all_campos_ocr.ocr_api=true;
         }else{
          all_campos_ocr.ocr_api="OCR"
         }
         if(id_mex_resultado!=""){
          document.getElementById("idmex").value=id_mex_resultado;
          all_campos_ocr.id_mex=true;
         }else{
          all_campos_ocr.id_mex="IDMEX";
         }
          }else  if (
            respuesta.data[0].TextOverlay.Lines[index].LineText.includes(
              "MEX"
            ) || respuesta.data[0].TextOverlay.Lines[index].LineText.includes(
              "ME"
            )  ||respuesta.data[0].TextOverlay.Lines[index].LineText.includes(
              "EX"
            ) 
          ) {
          let ocr_2=respuesta.data[0].TextOverlay.Lines[index].Words[0].WordText;
           if(ocr_2!=""){
            document.getElementById("ocr").value = document.getElementById("ocr").value
            +"" +ocr_2 ;
            all_campos_ocr.ocr_api=true;
          }else{
            all_campos_ocr.ocr_api="IDMX";

           }
          }
        }
      }
      document.getElementById("pais").value="Mexico (Estados Unidos Mexicanos)";
    })
    .catch(function (error) {
      
      cerrar_ventana_videoOCR();
      Swal.fire({
        title: "ERROR",
        text: `Por el momento no se puede usar esta funcion, espere de 15 a 30 min para intentarlo de nuevo` ,
        icon: "error",
      });
      repeticion_captura_OCR=0;
      
      demosSection.style.display = "block";
      tarjeta_ocr_reverso.style.display = "none";
      enableWebcamButton.textContent = "Comenzar";
      video_en_curso=false;
      console.log(error);

    });
}
document
  .getElementById("comenzar_parte_atras")
  .addEventListener("click", function (param) {
    title_INE.textContent = 'Escanea la parte de atrás';
    demosSection.style.display = "block";
    tarjeta_ocr_reverso.style.display = "none";
    presicion_ocr=0.60;
    if (stream_g) {
      stream_g.getVideoTracks().forEach(track => (track.enabled = true));
      console.log("Cámara reanudada");
    } else {
      console.log("No hay cámara activa para reanudar");
    }
  });
var imagen1 = null;
var imagen2 = null;

var width = 320;
var height = 0;
var streaming = false; // Asegúrate de que 'streaming' esté definida correctamente aquí.
var resembleControl;

var repeticion_dos;
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
let estatico_o_no = false;
let p_estatico = document.getElementById("estatico");
function al_completar(data) {
  if (data.misMatchPercentage != 0) {
    if (Math.ceil(data.misMatchPercentage) <= 30) {
      p_estatico.textContent = "Estatico";
      estatico_o_no = true;
    } else {
      p_estatico.textContent = "No estatico";
      estatico_o_no = false;
    }
  }
}
