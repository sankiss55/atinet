// TRAEMOS TODOS LOS ELEMENTOS QUE VAYAMOS A USAR
var contenedor_pag = document.getElementById("pagina");
var ventana_flotante = document.getElementById("ventana_popul");
var ventana_ocr = document.getElementById("ventana_ocr");
var tipo_dato;
var nombre = document.getElementById("nombre");
var curp = document.getElementById("curp");
var apellidopat = document.getElementById("apellidopat");
var apellidomat = document.getElementById("apellidomat");
var grid_1 = document.getElementById("grid-1-moral");
var grid_2 = document.getElementById("grid-2-moral");
var grid_3 = document.getElementById("grid-3-moral");
var grid_4 = document.getElementById("grid-4-moral");
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
var c_nac = document.getElementById("c_nac");
var repeticion = 0;
var rfc = document.getElementById("rfc");
var identificacion = document.getElementById("identificacion");
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
var municipio_nac = document.getElementById("m_nac");
var regimen = document.getElementById("regimen");

var correo2 = document.getElementById("correo2");
var valor_boton;
var title_escanea = document.getElementById("title_escanea");
var AutoridadEmisora2 = document.getElementById("AutoridadEmisora2");
var mes_dia_text = document.getElementById("mes_dia_text");
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
var text_alias = document.getElementById("text_alias");
var apellido_pa_text = document.getElementById("apellido_pa_text");
var apellido_mat_text = document.getElementById("apellido_mat_text");
var texto_genero = document.getElementById("texto_genero");
var ocupacion_texto = document.getElementById("ocupacion_texto");
var estado_civil_texto = document.getElementById("estado_civil_texto");
var pais_1 = document.getElementById("pais_1");
var telefono_texto = document.getElementById("telefono_texto");
var telefono_texto_oficina = document.getElementById("telefono_texto_oficina");
var telefono_movil_text = document.getElementById("telefono_movil_text");
var documento_id_texto = document.getElementById("documento_id_texto");
var autoridad_emisora_texto = document.getElementById(
  "autoridad_emisora_texto"
);
var apellidopat_conyugue = document.getElementById("apellidopat_conyugue");
var nombre_conyuge = document.getElementById("nombre_conyuge");
var apellidomat_conyugue = document.getElementById("apellidomat_conyugue");
var num_doc_id = document.getElementById("num_doc_id_emicion");
var rad_Group1 = document.getElementById("rad_Group1");
var OCR_text = document.getElementById("OCR_text");
var IDMEX_text = document.getElementById("IDMEX_text");
var ocr = document.getElementById("ocr");
var idmex = document.getElementById("idmex");
var mes_dia_text = document.getElementById("mes_dia_text");
var mes_dia = document.getElementById("mes_dia");
var numero_texto = document.getElementById("numero_texto");
var sexo = document.getElementById("genero");
var loadAti = document.getElementById("carga_Ati");
var loadAtiFull = document.getElementById("carga_Ati_2");
var persona = document.getElementById("persona");

var manualUso_Buttom = document.getElementById("manualUso_Buttom");

var automatico = false;

/*
window.onload = init;
function init(){
    h = 0;
    m = 0;
    s = 0;
   
}         
function cronometrar(){
    escribir();
    id = setInterval(escribir,1000);
}
function escribir(){
    var hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}
}
function parar(){
    clearInterval(id);
    console.log(hAux + ":" + mAux + ":" + sAux);
}
function reiniciar(){
    clearInterval(id);
    h=0;m=0;s=0;
}
*/

window.addEventListener("load", () => {
  setTimeout(() => {
    loadAtiFull.remove();
    //parar();
  }, 1000);

  //cronometrar();
  loadAtiFull.style.animation = "desvanecer_Carga 1s forwards";
  loadAtiFull.style.animationDelay = "0.5s";
});

function normal_Style_CURP(){
  curp.readOnly = false;
    curp.style.border = "1px solid darkgray";
    curp.style.backgroundColor = " #ffffff";
}

function normal_Style_RFC(){
  rfc.readOnly = false;
  rfc.style.border = "1px solid darkgray";
  rfc.style.backgroundColor = " #ffffff";
}

function Bloqueo_Input(){

  if(valor_boton != "moral"){
    if(curp.readOnly === false){
      curp.readOnly = true;
      curp.style.border = "2px solid #dc3545";
      curp.style.backgroundColor = "rgb(255, 215, 219)";
      
     }
  } else {
    if(rfc.readOnly === false){
      rfc.readOnly = true;
      rfc.style.border = "2px solid #dc3545";
      rfc.style.backgroundColor = "rgb(255, 215, 219)";
      
      
     }
  }
 
}

