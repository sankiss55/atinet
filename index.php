<?php
//include('/home3/atinet65/notariosatinet.com.mx/utilerias_appliweb/conexion.php');
include('conexion.php');
?>

<!DOCTYPE html>
<html>

<head>
    <link rel="icon" href="https://notariosatinet.com.mx/utilerias_appliweb/Logocabecera.png" type="image/png">

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width" />
    <title>Notaría Master</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="style_ocr.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="style2.scss">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="validar.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="myjava.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
        integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous">
    </script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <!-- JavaScript -->
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/alertify.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/date-fns@4.1.0/cdn.min.js"></script>
    <!-- CSS -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/alertify.min.css" />

    <script async src="https://docs.opencv.org/4.x/opencv.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <script src="resemble.js" defer></script>
    <!-- v5 -->

    <style>
    .result {
        background-color: #4CAF50;
        color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }

    .row {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }


    #mensaje4 {
        margin-top: -30px !important;
        top: -30px !important;
    }

    #ventana_popul {
        z-index: 999;
        display: none;
        background-color: #dc3545;
        border-radius: 12px;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 25px;
        width: 600px;
        max-width: 90%;

    }

    #reader__status_span {
        display: none;
    }

    #reader span a {
        display: none;
    }

    #reader {
        border: 2px dashed #2196F3;
        margin-left: 50%;
        transform: translateX(-50%);
        padding: 15px;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
    }
    </style>
</head>