//FUNCION PARA ABRIR LA VENTANA DE OCR, LA VENTANA FLOTANTE
function abrir_videoOCR() {
  cerrar_ventana_video();
  manualUso_Buttom.style.transform = "translateX(-150px)";
  manualUso_Buttom.style.display = "none";
  contenedor_pag.style.opacity = "0.4";
  ventana_ocr.style.display = "block";
  contenedor_pag.style.pointerEvents = "none";
}
//FUNCION PARA CERRAR LA VENTANA FLOTANTE DE TODOS LO QUE USAN ESCANEO DE QR
function cerrar_ventana_video() {
  manualUso_Buttom.style.transform = "translateX(0px)";
  contenedor_pag.style.opacity = "1";
  contenedor_pag.style.pointerEvents = "all";
  ventana_flotante.style.display = "none ";
}
//AL MOMENTO DE QUE LA PAGINA SE CARGUE SE HARA UNA ACCION AUTOMATICAMENTE
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

// function manejarEscaneo(url, formularioSeleccionado) {
//   const tipoConstancia = identificarTipoPorURL(url);

//   if (tipoConstancia !== formularioSeleccionado) {
//     alert(
//       "El tipo de constancia escaneada no coincide con el formulario seleccionado."
//     );
//     // Aquí puedes redirigir al formulario correcto o dar alguna otra instrucción
//   } else {
//     // Rellenar los campos del formulario con los datos de la URL
//     rellenarFormulario(url); // Asegúrate de definir esta función
//   }
// }
//Accion de boton para limpiar campos
document.getElementById("borrar_datos").addEventListener("click", function (e) {
  e.preventDefault();
  resetForm();
  
$('#pais_1').val('').trigger('change');
$('#pais_fiscal_input').val('').trigger('change');
$('#pais_nacimeinto_lista').val('').trigger('change');
$('#nacionalidad_input').val('').trigger('change');
});
//RESETEA EL FORMULARIO (EL VALOR DE LOS INPUTS)
function resetForm() {
  Swal.fire({
    title: "",
    text: "Esta a punto de borrar todos los datos ¿Desea continuar?",
    icon: "warning",
    showCancelButton: true,
    customClass: {
      confirmButton: "custom-Button1",
      icon: "custom-Icon1",
    },
    cancelButtonColor: "#d33",
    confirmButtonText: "Continuar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      document.querySelector(".form-register").reset();

      normal_Style_CURP();
        
      normal_Style_RFC();
         
      //curp.disabled = false;
    }
  });
}
function verificar_datos() {
  let dato_encontrado = false;
  const datos_all = document.querySelectorAll(
    "input:not([type='button']):not([type='submit']):not([type='reset'])"
  );
  console.error(datos_all);
  for (let index = 0; index < datos_all.length; index++) {
    console.error(datos_all[index]);
    const element = datos_all[index];
    console.error(element.value);
    if (element.value !== "") {
      dato_encontrado = true;
    }
  }
  return dato_encontrado;
}
//FUNCION DONDE LLEGA LA RESPUESTA DE ESCANEO DE CODIGO DE BARRAS
function onScanSuccess(qrCodeMessage) {
  html5QrcodeScanner
    .clear()
    .then((_) => {})
    .catch((error) => {
      alertify.error("No pudimos apagar la camara reinicie la pagina");
    });

  html5QrcodeScanner.clear();
  cerrar_ventana_video();
  if (repeticion == 0) {
    let textoParseado = "";

    console.log(qrCodeMessage);
    if (qrCodeMessage.includes("http")) {
      axios
        .post("src/copiar_pag.php", {
          url: qrCodeMessage,
        })
        .then(function (respuesta) {
          let respuestapag = respuesta.data;
          console.log(respuesta.data);

          respuesta.data.push(qrCodeMessage);
          if (!respuesta.data[0].includes("CURP") && valor_boton != "moral") {
            Swal.fire({
              title: "Error",
              text: "El documento escaneado no corresponde al apartado de datos fiscales",
              icon: "error",
            });
            return;
          } else if (
            respuesta.data[0].includes("CURP") &&
            valor_boton == "moral"
          ) {
            Swal.fire({
              title: "Error",
              text: "El documento escaneado no corresponde al apartado de datos morales",
              icon: "error",
            });
            return;
          }
          //Aparece la animacion de carga
          loadAti.style.visibility = "visible";
          axios
            .post("src/apitext.php", {
              url: respuesta.data,
            })
            .then(function (respuesta2) {
              //Desaparece la animacion de carga
              loadAti.style.visibility = "hidden";
              // Acceder a la propiedad candidates, luego al primer candidato
              const candidato = respuesta2.data.candidates[0];

              // Acceder a las partes dentro del objeto 'content'
              const partes = candidato.content.parts;

              // El texto está en la primera parte
              const textoJSON = partes[0].text;

              // Ahora puedes parsear el texto, que es un string JSON
              textoParseado = JSON.parse(textoJSON);
              // Puedes acceder a los datos dentro del texto parseado
              
              console.log(verificar_datos());
              if (verificar_datos() == true) {
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
                      "¡Perfecto!",
                      "Se han remplazado los datos existentes",
                      "success"
                    );

                    pegarDatos_qr(textoParseado);

                    for (let index = 0; index < respuestapag.length; index++) {
                      const element = respuestapag[index];

                      if (element.includes("RFC:")) {
                        console.error(element);
                        let inicioRFC = element.indexOf("RFC: ") + 5;
                        let rfcExtraido = element.substring(
                          inicioRFC,
                          inicioRFC + 13
                        );

                        // Eliminar comas si las hay
                        rfcExtraido = rfcExtraido.replace(",", "");
                        if(rfc.readOnly === false){
                          rfc.value = rfcExtraido;
                        }
                      }
                    }
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                      "",
                      "Se llenaran solo los datos que actualmente estan en blanco",
                      "info"
                    );

                    document.getElementById("nombre").value =
                      document.getElementById("nombre").value ||
                      textoParseado.nombre;
                      if(curp.readOnly === false){
                        curp.value = curp.value || textoParseado.curp;
                      }
                    apellidopat.value =
                      apellidopat.value || textoParseado.apellido_paterno;
                    apellidomat.value =
                      apellidomat.value || textoParseado.apellido_materno;
                    calle_fiscal.value =
                      calle_fiscal.value || textoParseado.domicilio.calle;
                    numero_ext_fiscal.value =
                      numero_ext_fiscal.value ||
                      textoParseado.domicilio.numero_exterior;
                    numero_int_fiscal.value =
                      numero_int_fiscal.value ||
                      textoParseado.domicilio.numero_interior;
                    cp_fiscal.value =
                      cp_fiscal.value || textoParseado.domicilio.codigo_postal;
                    municipio_fiscal.value =
                      municipio_fiscal.value ||
                      textoParseado.domicilio.municipio;
                    estado_fiscal.value =
                      estado_fiscal.value || textoParseado.domicilio.estado;
                    correo.value = correo.value || textoParseado.correo;
                    dia.value =
                      dia.value ||
                      textoParseado.fecha_de_nacimiento_o_de_constitucion ||
                      textoParseado.fecha_de_nacimiento_o_constitucion;
                    // rfc.value = rfc.value || textoParseado.rfc;
                    regimen_fiscal.value =
                      regimen_fiscal.value || textoParseado.regimen_fiscal;
                        
                    
                      
                    for (let index = 0; index < respuestapag.length; index++) {
                      const element = respuestapag[index];

                      if (element.includes("RFC:")) {
                        console.error(element);
                        let inicioRFC = element.indexOf("RFC: ") + 5;
                        let rfcExtraido = element.substring(
                          inicioRFC,
                          inicioRFC + 13
                        );

                        // Eliminar comas si las hay
                        rfcExtraido = rfcExtraido.replace(",", "");
                        if(rfc.ReadOnly === false){
                          rfc.value = rfc.value || rfcExtraido;
                          verificar_persona_bd();
                        }
                       
                      }
                    }
                  }
                });
              } else {
                pegarDatos_qr_fiscal(textoParseado);

                for (let index = 0; index < respuestapag.length; index++) {
                  const element = respuestapag[index];

                  if (element.includes("RFC:")) {
                    console.error(element);
                    let inicioRFC = element.indexOf("RFC: ") + 5;
                    let rfcExtraido = element.substring(
                      inicioRFC,
                      inicioRFC + 13
                    );

                    // Eliminar comas si las hay
                    rfcExtraido = rfcExtraido.replace(",", "");
                    rfc.value = rfcExtraido;
                  }
                }
              }
            })
            .catch(function (error) {
              //console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      if (valor_boton == "moral") {
        Swal.fire({
          title: "Error",
          text: "El documento escaneado no corresponde al apartado de datos morales",
          icon: "error",
        });

        console.error("ok");
      } else {
        //Aparece la animacion de carga
        loadAti.style.visibility = "visible";
        axios
          .post("src/apitext.php", {
            url: qrCodeMessage,
          })
          .then(function (respuesta2) {
            //Desaparece la animacion de carga

            loadAti.style.visibility = "hidden";
            // Acceder a la propiedad candidates, luego al primer candidato
            const candidato = respuesta2.data.candidates[0];

            // Acceder a las partes dentro del objeto 'content'
            const partes = candidato.content.parts;

            // El texto está en la primera parte
            const textoJSON = partes[0].text;

            // Ahora puedes parsear el texto, que es un string JSON
            textoParseado = JSON.parse(textoJSON);
            console.log(textoParseado);

            let dato_encontrado = false;
            const datos_all = document.querySelectorAll("input[type='text']");
            for (let index = 0; index < datos_all.length; index++) {
              const element = datos_all[index];
              if (!element.disabled && element.value.trim() !== "") {
                dato_encontrado = true;
              }
            }
            if (dato_encontrado === true) {
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
                    "¡Perfecto!",
                    "Se han remplazado los datos existentes",
                    "success"
                  );
                  pegarDatos_qr(textoParseado);

                  for (let index = 0; index < respuestapag.length; index++) {
                    const element = respuestapag[index];

                    if (element.includes("RFC:")) {
                      console.error(element);
                      let inicioRFC = element.indexOf("RFC: ") + 5;
                      let rfcExtraido = element.substring(
                        inicioRFC,
                        inicioRFC + 13
                      );

                      // Eliminar comas si las hay
                      rfcExtraido = rfcExtraido.replace(",", "");
                      rfc.value = rfcExtraido;
                    }
                  }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal.fire(
                    "",
                    "Se llenaran solo los datos que actualmente estan en blanco",
                    "info"
                  );

                  

                  nombre.value = nombre.value || textoParseado.nombre;
                  if(curp.readOnly === false){
                    curp.value = curp.value || textoParseado.curp;
                  }
                  apellidopat.value =
                    apellidopat.value || textoParseado.apellido_paterno;
                  apellidomat.value =
                    apellidomat.value || textoParseado.apellido_materno;
                  calle.value = calle.value || textoParseado.domicilio.calle;
                  numero_ext.value =
                    numero_ext.value || textoParseado.domicilio.numero_exterior;
                  numero_interior.value =
                    numero_interior.value ||
                    textoParseado.domicilio.numero_interior;
                  codigo_postal.value =
                    codigo_postal.value ||
                    textoParseado.domicilio.codigo_postal;
                  municipio.value =
                    municipio.value || textoParseado.domicilio.municipio;
                  estado.value = estado.value || textoParseado.domicilio.estado;
                  correo.value = correo.value || textoParseado.correo;
                  dia.value =
                    dia.value ||
                    textoParseado.fecha_de_nacimiento_o_de_constitucion ||
                    textoParseado.fecha_de_nacimiento_o_constitucion ||
                    textoParseado.fecha_de_nacimiento;
                      
                    
                   
                  for (let index = 0; index < respuestapag.length; index++) {
                    const element = respuestapag[index];

                    if (element.includes("RFC:")) {
                      console.error(element);
                      let inicioRFC = element.indexOf("RFC: ") + 5;
                      let rfcExtraido = element.substring(
                        inicioRFC,
                        inicioRFC + 13
                      );

                      // Eliminar comas si las hay
                      rfcExtraido = rfcExtraido.replace(",", "");
                      if(rfc.readOnly === false){
                        rfc.value = rfc.value || rfcExtraido;
                        verificar_persona_bd();
                      }
                    }
                  }

                  sexo.value = sexo.value || textoParseado.sexo;
                }
              });
            } else {
              pegarDatos_qr(textoParseado);

              for (let index = 0; index < respuestapag.length; index++) {
                const element = respuestapag[index];

                if (element.includes("RFC:")) {
                  console.error(element);
                  let inicioRFC = element.indexOf("RFC: ") + 5;
                  let rfcExtraido = element.substring(
                    inicioRFC,
                    inicioRFC + 13
                  );

                  // Eliminar comas si las hay
                  rfcExtraido = rfcExtraido.replace(",", "");
                  rfc.value = rfcExtraido;
                }
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });

      }
    }
    contenedor_pag.style.opacity = "1";
    contenedor_pag.style.pointerEvents = "all";
    ventana_flotante.style.display = "none";
    repeticion++;
  }
}
var id_escondido_registro = document.getElementById("id_escondido_registro");
// CERRAR LA VENTANA FLOTANTE DE OCR HACIENDO QUE SE CABIEN SUS ESTILOS
function cerrar_ventana_videoOCR() {
  manualUso_Buttom.style.transform = "translateX(0px)";
  contenedor_pag.style.opacity = "1";
  contenedor_pag.style.pointerEvents = "all";
  ventana_ocr.style.display = "none";
}
function verificar_persona_bd() {

  if(curp.readOnly === false){
    if (valor_boton != "moral" && curp.value != "") {
    
      axios
        .post("src/consulta_actualizar_usuarios.php", {
          curp: curp.value,
        })
        .then(function (respuesta) {
          console.log(Object.keys(respuesta.data).length);
          if (Object.keys(respuesta.data).length > 0) {
            Swal.fire({
              title: "",
              text: "Se detecto la existencia de un registro con este CURP",
              icon: "warning",
              customClass: {
                confirmButton: "custom-Button1",
                icon: "custom-Icon1",
              },
              cancelButtonColor: "#d33",
              confirmButtonText: "Continuar",
            }).then((result) => {
              pegardatos_de_la_bd(respuesta);
              id_escondido_registro.value = "Fiscal";
              Bloqueo_Input();
          
  
  //curp.disabled = true;
                
              
            });
          }else{
            id_escondido_registro.value = "";
          }
        })
        .catch(function (err) {
          console.error(err);
        });
    } else {
      console.error(rfc.value);
      axios
        .post("src/consulta_actualizar_usuarios.php", {
          rfc: rfc.value,
          
        })
        .then(function (respuesta) {
          console.log(respuesta.data);
          if (Object.keys(respuesta.data).length > 0) {
            Swal.fire({
              title: "",
              text: "Se detecto la existencia de un registro con este RFC",
              icon: "warning",
              customClass: {
                confirmButton: "custom-Button1",
                icon: "custom-Icon1",
              },
              cancelButtonColor: "#d33",
              confirmButtonText: "Continuar",
            }).then((result) => {
              console.log(respuesta.data);
          pegardatos_de_la_bd(respuesta);
          //rfc.disabled = true;
  
          id_escondido_registro.value = "Moral";
          Bloqueo_Input();
                
              
            });
          }else{
            id_escondido_registro.value = "";
          }
         
        })
        .catch(function (err) {
          console.error(err);
        });
    }

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

  

}
function pegardatos_de_la_bd(respuesta) {

setTimeout(() => {
  document.getElementById("nombre").value = respuesta.data.nombre;
}, 1000);

   // Comprobamos y asignamos los valores de respuesta.data a los inputs
console.error(respuesta.data);
apellidomat_conyugue.value = 
  respuesta.data.Apellido_materno_conyuge;
apellidopat_conyugue.value =
  respuesta.data.Apellido_paterno_conyuge;
autoridad_emisora.value = respuesta.data.Autoridad_emisora;
correo2.value = respuesta.data.Gmail2;
persona.value = respuesta.data.Persona;
alias.value = respuesta.data.alias;
apellidopat.value = respuesta.data.apellidomat;
apellidomat.value = respuesta.data.apellidopat;
AutoridadEmisora2.value = respuesta.data.autoridad_emisora_usuario;
calle.value = respuesta.data.calle;
  calle_fiscal.value = respuesta.data.calle_fiscal;
ciudad.value = respuesta.data.ciudad;
ciudad_fiscal.value = respuesta.data.ciudad_fiscal;
c_nac.value = respuesta.data.ciudad_nac;
colonia.value = respuesta.data.colonia;
colonia_fiscal.value = respuesta.data.colonia_fiscal;
regimen.value = respuesta.data.conyuge;
correo.value = respuesta.data.correo;
codigo_postal.value = respuesta.data.cp;
cp_fiscal.value = respuesta.data.cp_fiscal;
curp.value = respuesta.data.curp;
dia_nacimiento.value = respuesta.data.dia;
doc_id.value = respuesta.data.doc_Identificacion;
identificacion.value = respuesta.data.documento;
civil.value = respuesta.data.edo_civil;
estado.value = respuesta.data.estado;
estado_fiscal.value = respuesta.data.estado_fiscal;
estado_nacimiento.value = respuesta.data.estado_nac;
genero.value = respuesta.data.genero;
lote.value = respuesta.data.lote;
lote_fiscal.value = respuesta.data.lote_fiscal;
manzana.value = respuesta.data.manzana;
manzana_fiscal.value = respuesta.data.manzana_fiscal;
municipio.value = respuesta.data.municipio;
municipio_fiscal.value = respuesta.data.municipio_fiscal;
municipio_nac.value = respuesta.data.municipio_nac;
$('#nacionalidad_input').val(respuesta.data.nacionalidad).trigger('change');
numero_ext.value = respuesta.data.no_exterior;
numero_ext_fiscal.value = respuesta.data.no_exterior_fiscal;

var sepNoIdentificacion = respuesta.data.no_identificacion.split("|");

noidentificacion.value = sepNoIdentificacion[0];
idmex.value = sepNoIdentificacion[1];
ocr.value = sepNoIdentificacion[2];

numero_interior.value = respuesta.data.no_interior;
numero_int_fiscal.value = respuesta.data.no_interior_fiscal;
nombre_conyuge.value = respuesta.data.nombre_conyuge;
num_doc_id.value = parseInt(respuesta.data.num_doc_identificacion);
ocupacion.value = respuesta.data.ocupacion;
//persona.value = respuesta.data.pais;
$('#pais_1').val(respuesta.data.pais).trigger('change');
//persona.value = respuesta.data.pais_fiscal;
$('#pais_fiscal_input').val(respuesta.data.pais_fiscal).trigger('change');
$('#pais_nacimeinto_lista').val(respuesta.data.paisnac).trigger('change');
var regimen_fiscal22 = document.getElementById("regimen_fiscal");

// Recorremos todas las opciones dentro del select
for (let index = 0; index < regimen_fiscal22.options.length; index++) {
  const option = regimen_fiscal22.options[index];
  // Comparamos si el valor de la opción es igual al valor en respuesta.data
  if (option.text.includes(respuesta.data.regimen_fiscal)) {
    regimen_fiscal.value = option.value; 
    break; 
  }
}

rfc.value = respuesta.data.rfc;
telefono.value = respuesta.data.telefono;
telefono_movil.value = respuesta.data.telefono_movil;
telefono_oficina.value = respuesta.data.telefono_oficina;

var sepVigencia = respuesta.data.vigiencia_de_ine.split("-");

mes_dia.value = sepVigencia[0] + "-" + sepVigencia[1];
buscarCodigoYColonias();
buscarCodigoYColonias("_fiscal");
                         
}
function pegarDatos_qr_fiscal(textoParseado) {
  console.log(textoParseado);

  if(curp.readOnly === false){
    curp.value = textoParseado.curp;
    verificar_persona_bd();
  }
  
  
  nombre.value = textoParseado.nombre;
  rfc.value = textoParseado.rfc || "";
  apellidopat.value = textoParseado.apellido_paterno;
  apellidomat.value = textoParseado.apellido_materno;
  calle_fiscal.value = textoParseado.domicilio.calle;
  numero_ext_fiscal.value = textoParseado.domicilio.numero_exterior;
  numero_int_fiscal.value = textoParseado.domicilio.numero_interior;
  cp_fiscal.value = textoParseado.domicilio.codigo_postal;
  municipio_fiscal.value = textoParseado.domicilio.municipio;
  estado_fiscal.value = textoParseado.domicilio.estado;

  correo.value = textoParseado.correo;
  manzana.value = textoParseado.domicilio.mz;
  lote_fiscal.value = textoParseado.domicilio.lote;
  dia.value =
    textoParseado.fecha_de_nacimiento_o_de_constitucion ||
    textoParseado.fecha_de_nacimiento_o_constitucion ||
    textoParseado.fecha_de_nacimiento;
  //rfc.value=textoParseado.rfc;
  sexo.value = textoParseado.sexo;
  
  regimen_fiscal.value = textoParseado.regimen_fiscal;

  

  $('#pais_fiscal_input').val("Mexico (Estados Unidos Mexicanos)").trigger('change');
  buscarCodigoYColonias();
  buscarCodigoYColonias("_fiscal");
}
function pegarDatos_qr(textoParseado) {
  console.log(textoParseado);

  if(curp.readOnly === false){
    curp.value = textoParseado.curp;
  }
  
  
  $('#pais_1').val("Mexico (Estados Unidos Mexicanos)").trigger('change');
  document.getElementById("nombre").value = textoParseado.nombre;

  if(rfc.readOnly === false){
    rfc.value = textoParseado.rfc || "";
    verificar_persona_bd();
  }

  
  
  nombre.value = textoParseado.nombre;
  apellidopat.value = textoParseado.apellido_paterno;
  apellidomat.value = textoParseado.apellido_materno;
  calle.value = textoParseado.domicilio.calle;
  numero_ext.value = textoParseado.domicilio.numero_exterior;
  numero_interior.value = textoParseado.domicilio.numero_interior;
  codigo_postal.value = textoParseado.domicilio.codigo_postal;
  municipio.value = textoParseado.domicilio.municipio;
  estado.value = textoParseado.domicilio.estado;
  correo.value = textoParseado.correo;

  manzana.value = textoParseado.domicilio.mz;
  lote_fiscal.value = textoParseado.domicilio.lote;
  dia.value =
    textoParseado.fecha_de_nacimiento_o_de_constitucion ||
    textoParseado.fecha_de_nacimiento_o_constitucion ||
    textoParseado.fecha_de_nacimiento;
  //rfc.value=textoParseado.rfc;
  sexo.value = textoParseado.sexo;
  regimen_fiscal.value = textoParseado.regimen_fiscal;
  buscarCodigoYColonias();
  buscarCodigoYColonias("_fiscal");
}
function onScanError(errorMessage) {
  //handle scan error
}
//hacer nueva istancia de html5QrcodeScannerb para poder iniciar el escaner
var html5QrcodeScanner;
const buttonOCR = document.getElementById("buttonOCR");
const mensajeOCR = document.getElementById("mensaje5");
const title_Mensaje = document.getElementById("title_escanea");

// ABRIR VENTANA DE VIDEO PARA EL ESCANER DE QR
function abrir_video(valor) {
  // CERRAR LA VENTANA DE OCR POR SI ESTA ABIERTA
  cerrar_ventana_videoOCR();

  manualUso_Buttom.style.transform = "translateX(-150px)";
  repeticion = 0;
  contenedor_pag.style.opacity = "0.4";
  ventana_flotante.style.display = "block";
  contenedor_pag.style.pointerEvents = "none";
  tipo_dato = valor;
  //CREAR UNA NUEVA INSTANCIA Html5QrcodeScanner PARA PODER CREAR UNA NUEVA VENTANA DE VIDEO Y ENCENDERLA
  html5QrcodeScanner = new Html5QrcodeScanner("reader", {
    fps: 10,
    qrbox: 250,
  });

  html5QrcodeScanner.clear();
  //LA RESPUESTA SE IRA A LA FUNCION DE PENDIENDO SI EL ESCANEO FUE EXITOSO O DE LO CONTRARIO NO SE PUDO REALIZAR
  html5QrcodeScanner.render(onScanSuccess, onScanError);
}
// ACCION DE LA VENTANA DE CAMBIO DE TAMAÑO CAMBIANDO LA POSICION DE LOS BOTONES DE MENU DE LA PARTE INFERIOR DERECHA
// window.addEventListener("resize", function () {
//   if (valor_boton === "moral") {
//     title_escanea.style.transform = "";
//     if (window.innerHeight <= 848 && window.innerWidth <= 850) {
//       title_escanea.style.transform = "translate( 50%,400%) ";
//     } else if (window.innerHeight >= 848 && window.innerWidth <= 850) {
//       title_escanea.style.transform = "translate( 50%,300%) ";
//     } else {
//       title_escanea.style.transform = "translate( 50%,100%) ";
//     }
//   }
// });
//FUNCION QUE NOS AYUDA A CAMBIAR PARAMETROS DEPENDIENDO DEL VALOR QUE SE ESCOGIO  moral o fiscal EN EL SELECCT PRINCIPAL DE LA PAGINA
var nombre_text = document.getElementById("nombre_text");
var text_fecha_nacimiento = document.getElementById("text_fecha_nacimiento");

function tipo_de_persona(valor) {
  valor_boton = valor;

  if (valor === "moral") {
    buttonOCR.style.display = "none";
    mensajeOCR.style.display = "none !important";
    mensajeOCR.style.visibility = "hidden";
    title_Mensaje.style.transform = "translate(50%, 20px)";

    normal_Style_CURP();

    esconder_ver_parametros("none");
    text_alias.textContent = "Denominación Social";
    text_fecha_nacimiento.textContent = "Fecha de Constitución";
    civil.value = "";
    muestraMas();
    alias.name = "nombre";
    nombre.name = "nada";

    alias.id = "nombre";
    nombre.id = "nada";
    rfc.maxLength = "12";
    document
      .getElementById("rfc")
      .setAttribute("oninput", "verificar_persona_bd()");
      document.getElementById('curp').removeAttribute("oninput");
    //title_escanea.style.transform = "";
    // if (window.innerHeight <= 848 && window.innerWidth <= 850) {
    //   title_escanea.style.transform = "translate( 50%,500%) ";
    // } else if (window.innerHeight >= 848 && window.innerWidth <= 850) {
    //   title_escanea.style.transform = "translate( 50%,500%) ";
    // } else {
    //   title_escanea.style.transform = "translate( 50%,150%) ";
    // }
    // for (let index = 0; index < datos_escanear_moral.length; index++) {
    //   var element = datos_escanear_moral[index];
    //   element.style.visibility = "visible";
    // }
    // for (let index = 0; index < datos_escanear.length; index++) {
    //   var element = datos_escanear[index];
    //   element.style.visibility = "hidden";
    // }
    // ESCONDE LOS PARAMETROS NO NECESARIOS PARA EL USUARIO O OPCION SELECCIONADA

    alias.placeholder = "Denominación Social";
    curp.placeholder = "C.U.D";
  } else {
    
    normal_Style_RFC();

    document
      .getElementById("curp")
      .setAttribute("oninput", "verificar_persona_bd()");
    rfc.removeAttribute("oninput");
    buttonOCR.style.display = "flex";
    title_Mensaje.style.transform = "translate(50%, -40px)";
    alias.placeholder = "Alias";
    text_alias.textContent = "Alias";

    alias.id = "alias";
    nombre.id = "nombre";
    alias.name = "alias";
    nombre.name = "nombre";
    text_fecha_nacimiento.textContent = "Fecha de Nacimiento";
    //nombre_text.textContent="Nombre";
    // title_escanea.style.transform = "translate( 50%,-100%) ";
    rfc.maxLength = "13";

    for (let index = 0; index < datos_escanear_moral.length; index++) {
      var element = datos_escanear_moral[index];
      element.style.visibility = "hidden";
    }
    for (let index = 0; index < datos_escanear.length; index++) {
      var element = datos_escanear[index];
      element.style.visibility = "visible";
    } //VISUALIZAR IMPUTS QUE SON NECESARIOS PARA EL USUARIO O OPCION SELECCIONADA
    esconder_ver_parametros("grid");
    // nombre.placeholder = "Nombre (s)";
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
let pais_fiscal_input = document.getElementById("pais_fiscal_input");
document
  .getElementById("copy_direccion2")
  .addEventListener("click", async function (evento) {
    evento.preventDefault();

    // Copia valores directamente

    $("#pais_1").val($("#pais_fiscal_input").val()).trigger("change");

    calle.value = calle_fiscal.value;
    numero_ext.value = numero_ext_fiscal.value;
    numero_interior.value = numero_int_fiscal.value;
    manzana.value = manzana_fiscal.value;
    lote.value = lote_fiscal.value;
    codigo_postal.value = cp_fiscal.value;
    municipio.value = municipio_fiscal.value;
    estado.value = estado_fiscal.value;
    ciudad.value = ciudad_fiscal.value;

    try {
      // Espera a que las colonias se carguen
      await buscarCodigoYColonias("");

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
      //console.error("Error al buscar colonias:", error);
    }
    alertify.success("Se copio la direccion exitosamente");
  });
// ACCION PARA COPIAR LA DIRECCION DE domicilio particular al de domicilio fiscal
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
    $("#pais_fiscal_input").val($("#pais_1").val()).trigger("change");
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
      //console.error("Error al buscar colonias:", error);
    }
    alertify.success("Se copio la direccion exitosamente");
  });
//funcion que ayuda a visualizar o esconder los inputs que no son necesarios dependiendo si la opcion seleccionada es moral o fiscal
function esconder_ver_parametros(tipo) {
  mes_dia.style.display = `${tipo}`;
  mes_dia_text.style.display = `${tipo}`;
  OCR_text.style.display = `${tipo}`;
  IDMEX_text.style.display = `${tipo}`;
  ocr.style.display = `${tipo}`;
  idmex.style.display = `${tipo}`;
  mes_dia_text.style.display = `${tipo}`;
  mes_dia.style.display = `${tipo}`;
  autoridad_emisora_texto.style.display = `${tipo}`;
  numero_texto.style.display = `${tipo}`;
  documento_id_texto.style.display = `${tipo}`;
  telefono_movil_text.style.display = `${tipo}`;
  telefono_texto_oficina.style.display = `${tipo}`;
  telefono_texto.style.display = `${tipo}`;
  estado_civil_texto.style.display = `${tipo}`;
  ocupacion_texto.style.display = `${tipo}`;
  apellido_mat_text.style.display = `${tipo}`;
  texto_genero.style.display = `${tipo}`;
  grid_1.style.display = `${tipo}`;
  grid_2.style.display = `${tipo}`;
  grid_3.style.display = `${tipo}`;
  grid_4.style.display = `${tipo}`;
  apellido_pa_text.style.display = `${tipo}`;
  //text_alias.style.display = `${tipo}`;
  mes_dia_text.style.display = `${tipo}`;
  mes_dia.style.display = `${tipo}`;
  AutoridadEmisora2.style.display = `${tipo}`;
  apellidomat.style.display = `${tipo}`;
  apellidopat.style.display = `${tipo}`;
  ocupacion.style.display = `${tipo}`;
  //alias.style.display = `${tipo}`;
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
//funcion si la persona es casada le arroga nuevos campos (datos del conyugue) y estos les pone un required para que sea obligatorio llenarlos
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
    var2.value = "";
    for (var i = 0; i < conyugalFields.length; i++) {
      conyugalFields[i].removeAttribute("required");
      conyugalFields[i].classList.remove("required");
      conyugalFields[i].value = "";
    }
  }
}

window.buscarCodigoYColonias = buscarCodigoYColonias;
//manda una solicitud de busqueda de municipio,estado,ciudad,colonia dependiendo el valor del codigo postal, esto se realiza cada vez que el usuario escibe algo en el input de codigo postal o si se llama en alguna parte del codigo, el prefijo es si es "moral" o 'fiscal' esto para traer el valor por el id de los elementos html
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
// estos son la traduccion de texto de ingles a español de la libleria de js para escanear qr, ya que por defecto lo manda en español
//IMPORTANTE: no quitar esta funcion amenos de que quiera que la libreria de escaneo de qr sea en ingles
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
  //  console.log(ultimoDia.getDate());
  document.getElementById("dia_escondido").value =
    dia_mes + "-" + ultimoDia.getDate();
});