<body>

    <div id="container-floating">

        <div id="title_escanea" class="tip_escaner">
            <p>
                Escanea
            </p>
        </div>

        <div class="mensajes_tip">

            <p id="mensaje5" class="mensajesTP content_item5 datos_escanear_text datos_escanear">
                OCR
            </p>

            <p id="mensaje1 " class="mensajesTP content_item4 datos_escanear_text datos_escanear">
                Acta de Nacimiento
            </p>

            <p id="mensaje2" class="mensajesTP content_item2 datos_escanear_text datos_escanear">
                CURP
            </p>


            <p id="mensaje3" class="mensajesTP content_item3 datos_escanear_text datos_escanear">
                Constancia P.Fisica
            </p>


            <p id="mensaje4" class="mensajesTP content_item4 datos_escanear_moral  ">
                Constancia P. Moral
            </p>

        </div>

        <div class="nd1 nds datos_escanear"><img class="reminder">
            <img class="edit" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Tooltip on left"
                src="certificate.png" onclick="abrir_video(3)">
        </div>

        <div class="nd3 nds datos_escanear"><img class="reminder">
            <img class="edit" src="cv.png" onclick="abrir_video(2)">
        </div>
        <div class="nd4 nds datos_escanear"><img class="reminder">
            <img class="edit" src="user-data.png" onclick="abrir_video(1)">
        </div>
        <div id="buttonOCR" class="nd5 nds datos_escanear"><img class="reminder">
            <img class="edit" src="ocr.png" onclick="abrir_videoOCR()">
        </div>


        <div id="ES_costancia_moral" class="nd1 nds datos_escanear_moral">
            <img class="edit" src="building.png" onclick="abrir_video(4)">
        </div>

        <div id="floating-button">
            <img src="not-scan.png" class="plus">
            <img class="edit" src="scan.png">
        </div>
    </div>
    <div id="pagina">


        <h2 class="form__titulo">
            <img src="http://notariosatinet.com.mx/utilerias_appliweb/LogoAtinetSinFondo.png" class="img1" alt="atinet"
                width="200" height="auto" align="center">
            <img src="logo-notario.jpg" class="img1" alt="atinet" width="196" align="center">

            <!--  -->

        </h2>
        <form action="registrar.php" method="post" class="form-register">

            <!-- Acordeon Contenedor principal inicio -->
            <div class="accordion" id="accordionExample">
                <div id="particles-js">
                </div>


                <!-- Acordeon Datos Generales inicio -->
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Datos Generales
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">

                            <div class="grid_1Comp">
                                <label class="inputGrid1_Text"></label>
                                <label class="inputGrid2_Text">Nombre</label>
                                <select name="persona" id="persona" onchange="tipo_de_persona(this.value)"
                                    class="input3 inputGrid1">
                                    <option value="fisica">Persona Física</option>
                                    <option value="moral">Persona Moral</option>
                                </select>
                                <input type="text" id="nombre" name="nombre" placeholder="Nombre (s)"
                                    class="input3 inputGrid2">
                            </div>
                            <div class="grid_1Comp">
                                <label class="inputGrid1_Text">Alias</label>
                                <label class="inputGrid2_Text">Apellido Paterno</label>
                                <input type="text" id="alias" name="alias" placeholder="Alias"
                                    class="input3 inputGrid1">
                                <input type="text" id="apellidopat" name="apellidopat" placeholder="Apellido Paterno"
                                    class="input3 inputGrid2">
                            </div>
                            <div class="grid_1Comp">
                                <label class="inputGrid1_Text">Apellido Materno</label>
                                <label class="inputGrid2_Text">Genero</label>
                                <input type="text" id="apellidomat" name="apellidomat" placeholder="Apellido Materno"
                                    class="input3 inputGrid1">
                                <select name="genero" id="genero" class="input3 inputGrid2">
                                    <option value="">Genero</option>
                                    <option value="HOMBRE">HOMBRE</option>
                                    <option value="MUJER">MUJER</option>
                                </select>

                            </div>
                            <div class="grid_1Comp">
                                <label class="inputGrid1_Text">Pais de Nacimiento</label>
                                <label class="inputGrid2_Text">Nacionalidad</label>

                                <select name="paisnac" id="paisnac" class="input3 inputGrid1">
                                    <option id="opcion_nacimiento" value=" ">Pais de Nacimiento:</option>
                                    <?php
                                    $query =  $conexion2->query("SELECT * FROM catpaises");
                                    while ($valores = mysqli_fetch_array($query)) {
                                        // En esta sección estamos llenando el select con datos extraidos de una base de datos.
                                        echo '<option value="' . $valores['Nombre'] . '">' . $valores['Nombre'] . '</option>';
                                    }
                                    ?>
                                </select>



                                <select name="nacionalidad" id="nacionalidad" class="input3 inputGrid2">
                                    <option id="opcion_nacionalidad" value=" ">Nacionalidad:</option>
                                    <?php
                                    $query =  $conexion2->query("SELECT * FROM cat_nacionalidad");
                                    while ($valores = mysqli_fetch_array($query)) {
                                        // En esta sección estamos llenando el select con datos extraidos de una base de datos.
                                        echo '<option value="' . $valores['Nacionalidad'] . '">' . $valores['Nacionalidad'] . '</option>';
                                    }
                                    ?>
                                </select>

                            </div>
                            <div class="grid_1Comp">
                                <label class="inputGrid1_Text">Estado de Nacimiento</label>
                                <label class="inputGrid2_Text">Ciudad/Localidad de Nacimiento</label>

                                <input type="text" id="e_nac" name="e_nac" placeholder="Estado de Nacimiento"
                                    class="input3 inputGrid1">
                                <input type="text" id="c_nac" name="c_nac" placeholder="Ciudad/Localidad de Nacimiento"
                                    class="input3 inputGrid2">
                            </div>
                            <div class="grid_1Comp">

                                <label class="inputGrid1_Text">Municipio de Nacimiento</label>
                                <label class="inputGrid2_Text">Ocupación</label>

                                <input type="text" id="m_nac" name="m_nac" placeholder="Municipio de Nacimiento"
                                    class="input3 inputGrid1">
                                <input type="text" id="ocupacion" name="ocupacion" placeholder="Ocupacion"
                                    class="input3 inputGrid2">
                            </div>

                            <!--------->

                            <!--------->

                            <div class="grid-2">
                                <a href="https://www54.sat.gob.mx/curp/Consult" target="_blank" id="rfc_Text"
                                    class="link">Consulta tu RFC aquí</a>
                                <a class="curp link" href="https://www.gob.mx/curp/" target="_blank"
                                    id="rfc_Curp">Consulta tu
                                    CURP aquí</a>
                                <input type="text" id="rfc" name="rfc" maxlength="13" placeholder="RFC" class="input3"
                                    oninput="convertirMayusculas(this)">

                                <input type="text" id="curp" name="curp" maxlength="18" placeholder="CURP"
                                    class="input3" oninput="convertirMayusculas(this)">


                            </div>
                            <div>
                                <span>Fecha De Nacimiento</span>
                            </div>
                            <div class="grid-1">
                                <input type="date" id="dia" name="dia" placeholder="Dia" class="input3">
                            </div>

                            <div class="grid_1Comp">

                                <label class="inputGrid1_Text">Estado Civil</label>
                                <label class="inputGrid2_Text" id="regimenText" style="display: none;">Tipo de
                                    cónyuge</label>
                                <select name="civil" id="civil" class="input3 inputGrid1" onchange="muestraMas();">
                                    <option value="">Estado Civil</option>
                                    <option value="Soltero">Soltero</option>
                                    <option value="Casado">Casado</option>
                                    <option value="Divorciado">Divorciado</option>
                                    <option value="Viudo">Viudo</option>
                                </select>


                                <select name="regimen" id="regimen" style="display: none;"
                                    class="input-48 input-100 input3 inputGrid2">
                                    <option value="">Tipo de cónyuge</option>
                                    <option value="Sociedad conyugal">Sociedad Conyugal</option>
                                    <option value="Separacion de bienes">Separacion de bienes</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- Acordeon conyugue inicio -->
                <div class="accordion-item" id="Plus_Conyugue" onchange="muestraMas();">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Datos del Cónyuge
                        </button>
                    </h2>
                    <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">




                            <div class="grid_1Comp">

                                <label class="inputGrid1_Text">Estado Civil</label>
                                <label class="inputGrid2_Text">Tipo de
                                    cónyuge</label>

                                <input type="text" name="nombre_conyugue" id="nombre_conyuge" placeholder="Nombre (s)"
                                    class="input3 datos_conyugal">

                                <input type="text" name="apellidopat_conyugue" id="apellidopat_conyugue"
                                    placeholder="Apellido Paterno" class="input3 datos_conyugal">

                            </div>

                            <div class="grid_1Comp">

                            </div>

                            <div class="grid_1Comp">

                            </div>

                            <div class="grid_1Comp">

                            </div>

                            <div class="grid-5">



                                <input type="text" name="apellidomat_conyugue" id="apellidomat_conyugue"
                                    placeholder="Apellido Materno" class="input3 datos_conyugal">

                                <input type="text" name="doc_id" placeholder="Doc. Identificación" id="doc_id"
                                    class="input3">

                                <input type="number" name="num_doc_id" placeholder="Num. Doc. Identificación"
                                    class="input3 datos_conyugal">

                                <input type="text" name="autoridad_emisora" id="autoridad_emisora"
                                    placeholder="Autoridad Emisora" class="input3 datos_conyugal">

                            </div>

                        </div>
                    </div>
                </div>
                <!-- Acordeon Domicilio/ Lugar item inicio -->
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Domicilio
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">



                            <div>
                                <br>
                                <span>Domicilio Particular</span><br>
                            </div>

                            <div class="grid-3">
                                <input type="text" id="calle" name="calle" placeholder="Calle" class="input3">



                                <input type="text" id="ext" name="ext" placeholder="No.Ext" class="input3">

                                <input type="text" id="int" name="int" placeholder="No.Int" class="input3">

                                <input type="text" id="manzana" name="manzana" placeholder="Manzana" class="input3">

                                <input type="number" id="lote" name="lote" placeholder="Lote" class="input3 ">

                                <input type="number" id="cp" name="cp" placeholder="Codigo Postal" class="input3"
                                    oninput="buscarCodigoYColonias()">



                                <select name="colonia" id="colonia" class="input3">
                                    <option value="">Selecciona una colonia </option>
                                </select>
                                <input type="text" id="municipio" name="municipio" placeholder="Municipio"
                                    class="input3 ">

                                <input type="text" id="estado" name="estado" placeholder="Estado" class="input3 ">

                                <input type="text" id="ciudad" name="ciudad" placeholder="Ciudad/Localidad"
                                    class="input3 ">


                                <select name="pais" id="pais" class="input3">
                                    <option id="opcion_pais" value=" ">País</option>
                                    <?php
                                    $query =  $conexion2->query("SELECT * FROM catpaises");
                                    while ($valores = mysqli_fetch_array($query)) {
                                        echo '<option value="' . $valores['Nombre'] . '">' . $valores['Nombre'] . '</option>';
                                    }
                                    ?>
                                </select>

                            </div>
                            <div class="grid-3">
                                <input type="button" class="input3" value="Copiar Dirección" id="copy_direccion">
                            </div>
                            <div>
                                <br><br>
                                <span>Domicilio Fiscal</span> <br>
                            </div>
                            <div class="grid-3">
                                <input type="text" id="calle_fiscal" name="calle_fiscal" placeholder="Calle"
                                    class="input3">

                                <input type=" text" id="ext_fiscal" name="ext_fiscal" placeholder="No.Ext"
                                    class="input3">
                                <input type="text" id="int_fiscal" name="int_fiscal" placeholder="No.Int"
                                    class="input3">

                                <input type="text" id="manzana_fiscal" name="manzana_fiscal" placeholder="Manzana"
                                    class="input3">

                                <input type="number" id="lote_fiscal" name="lote_fiscal" placeholder="Lote"
                                    class="input3 ">
                                <input type="number" id="cp_fiscal" name="cp_fiscal" placeholder="Codigo Postal"
                                    class="input3 " oninput="buscarCodigoYColonias('_fiscal')">

                                <select name="colonia_fiscal" id="colonia_fiscal" class="input3">
                                    <option value="">Selecciona una colonia</option>
                                </select>

                                <input type="text" id="municipio_fiscal" name="municipio_fiscal" placeholder="Municipio"
                                    class="input3 ">

                                <input type="text" id="estado_fiscal" name="estado_fiscal" placeholder="Estado"
                                    class="input3 ">


                                <input type="text" id="ciudad_fiscal" name="ciudad_fiscal"
                                    placeholder="Ciudad/Localidad" class="input3 ">


                                <select name="pais_fiscal" id="pais_fiscal" class=" input3">
                                    <option id="opcion_pais_fiscal" value=" ">Pais</option>
                                    <?php
                                    $query =  $conexion2->query("SELECT * FROM catpaises");
                                    while ($valores = mysqli_fetch_array($query)) {
                                        // En esta sección estamos llenando el select con datos extraidos de una base de datos.
                                        echo '<option value="' . $valores['Nombre'] . '">' . $valores['Nombre'] . '</option>';
                                    }

                                    ?>
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- Acordeon Datos contacto inicio -->
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Datos de Contacto
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">

                            <div class="grid-1">
                                <input type="number" id="telefono" name="telefono" maxlength="15" placeholder="Teléfono"
                                    class="input3">

                                <input type="number" id="telefono_oficina" name="telefono_oficina" maxlength="15"
                                    placeholder="Teléfono Oficina" class="input3">

                                <input type="number" id="telefono_movil" name="telefono_movil" maxlength="15"
                                    placeholder="Teléfono Móvil" class="input3">

                                <input type="email" id="correo" name="correo"
                                    placeholder="Correo ej: ejemplo@hotmail.com" class="input3">
                                <input type="email" id="correo2" name="correo2"
                                    placeholder="Correo 2 ej: ejemplo@hotmail.com" class="input3">
                                <input type="text" id="identificacion" name="identificacion"
                                    placeholder="Documento con el que se Identifica" class="input3">

                                <input type="text" maxlength="20" id="noidentificacion" name="noidentificacion"
                                    placeholder="Numero del Documento de Identificación" class="input3">

                                <input type="text" id="AutoridadEmisora2" name="AutoridadEmisora2"
                                    placeholder="Autoridad Emisora" class="input3">

                                <select required name="regimen_fiscal_opciones" class="input3" id="regimen_fiscal">
                                    <option disabled selected>Regimen Fiscal</option>
                                    <?php
                                    $querycatregimenfiscal =  $conexion2->query("SELECT * FROM catregimenfiscal ORDER BY Clave");
                                    while ($valores = mysqli_fetch_array($querycatregimenfiscal)) {
                                        // En esta sección estamos llenando el select con datos extraidos de una base de datos.
                                        echo '<option value="' . $valores['Descripcion'] . '">' . '(' . $valores['Clave'] . ') - ' . $valores['Descripcion'] . '</option>';
                                    }

                                    ?>

                                </select>
                                <input type="text" class="input3" id="ocr" name="ocr" placeholder="ocr">
                                <input type="text" class="input3" id="idmex" name="idmex" placeholder="idmex">
                            </div>
                            <div>
                                <span id="mes_dia_text">Vigencia de la INE</span>
                            </div>
                            <div class="grid-4">
                                <input type="month" name="mes_dia" min="1900-01" max="2100-01" id="mes_dia"
                                    placeholder="mes" class="input3">
                                <input type="hidden" id="dia_escondido" name="vigencia_de_ine">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bdDown">
                <p style='width:100%'>&nbsp;&nbsp;</p>

                <p style='width:100%'>&nbsp;&nbsp;</p>

                <!--<label class="input-48" align="left">CURP</label>-->
                <input type="submit" name="registrar" value="Enviar" class="btn-enviar" id="btn_enviar">
                <br>
                <a class="a2" href=http://notariosatinet.com.mx/utilerias_appliweb/AVISODEPRIVACIDAD.pdf>Aviso de
                    Privacidad</a>

            </div>




        </form>

    </div>
    <div id="ventana_popul">
        <span onclick="cerrar_ventana_video()" title="cerrar ventana" id=" cerrar_ventana_popul"
            class="close_Button">&times;</span>
        <script src="ht.js"></script>
        <div class="row">
            <div class="col">
                <div style="width:500px;" id="reader"></div>
            </div>
            <div class="col" style="padding:30px;">
                <input type="hidden" name="start" class="input" id="result" placeholder="result here" readonly="" />

            </div>
        </div>
    </div>

    <div id="ventana_ocr">
        <span onclick="cerrar_ventana_videoOCR()" title="Cerrar ventana" id="" class="close_Button">&times;</span>
        <div id="ventana_ocr_div" class="contentVentana">
            <section id="demos" class="invisible">


                <div id="liveView">


                    <div id="ani_Post2">
                        <p id="estatico"></p>
                        <p id="status"></p>
                        <p class="title-ine" id="title_INE">Escanea la parte de enfrente</p>

                    </div>
                    <div id="ani_Post3">
                        <img src="ine-example.png" alt="" class="ine-example" id="img_Ine">
                    </div>
                    <div id="ani_Post">
                        <video id="webcam" autoplay></video>
                        <select name="camera" id="opciones">
                            <!-- <option value="">Seleccione una cámara</option> -->
                        </select>
                        <div class="col1">
                            <button id="webcamButton">Habilitar</button>
                        </div>
                    </div>


                    <canvas id="canva" width="640" height="480" style="display: none;"></canvas>

                    <canvas id="canvas2" style="display: none;">Esta es una etiqueta canvas</canvas>


                </div>
            </section>
            <section id="tarjeta_ocr_reverso">
                <p>Darle la vuelta a la identificación</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="40%" style="color: white;" height="40%"
                    fill="currentColor" class="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                    <path
                        d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
                </svg>
                <div class="col1">
                    <button id="comenzar_parte_atras">Comenzar</button>
                </div>
            </section>
        </div>
    </div>

    <script src="particles/particles.min.js"></script>
    <script>
    particlesJS({
        "particles": {
            "number": {
                "value": 152,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#cfbb73"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 126.26362266116361,
                "color": "#b39e53",
                "opacity": 0.7260158303016908,
                "width": 0.9620472365193136
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "bounce",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": false,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    })

    document.getElementById("btn_enviar").addEventListener("click", function(event) {
        // Obtener los valores de los campos
        event.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const apellidoPaterno = document.getElementById("apellidopat").value.trim();
        const apellidoMaterno = document.getElementById("apellidomat").value.trim();
        const curp = document.getElementById("curp").value.trim();
        const rfc = document.getElementById("rfc").value.trim();
        const persona = document.getElementById("persona").value;

        let nombre_conyugue = document.getElementById("nombre_conyugue") ? document.getElementById(
            "nombre_conyugue").value.trim() : "";
        const civil = document.getElementById("civil").value;
        let apellidopat_conyugue = document.getElementById("apellidopat_conyugue") ? document.getElementById(
            "apellidopat_conyugue").value.trim() : "";

        let apellidomat_conyugue = document.getElementById("apellidomat_conyugue") ? document.getElementById(
            "apellidomat_conyugue").value.trim() : "";
        var fecha_nac = document.getElementById("dia").value;
        var mes_dia = document.getElementById("mes_dia").value;

        // Crear un array con los campos faltantes
        const camposFaltantes = [];
        const camposFaltantes2 = [];
        if (persona == 'fisica') {
            if (!nombre) camposFaltantes.push("Nombre");
            if (!apellidoPaterno) camposFaltantes.push("Apellido Paterno");
            if (!apellidoMaterno) camposFaltantes.push("Apellido Materno");
            if (!curp) camposFaltantes.push("CURP");
            if (!fecha_nac) camposFaltantes.push("Fecha de Nacimiento");
            if (civil == "Casado" && nombre_conyugue == "") camposFaltantes.push("Nombre conyugue");
            if (civil == "Casado" && apellidopat_conyugue == "") camposFaltantes.push(
                "Apellido paterno conyugue");
            if (civil == "Casado" && apellidomat_conyugue == "") camposFaltantes.push(
                "Apellido materno conyugue");
        } else if (persona == 'moral') {
            if (!nombre) camposFaltantes.push("Denominación Social");
            if (!fecha_nac) camposFaltantes.push("Fecha de Constitucion")
        }


        // Si hay campos vacíos, mostrar la alerta y prevenir el envío
        if (camposFaltantes.length > 0) {
            event.preventDefault(); // Prevenir que el formulario se envíe

            // Construir el mensaje
            const mensaje = `Los siguientes campos son obligatorios:\n- ${camposFaltantes.join("\n- ")}`;

            // Mostrar alerta tipo toast
            Swal.fire({
                icon: "warning",
                title: "¡Atención!",
                html: mensaje.replace(/\n/g, "<br>"),
                toast: true,
                position: "top-end",
                timer: 4000,
                timerProgressBar: true,
                showConfirmButton: false
            });
        }

        // Validar CURP
        if (curp.length > 0 && curp.length < 18 && persona === "fisica") {
            camposFaltantes2.push("CURP");
        }

        // Validar RFC
        if (rfc.length > 0) {
            if (persona === "fisica" && rfc.length < 13) {
                camposFaltantes2.push("RFC");
            } else if (persona === "moral" && rfc.length < 12) {
                camposFaltantes2.push("RFC");
            }
        }

        fecha_nac = new Date(fecha_nac)
        if (persona === "fisica") {
            if (fecha_nac < new Date('1900-01-01') || fecha_nac > new Date()) {
                camposFaltantes2.push("La fecha de nacimiento debe ser una fecha valida");
            }
        } else if (persona === "moral") {
            if (fecha_nac < new Date('1900-01-01') || fecha_nac > new Date()) {
                camposFaltantes2.push("La fecha de constitucion debe ser una fecha valida");
            }
        }

        const fecha1 = new Date('1900-01-01');
        const fecha2 = new Date('2100-12-31');
        const mesAnio = [];

        // Formatear las fechas como "YYYY-MM"
        mesAnio[0] = fecha1.toISOString().slice(0, 7);
        mesAnio[1] = fecha2.toISOString().slice(0, 7);

        // Validación
        if (mes_dia.length > 0 && persona === "fisica") { // Corregir comillas faltantes
            if (mes_dia > mesAnio[1] || mes_dia < mesAnio[0]) {
                camposFaltantes2.push("La vigencia debe ser una fecha válida");
            }
        }

        // Mostrar mensaje si hay campos incompletos
        if (camposFaltantes2.length > 0) {
            event.preventDefault(); // Prevenir que el formulario se envíe

            // Construir el mensaje
            const mensaje = `Los siguientes campos están incompletos:\n- ${camposFaltantes2.join("\n- ")}`;

            // Mostrar alerta tipo toast
            Swal.fire({
                icon: "warning",
                title: "¡Atención!",
                html: mensaje.replace(/\n/g, "<br>"),
                toast: true,
                position: "top-end",
                timer: 4000,
                timerProgressBar: true,
                showConfirmButton: false
            });
        }

    });
    </script>
    <script defer src="main_nuevo.js"></script>
    <!-- Import TensorFlow.js library -->
    <script defer src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js" type="text/javascript"></script>
    <!-- Load the coco-ssd model to use to recognize things in images -->
    <script defer src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"></script>

    <!-- Import the page's JavaScript to do some stuff -->
    <script type="text/javascript" src="script_ocr.js" defer></script>

    <!-- FileSaver external script file for saveAs() -->
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js"></script>


    <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script defer src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script defer src="https://code.jquery.com/jquery-1.12.4.min.js"
        integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.min.js"></script>
    <link defer rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link defer rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">

</body>

</html>
</body>

</html>