<?php
//include('/home3/atinet65/notariosatinet.com.mx/utilerias_appliweb/conexion.php');
include('src/conexion.php');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>

<!DOCTYPE html>
<html>

<head>
    <link rel="icon" href="https://notariosatinet.com.mx/utilerias_appliweb/Logocabecera.png" type="image/png">
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width" />
    <title>Notaría Master</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/style_ocr.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/style2.scss">
    <link rel="stylesheet" href="assets/css/manual_style.css">
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>  -->
    <script src="assets/js/validar.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="assets/js/myjava.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
        integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous">
    </script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <!-- JavaScript -->
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/alertify.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/date-fns@4.1.0/cdn.min.js"></script>

    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/alertify.min.css" />

    <script async src="https://docs.opencv.org/4.5.5/opencv.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="assets/js/resemble.js" defer></script>
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
                INE IA
            </p>

            <p id="mensaje3" class="mensajesTP content_item3 datos_escanear_text datos_escanear">
                QR Escáner
            </p>


            <!-- <p id="mensaje4" class="mensajesTP content_item4 datos_escanear_moral  ">
                Constancia P. Moral
            </p> -->

        </div>

        <div class="nd1 nds datos_escanear"><img class="reminder">
            <img class="edit" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Tooltip on left"
                src="assets/img/certificate.png" onclick="abrir_video(3)">
        </div>

        <!-- <div class="nd3 nds datos_escanear"><img class="reminder">
            <img class="edit" src="../assets/img/cv.png" onclick="abrir_video(2)">
        </div>
        <div class="nd4 nds datos_escanear"><img class="reminder">
            <img class="edit" src="../assets/img/user-data.png" onclick="abrir_video(1)">
        </div> -->
        <div id="buttonOCR" class="nd3 nds datos_escanear"><img class="reminder">
            <img class="edit" src="assets/img/ocr.png" onclick="abrir_videoOCR()">
        </div>
        <!-- 
        <div id="ES_costancia_moral" onclick="abrir_video(4)" class="nd1 nds datos_escanear_moral">
            <img src="../assets/img/building.png" class="edit">
        </div> -->

        <div id="floating-button">
            <img src="assets/img/not-scan.png" class="plus">
            <img class="edit" src="assets/img/scan.png">
        </div>
    </div>
    <div id="pagina">

        <h2 class="form__titulo">
            <img src="http://notariosatinet.com.mx/utilerias_appliweb/LogoAtinetSinFondo.png" class="img1" alt="atinet"
                width="200" height="auto" align="center">
            <img src="logo-notario.jpg" class="img1" alt="atinet" width="196" align="center">

        </h2>
        <form action="src/registrar.php" onsubmit="convertir_mayusculas()" method="post" class="form-register">
            <input type="text" id="id_escondido_registro" value="" style="display: none;" name="id_escondido_registro">
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
                                <label id="text_alias" class="inputGrid2_Text">Alias</label>

                                <select name="persona" id="persona" onchange="tipo_de_persona(this.value)"
                                    class="input3 inputGrid1">
                                    <option value="fisica">Persona Física</option>
                                    <option value="moral">Persona Moral</option>
                                </select>

                                <input type="text" id="alias" name="alias" placeholder="Alias"
                                    class="input3 inputGrid2">

                            </div>
                            <div class="grid_1Comp" id="grid-1-moral">
                                <label id="apellido_pa_text" class="inputGrid2_Text">Apellido Paterno</label>
                                <label id="nombre_text" class="inputGrid1_Text ">Nombre</label>

                                <input type="text" id="nombre" name="nombre" placeholder="Nombre (s)"
                                    class="input3 inputGrid3">
                                <input type="text" id="apellidopat" name="apellidopat" placeholder="Apellido Paterno"
                                    class="input3 inputGrid2">
                            </div>
                            <div class="grid_1Comp" id="grid-2-moral">
                                <label id="apellido_mat_text" class="inputGrid1_Text">Apellido Materno</label>
                                <label id="texto_genero" class="inputGrid2_Text">Genero</label>
                                <input type="text" id="apellidomat" name="apellidomat" placeholder="Apellido Materno"
                                    class="input3 inputGrid1">
                                <select name="genero" id="genero" class="input3 inputGrid2">
                                    <option value="">Genero</option>
                                    <option value="HOMBRE">HOMBRE</option>
                                    <option value="MUJER">MUJER</option>
                                </select>

                            </div>
                            <div class="grid_1Comp">
                                <label class="inputGrid1_Text">País de Nacimiento </label>

                                <select placeholder=" País de Nacimiento " name="paisnac" id="pais_nacimeinto_lista"
                                    class="input3 inputGrid1 ">
                                    <?php
                                    $query = $conexion2->query("SELECT * FROM catpaises");
                                    while ($valores = mysqli_fetch_array($query)) {
                                        // En esta sección estamos llenando el select con datos extraidos de una base de datos.
                                        echo '<option value="' . $valores['Nombre'] . '">' . $valores['Nombre'] . '</option>';
                                    }
                                    ?>
                                </select>

                                <!-- <input list="paisnac" placeholder=" País de Nacimiento " name="paisnac"
                                    id="pais_nacimeinto_lista" class="input3 inputGrid1"> -->
                                <label class="inputGrid2_Text">Nacionalidad</label>

                                <select id="nacionalidad_input" name="nacionalidad" class="input3 inputGrid2"
                                    placeholder="Nacionalidad">
                                    <?php
                                    $query = $conexion2->query("SELECT * FROM cat_nacionalidad");
                                    while ($valores = mysqli_fetch_array($query)) {
                                        // En esta sección estamos llenando el select con datos extraidos de una base de datos.
                                        echo '<option value="' . $valores['Nacionalidad'] . '">' . $valores['Nacionalidad'] . '</option>';
                                    }
                                    ?>
                                </select>
                                <!-- <input list="nacionalidad" id="nacionalidad_input" name="nacionalidad"
                                    class="input3 inputGrid2" placeholder="Nacionalidad"> -->
                                <!-- <datalist id="paisnac" class="input3 inputGrid1">
                                    <?php
                                    $query = $conexion2->query("SELECT * FROM catpaises");
                                    while ($valores = mysqli_fetch_array($query)) {
                                        // En esta sección estamos llenando el select con datos extraidos de una base de datos.
                                        echo '<option value="' . $valores['Nombre'] . '">' . $valores['Nombre'] . '</option>';
                                    }
                                    ?>
                                </datalist>


                                <datalist id="nacionalidad" class="input3 inputGrid2">
                                    <?php
                                    $query = $conexion2->query("SELECT * FROM cat_nacionalidad");
                                    while ($valores = mysqli_fetch_array($query)) {
                                        // En esta sección estamos llenando el select con datos extraidos de una base de datos.
                                        echo '<option value="' . $valores['Nacionalidad'] . '">' . $valores['Nacionalidad'] . '</option>';
                                    }
                                    ?>
                                </datalist> -->

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
                                <label id="ocupacion_texto" class="inputGrid2_Text">Ocupación</label>

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
                                    oninput="convertirMayusculas(this); verificar_persona_bd()">

                                <input type="text" id="curp" name="curp" maxlength="18" placeholder="CURP"
                                    class="input3" oninput="convertirMayusculas(this); verificar_persona_bd()">


                            </div>
                            <div class="diaText">
                                <span id="text_fecha_nacimiento"> Fecha De Nacimiento</span>
                            </div>
                            <div class="grid-1">
                                <input type="date" id="dia" name="dia" placeholder="Dia" class="input3">
                            </div>

                            <div class="grid_1Comp">

                                <label id="estado_civil_texto" class="inputGrid1_Text">Estado Civil</label>
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
                                    <option value="Separacion de bienes">Separación de bienes</option>
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

                                <label class="inputGrid1_Text">Nombre Cónyuge</label>
                                <label class="inputGrid2_Text">Apellido Paterno Cónyuge</label>

                                <input type="text" name="nombre_conyugue" id="nombre_conyuge" placeholder="Nombre (s)"
                                    class="input3 datos_conyugal inputGrid1">

                                <input type="text" name="apellidopat_conyugue" id="apellidopat_conyugue"
                                    placeholder="Apellido Paterno" class="input3 datos_conyugal inputGrid2">

                            </div>

                            <div class="grid_1Comp">

                                <label class="inputGrid1_Text">Apellido Materno Cónyuge</label>
                                <label class="inputGrid2_Text">Documento de Identificación</label>

                                <input type="text" name="apellidomat_conyugue" id="apellidomat_conyugue"
                                    placeholder="Apellido Materno" class="input3 datos_conyugal inputGrid1">

                                <input type="text" name="doc_id" placeholder="Doc. Identificación" id="doc_id"
                                    class="input3 datos_conyugal inputGrid2">

                            </div>

                            <div class="grid_1Comp">

                                <label class="inputGrid1_Text">Número del Documento de Identificación</label>
                                <label class="inputGrid2_Text">Autoridad Emisora</label>
                                <input type="number" name="num_doc_id" id="num_doc_id_emicion"
                                    placeholder="Num. Doc. Identificación" class="input3 datos_conyugal">

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
                                <span>Domicilio Particular</span><br><br>
                            </div>

                            <div class="grid_2Comp">
                                <label class="inputGrid1_TextDos">Calle</label>
                                <label class="inputGrid2_TextDos">No. Exterior</label>
                                <label class="inputGrid3_TextDos">No. Interior</label>

                                <input type="text" id="calle" name="calle" placeholder="Calle"
                                    class="input3 inputGrid1_Dos">

                                <input type="text" id="ext" name="ext" placeholder="No.Ext"
                                    class="input3 inputGrid2_Dos">

                                <input type="text" id="int" name="int" placeholder="No.Int"
                                    class="input3 inputGrid3_Dos">

                            </div>

                            <div class="grid_3Comp">
                                <label class="inputGrid1_TextTres">Manzana</label>
                                <label class="inputGrid2_TextTres">Lote</label>
                                <label class="inputGrid3_TextTres">Código Postal</label>
                                <label class="inputGrid4_TextTres">Colonia</label>

                                <input type="text" id="manzana" name="manzana" placeholder="Manzana"
                                    class="input3 inputGrid1_Tres">

                                <input type="number" id="lote" name="lote" placeholder="Lote"
                                    class="input3 inputGrid2_Tres">

                                <input type="number" id="cp" name="cp" placeholder="Codigo Postal"
                                    class="input3 inputGrid3_Tres" oninput="buscarCodigoYColonias()">

                                <select name="colonia" id="colonia" class="input3 inputGrid4_Tres">
                                    <option value="">Selecciona una colonia </option>
                                </select>

                            </div>

                            <div class="grid_3Comp">
                                <label class="inputGrid1_TextTres">Municipio</label>
                                <label class="inputGrid2_TextTres">Estado</label>
                                <label class="inputGrid3_TextTres">Ciudad/Localidad</label>
                                <label class="inputGrid4_TextTres">País</label>

                                <input type="text" id="municipio" name="municipio" placeholder="Municipio"
                                    class="input3 inputGrid1_Tres">

                                <input type="text" id="estado" name="estado" placeholder="Estado"
                                    class="input3 inputGrid2_Tres">

                                <input type="text" id="ciudad" name="ciudad" placeholder="Ciudad/Localidad"
                                    class="input3 inputGrid3_Tres">
                                <select name="pais" id="pais_1" placeholder="País" class="input3 inputGrid4_Tres">
                                    <?php
                                    $query = $conexion2->query("SELECT * FROM catpaises");
                                    while ($valores = mysqli_fetch_array($query)) {
                                        echo '<option value="' . $valores['Nombre'] . '">' . $valores['Nombre'] . '</option>';
                                    }
                                    ?></select>
                                <!-- <input list="pais" name="pais" id="pais_1" placeholder="País"
                                    class="input3 inputGrid4_Tres"> -->



                            </div>

                            <div class="grid-3">
                                <input type="button" class="input3" value="Copiar Dirección particular a Fiscal"
                                    id="copy_direccion">
                            </div>
                            <div>
                                <br><br>
                                <span>Domicilio Fiscal</span> <br><br>
                            </div>

                            <div class="grid_2Comp">
                                <label class="inputGrid1_TextDos">Calle</label>
                                <label class="inputGrid2_TextDos">No. Exterior</label>
                                <label class="inputGrid3_TextDos">No. Interior</label>

                                <input type="text" id="calle_fiscal" name="calle_fiscal" placeholder="Calle"
                                    class="input3 inputGrid1_Dos">

                                <input type=" text" id="ext_fiscal" name="ext_fiscal" placeholder="No.Ext"
                                    class="input3 inputGrid2_Dos">
                                <input type="text" id="int_fiscal" name="int_fiscal" placeholder="No.Int"
                                    class="input3 inputGrid3_Dos">

                            </div>

                            <div class="grid_3Comp">
                                <label class="inputGrid1_TextTres">Manzana</label>
                                <label class="inputGrid2_TextTres">Lote</label>
                                <label class="inputGrid3_TextTres">Código Postal</label>
                                <label class="inputGrid4_TextTres">Colonia</label>

                                <input type="text" id="manzana_fiscal" name="manzana_fiscal" placeholder="Manzana"
                                    class="input3 inputGrid1_Tres">

                                <input type="number" id="lote_fiscal" name="lote_fiscal" placeholder="Lote"
                                    class="input3 inputGrid2_Tres">
                                <input type="number" id="cp_fiscal" name="cp_fiscal" placeholder="Codigo Postal"
                                    class="input3 inputGrid3_Tres" oninput="buscarCodigoYColonias('_fiscal')">

                                <select name="colonia_fiscal" id="colonia_fiscal" class="input3 inputGrid4_Tres">
                                    <option value="">Selecciona una colonia</option>
                                </select>
                            </div>

                            <div class="grid_3Comp">
                                <label class="inputGrid1_TextTres">Municipio</label>
                                <label class="inputGrid2_TextTres">Estado</label>
                                <label class="inputGrid3_TextTres">Ciudad/Localidad</label>
                                <label class="inputGrid4_TextTres">País</label>

                                <input type="text" id="municipio_fiscal" name="municipio_fiscal" placeholder="Municipio"
                                    class="input3 inputGrid1_Tres">

                                <input type="text" id="estado_fiscal" name="estado_fiscal" placeholder="Estado"
                                    class="input3 inputGrid2_Tres">

                                <input type="text" id="ciudad_fiscal" name="ciudad_fiscal"
                                    placeholder="Ciudad/Localidad" class="input3 inputGrid3_Tres">
                                <select id="pais_fiscal_input" name="pais_fiscal" placeholder="País"
                                    class="input3 inputGrid4_Tres">
                                    <?php
                                    $query = $conexion2->query("SELECT * FROM catpaises");
                                    while ($valores = mysqli_fetch_array($query)) {
                                        // En esta sección estamos llenando el select con datos extraidos de una base de datos.
                                        echo '<option value="' . $valores['Nombre'] . '">' . $valores['Nombre'] . '</option>';
                                    }

                                    ?>
                                </select>
                                <!-- <input list="pais_fiscal" id="pais_fiscal_input" name="pais_fiscal" placeholder="País"
                                    class="input3 inputGrid4_Tres"> -->



                            </div>
                            <div class="grid-3">
                                <input type="button" class="input3" value="Copiar Dirección Fiscal a particular"
                                    id="copy_direccion2">
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

                            <div class="grid_4Comp" id="grid-3-moral">
                                <label id="telefono_texto" class="inputGrid1_TextCuatro">Teléfono</label>
                                <label id="telefono_texto_oficina" class="inputGrid2_TextCuatro">Teléfono
                                    Oficina</label>
                                <label id="telefono_movil_text" class="inputGrid3_TextCuatro">Teléfono Movil</label>
                                <input type="number" id="telefono" name="telefono" maxlength="15" placeholder="Teléfono"
                                    class="input3 inputGrid1_Cuatro">

                                <input type="number" id="telefono_oficina" name="telefono_oficina" maxlength="15"
                                    placeholder="Teléfono Oficina" class="input3 inputGrid2_Cuatro">
                                <input type="number" id="telefono_movil" name="telefono_movil" maxlength="15"
                                    placeholder="Teléfono Móvil" class="input3 inputGrid3_Cuatro">

                            </div>
                            <div class="grid_1Comp">
                                <label class="inputGrid1_Text">Correo</label>
                                <label class="inputGrid2_Text">Correo - 2</label>

                                <input type="email" id="correo" name="correo"
                                    placeholder="Correo ej: ejemplo@hotmail.com" class="input3 inputGrid1">
                                <input type="email" id="correo2" name="correo2"
                                    placeholder="Correo 2 ej: ejemplo@hotmail.com" class="input3 inputGrid2">
                            </div>
                            <div class="grid_1Comp" id="grid-4-moral">

                                <label id="documento_id_texto" class="inputGrid1_Text">Documento con el que se
                                    Identifica</label>
                                <label id="numero_texto" class="inputGrid2_Text">Número del Documento de
                                    Identificación</label>
                                <input type="text" id="identificacion" name="identificacion"
                                    placeholder="Documento con el que se Identifica" class="input3 inputGrid1">
                                <input type="text" maxlength="20" id="noidentificacion" name="noidentificacion"
                                    placeholder="Numero del Documento de Identificación" class="input3 inputGrid2">

                            </div>
                            <div class="grid_1Comp">
                                <label id="autoridad_emisora_texto" class="inputGrid1_Text">Autoridad Emisora</label>
                                <label class="inputGrid2_Text">Régimen Fiscal</label>

                                <input type="text" id="AutoridadEmisora2" name="AutoridadEmisora2"
                                    placeholder="Autoridad Emisora" class="input3 inputGrid1">
                                <select name="regimen_fiscal_opciones" class="input3 inputGrid2" id="regimen_fiscal">
                                    <option value="">Régimen Fiscal</option>
                                    <?php
                                    $querycatregimenfiscal = $conexion2->query("SELECT * FROM catregimenfiscal ORDER BY Clave");
                                    while ($valores = mysqli_fetch_array($querycatregimenfiscal)) {
                                        // En esta sección estamos llenando el select con datos extraidos de una base de datos.
                                        echo '<option value="' . $valores['Descripcion'] . '">' . '(' . $valores['Clave'] . ') - ' . $valores['Descripcion'] . '</option>';
                                    }

                                    ?>

                                </select>
                            </div>
                            <div class="grid_1Comp">
                                <label id="OCR_text" class="inputGrid1_Text">OCR</label>
                                <label id="IDMEX_text" class="inputGrid2_Text">IDMEX</label>

                                <input type="text" class="input3 inputGrid1" id="ocr" name="ocr" placeholder="ocr">
                                <input type="text" class="input3 inputGrid2" id="idmex" name="idmex"
                                    placeholder="idmex">

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




                <button id="borrar_datos" class="button-Erase">
                    <div>
                        <span>Vaciar Datos</span>
                        <span class="text-Vaciar-On">Vaciar Datos</span>
                    </div>
                </button>

                <input type="submit" name="registrar" value="Enviar" class="btn-enviar" id="btn_enviar">
                <br>
                <a class="a2" href=http://notariosatinet.com.mx/utilerias_appliweb/AVISODEPRIVACIDAD.pdf>Aviso de
                    Privacidad</a>
                <div class="versionText">
                    <p>v1.2.2 </p>
                </div>
            </div>

        </form>

    </div>
    <div id="ventana_popul">
        <span onclick="cerrar_ventana_video()" title="cerrar ventana" id=" cerrar_ventana_popul"
            class="close_Button">&times;</span>
        <script src="assets/js/ht.js"></script>
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


                <ect id="liveView">


                    <div id="ani_Post2">
                        <p id="estatico"></p>
                        <p id="status"></p>
                        <p class="title-ine" id="title_INE">Escanea la parte de enfrente</p>

                    </div>
                    <div id="ani_Post3">
                        <img src="assets/img/ine-example.png" alt="" class="ine-example" id="img_Ine">
                    </div>
                    <div id="ani_Post">
                        <div class="WebIne">
                            <video id="webcam" muted autoplay></video>
                            <!--<div class="ContornoIne"></div>-->
                        </div>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="40%" style="color: white;" height="40%" fill="currentColor"
                class="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
            </svg>
            <div class="col1">
                <button id="comenzar_parte_atras">Comenzar</button>
            </div>
        </section>
    </div>
    <!---< /div>--->

    <div class="CargaAtinet-Contenedor" id="carga_Ati">
        <div class="cargaAtinet-1"></div>
        <div class="cargaAtinet-2"></div>
        <div class="cargaAtinet-3"></div>
        <div class="cargaAtinet-4"></div>
        <div class="cargaAtinet-centro"></div>
        <div class="cargaAtinet-centro-3"></div>
        <div class="cargaAtinet-centro-2">
            <p>@</p>
        </div>
    </div>

    <div class="CargaAtinet-Contenedor-2" id="carga_Ati_2">
        <div class="cargaAtinet-1"></div>
        <div class="cargaAtinet-2"></div>
        <div class="cargaAtinet-3"></div>
        <div class="cargaAtinet-4"></div>
        <div class="cargaAtinet-centro"></div>
        <div class="cargaAtinet-centro-3"></div>
        <div class="cargaAtinet-centro-2">
            <p>@</p>
        </div>
    </div>
    <!--------------------------------------Manual------------------------------------------------------>
    <div class="manualUso_Contenedor" id="manualUso_Cont">
        <div class="close_Button_Manual" id="close_Button_Manual">X</div>
        <div class="index_Manual">
            <p>Manual de Usuario</p>
        </div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                    type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                    Indíce
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
                    type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                    Bloques
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane"
                    type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">
                    Botones
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="wa-tab" data-bs-toggle="tab" data-bs-target="#wa-tab-pane" type="button"
                    role="tab" aria-controls="wa-tab-pane" aria-selected="false">
                    Escáner
                </button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab"
                tabindex="0">
                <div class="manualUso_Contenedor2">
                    <div class="text_ManualUso">
                        <div class="list_Manual">

                            <div class="IndexInp">
                                <span class="IndexInp">1.</span>
                                <span class="spanAbso_1">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                </span>
                                <span class="menuIndexName">Llenado de Campos / Bloques</span>
                            </div>

                            <div>
                                <span>1.1.</span>
                                <span class="spanAbso_2">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                </span>
                                <span class="menuIndexName">Datos Generales: Tipo de Persona y Datos del Cónyuge</span>

                            </div>

                            <div>
                                <span>1.2.</span>
                                <span class="spanAbso_2">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                </span>
                                <span class="menuIndexName">Datos Generales: CURP Y RFC</span>

                            </div>

                            <div>
                                <span>1.3.</span>
                                <span class="spanAbso_2">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                </span>
                                <span class="menuIndexName">Domicilio</span>
                            </div>

                            <div class="IndexInp">
                                <span>2.</span>
                                <span class="spanAbso_1">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                </span>
                                <span class="menuIndexName">Botones: Enviar y Vaciar Datos</span>
                            </div>


                            <div class="IndexInp">
                                <span>3.</span>
                                <span class="spanAbso_1">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                </span>
                                <span class="menuIndexName">Escáner</span>
                            </div>

                            <div>
                                <span>3.1.</span>
                                <span class="spanAbso_2">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                </span>
                                <span class="menuIndexName">INE IA</span>
                            </div>

                            <div>
                                <span>3.2.</span>
                                <span class="spanAbso_2">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                </span>
                                <span class="menuIndexName">QR Escáner</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                <div class="manualUso_Contenedor2">
                    <div class="text_ManualUso">
                        <h4 class="titles_Manual">LLenado de campos / Bloques</h4>
                        <p>
                            Al acceder a la página, verás una interfaz que contiene varios
                            campos organizados en bloques desplegables (tipo acordeón):
                            <strong> Datos Generales</strong>, <strong> Domicilio </strong> y
                            <strong> Datos de Contacto </strong>. Cada bloque puede ser
                            abierto o cerrado haciendo clic izquierdo sobre el título del
                            bloque (que aparece en gris). Cuando un bloque está abierto, su
                            título se destacará en color dorado. Si haces clic nuevamente
                            sobre el título de un bloque abierto, este se cerrará, volviendo
                            a su color gris original.
                        </p>

                        <p>
                            No te preocupes si cierras un bloque por error; simplemente
                            vuelve a hacer clic en cualquier título de bloque para reabrirlo
                            cuando lo necesites.
                        </p>
                        <h4 class="subTitles_Manual">
                            Datos Generales: Tipo de Persona y Datos del Cónyuge
                        </h4>
                        <p>
                            En el bloque <strong>Datos Generales</strong> encontrarás el
                            campo <strong>Tipo de Persona</strong>, que permite seleccionar
                            entre las opciones "<strong>Persona Física</strong>" y "<strong>Persona Moral</strong>".
                            Esta elección modificará los campos de los bloques
                            <strong>Datos Generales</strong> y
                            <strong>Datos de Contacto</strong> de acuerdo con la opción
                            seleccionada. Es importante recordar que, al cambiar entre estas
                            opciones, se eliminarán los datos previamente ingresados en
                            ambos bloques.
                        </p>

                        <p>
                            En este bloque también encontrarás el campo
                            <strong>Estado Civil</strong>, el cual es de opción múltiple. Si
                            seleccionas "<strong>Casado</strong>", el sistema agregará un
                            nuevo campo denominado "<strong>Tipo de Cónyuge</strong>" y
                            creará un bloque adicional llamado
                            <strong>Datos del Cónyuge</strong>, ubicado debajo de
                            <strong>Datos Generales</strong>, donde podrás ingresar la
                            información correspondiente.
                        </p>

                        <h4 class="subTitles_Manual">
                            Datos Generales: CURP Y RFC
                        </h4>
                        <p>
                        En el bloque de datos generales se encuentran los campos <strong>CURP</strong> y <strong>RFC</strong>, poseen una <strong>función de búsqueda</strong>. 
                        </p>

                        <p>
                        Cuando el usuario ingresa un <strong>CURP</strong> teniendo seleccionada la opción <strong>Tipo de persona</strong> a “<strong>Persona Física</strong>”, será buscado dentro de la base de datos, si encuentra una coincidencia se mandará una alerta y procederá a traer toda la información del registro a los campos, el campo <strong>CURP</strong> será bloqueado y este <strong>pasará a ser inmodificable</strong>, únicamente podrá ser desbloqueado si el usuario cambia la opción de Tipo de persona o si el usuario presiona el botón “<strong>Vaciar datos</strong>”. Una vez el campo CURP sea bloqueado y el usuario presione el botón “enviar”, los datos junto con todos los cambios que se hayan hecho en el aplicativo web se enviaran como una <strong>actualización</strong> del registro del <strong>CURP</strong> procedente.
                        </p>

                        <p>
                        Cuando el usuario ingresa un <strong>RFC</strong> teniendo seleccionada la opción <strong>Tipo de persona</strong> a “<strong>Persona Moral</strong>”, será buscado dentro de la base de datos, si encuentra una coincidencia y del mismo tipo (Constancia Moral) se mandará una alerta y procederá a traer la información del registro a los campos, el campo <strong>RFC</strong> será bloqueado y este <strong>pasará a ser inmodificable</strong>, únicamente podrá ser desbloqueado si el usuario cambia la opción de <strong>Tipo de persona</strong> o si el usuario presiona el botón “<strong>Vaciar datos</strong>”. Una vez el campo <strong>RFC</strong> sea bloqueado y el usuario presione el botón “<strong>enviar</strong>”, los datos junto con todos los cambios que se hayan hecho en el aplicativo web se enviaran como una <strong>actualización</strong> del registro del <strong>RFC</strong> procedente.
                        </p>

                        <h4 class="subTitles_Manual">Domicilio</h4>
                        <p>
                            En el bloque <strong>Domicilio</strong>, el campo
                            <strong>Código Postal</strong> permite
                            <strong>identificar automáticamente la Colonia</strong>
                            correspondiente al código postal ingresado.
                        </p>

                        <p>
                            El bloque <strong>Domicilio</strong> está dividido en dos
                            secciones: <strong>Domicilio Particular</strong> y
                            <strong>Domicilio Fiscal</strong>. Al final de cada sección, hay
                            un botón que permite copiar los datos de un bloque al otro (por
                            ejemplo, de <strong>Particular</strong> a
                            <strong>Fiscal</strong> o <strong>viceversa</strong>).
                        </p>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                <div class="manualUso_Contenedor2">
                    <div class="text_ManualUso">
                        <h4 class="titles_Manual">Botones: Enviar y Vaciar Datos</h4>

                        <p>
                            Fuera de los bloques, en la parte inferior del aplicativo encontrarás los botones
                            <strong>Enviar Datos</strong> y <strong>Vaciar Datos</strong>.
                        </p>

                        <ul class="text_ManualUso_Mod_List">
                            <li><strong>Enviar Datos</strong>: Este botón permite enviar la información ingresada a
                                la
                                base de datos correspondiente y genera una notificación por correo electrónico a la
                                notaría. Antes de enviarlo, el sistema verificará que todos los campos obligatorios
                                estén completos. Si falta alguno, aparecerá un cuadro de notificación en la esquina
                                superior derecha, indicando qué campos faltan por completar.</li>

                            <li><strong>Vaciar Datos</strong>: Este botón permite borrar todos los datos ingresados
                                en
                                los campos del formulario. Al presionar este botón, se mostrará una notificación que
                                te
                                preguntará si deseas confirmar la acción o cancelarla.</li>
                        </ul>

                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="wa-tab-pane" role="tabpanel" aria-labelledby="wa-tab" tabindex="0">
                <div class="manualUso_Contenedor2">
                    <div class="text_ManualUso">
                        <h4 class="titles_Manual"> Escáner</h4>

                        <p>
                            El escáner se encuentra en la esquina inferior derecha del aplicativo. Al pasar el
                            cursor
                            sobre el botón, se desplegarán dos opciones: <strong>INE IA</strong> y <strong>QR
                                Escáner</strong>.
                        </p>

                        <h4 class="subTitles_Manual">
                            INE IA
                        </h4>

                        <p>
                            El servicio <strong>INE IA</strong> utiliza inteligencia artificial para escanear la
                            credencial del INE y transferir automáticamente la información relevante a los campos
                            correspondientes del aplicativo. Para usar esta función:
                        </p>

                        <ol class="text_ManualUso_Mod_List">
                            <li>Haz clic en el botón <strong>INE IA</strong>. Aparecerá una ventana emergente
                                pidiendo
                                que <strong>escanees primero la parte frontal</strong> de tu INE</li>

                            <li>Selección de Cámara: Asegúrate de que tu navegador haya solicitado permiso para
                                acceder
                                a la <strong>cámara</strong>. Si no has permitido el acceso, selecciona
                                "<strong>Permitir esta vez</strong>" o "<strong>Permitir siempre</strong>".</li>

                            <li>Una vez permitido el acceso a la cámara, selecciona la cámara que usarás y haz clic
                                en
                                "<strong>Comenzar</strong>". Verás una vista en vivo de lo que captura la cámara.
                                Asegúrate de que la INE esté <strong>completamente visible</strong> dentro del
                                recuadro
                                mostrado en la ventana emergente.</li>

                            <li>La ventana mostrará el texto "<strong>No Estático</strong>". Mantén la
                                <strong>cámara
                                    fija</strong> en la INE hasta que el texto cambie a "Estático". Luego, mantén la
                                cámara quieta durante unos segundos para permitir que el sistema realice el
                                <strong>escaneo</strong>.
                            </li>

                            <li>Si el sistema detecta que ya hay datos ingresados en los <strong>campos</strong>, se
                                te
                                pedirá <strong>confirmación</strong> para <strong>reemplazar los datos
                                    existentes</strong> o <strong>solo completar los campos vacíos</strong>.</li>

                            <li>Después del <strong>escaneo</strong>, el sistema <strong>procesará</strong> la
                                información y te notificará si el proceso fue <strong>exitoso</strong>. Luego, el
                                sistema pedirá que <strong>escanees la parte trasera de la INE</strong>, repitiendo
                                el
                                mismo proceso.</li>
                        </ol>

                        <h4 class="subTitles_Manual">
                            QR Escáner
                        </h4>

                        <p>
                            El QR Escáner permite <strong>escanear códigos QR de documentos oficiales</strong>, como
                            <strong>Actas de Nacimiento</strong>, <strong>CURP</strong>, <strong>Constancias
                                Fiscales</strong> y <strong>Constancias Morales</strong>. Para usarlo:
                        </p>

                        <ol class="text_ManualUso_Mod_List">
                            <li>Haz clic en QR Escáner. Aparecerá una ventana emergente <strong>solicitando
                                    permiso</strong> para acceder a la cámara. Selecciona "<strong>Permitir esta
                                    vez</strong>" o "<strong>Permitir siempre</strong>".</li>

                            <li>Después de permitir el acceso a la cámara, <strong>selecciona la cámara</strong> y
                                haz
                                clic en "<strong>Comenzar</strong>". Aparecerá un recuadro con la imagen de la
                                cámara.
                                <strong>Apunta el código QR dentro de este recuadro</strong> para escanearlo.
                            </li>

                            <li>El proceso de escaneo <strong>puede tardar algunos segundos</strong>. Una vez
                                escaneado
                                el QR, la ventana emergente se cerrará y comenzará el procesamiento de la
                                información.
                            </li>

                            <li>Si ya existen datos en los campos del formulario, el sistema te notificará
                                <strong>si
                                    deseas reemplazar los datos existentes</strong> o <strong>solo completar los
                                    campos
                                    vacíos</strong>.
                            </li>

                            <li>Si el usuario intenta escanear una <strong>Constancia Moral</strong> y el bloque
                                <strong>Datos Generales</strong> tiene seleccionada la opción "Persona Física",
                                aparecerá una alerta que indicará la necesidad de <strong>cambiar el tipo de
                                    persona</strong> a "<strong>Persona Moral</strong>", y
                                <strong>viceversa</strong>.
                            </li>
                        </ol>

                        <hr>
                        <p>
                            Este manual está diseñado para guiarte a través del uso eficiente del aplicativo web. Si
                            tienes alguna pregunta o encuentras algún inconveniente, no dudes en consultar este
                            manual
                            nuevamente o contactar con nuestro soporte técnico.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="button_Manual_Contenedor" id="manualUso_Buttom">
        <div class="button_Manual_1"><img src="assets/img/informacion.png" alt="Inf"></div>
        <div class="button_Manual_2"></div>
        <div class="button_Manual_3"></div>
        <div class="button_Manual_Text">
            <p>Manual de usuario</p>
        </div>
    </div>

    <script src="src/particles/particles.min.js">
    </script>
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

    function verificacion_estado_dataList(pais_nacimeinto_lista, paisnac) {
        let resultado = true;
        if (!pais_nacimeinto_lista == '') {
            for (const element of paisnac.options) {
                if (element.value == pais_nacimeinto_lista) {
                    resultado = true;
                    break;
                } else {

                    resultado = false;
                }

            }
        }
        return resultado;
    }
    document.getElementById("btn_enviar").addEventListener("click", function(event) {
        // Obtener los valores de los campos
        const nombre = document.getElementById("nombre").value.trim();
        const apellidoPaterno = document.getElementById("apellidopat").value.trim();
        const apellidoMaterno = document.getElementById("apellidomat").value.trim();
        const curp = document.getElementById("curp").value.trim();
        const rfc = document.getElementById("rfc").value.trim();
        const persona = document.getElementById("persona").value;
        let num_doc_id_emicion = document.getElementById("num_doc_id_emicion") ? document.getElementById(
            "num_doc_id_emicion").value.trim() : "";
        let autoridad_emisora = document.getElementById("autoridad_emisora") ? document.getElementById(
            "autoridad_emisora").value.trim() : "";
        let nombre_conyugue = document.getElementById("nombre_conyuge") ? document.getElementById(
            "nombre_conyuge").value.trim() : "";
        const civil = document.getElementById("civil").value;
        let apellidopat_conyugue = document.getElementById("apellidopat_conyugue") ? document
            .getElementById(
                "apellidopat_conyugue").value.trim() : "";

        let apellidomat_conyugue = document.getElementById("apellidomat_conyugue") ? document
            .getElementById(
                "apellidomat_conyugue").value.trim() : "";
        var fecha_nac = document.getElementById("dia").value;
        var mes_dia = document.getElementById("mes_dia").value;

        // Crear un array con los campos faltantes
        const camposFaltantes = [];
        const camposFaltantes2 = [];
        if (verificacion_estado_dataList(document.getElementById("pais_nacimeinto_lista").value, document
                .getElementById("paisnac")) == false) {
            camposFaltantes.push(
                "El Pais Ingresado no corresponde al catalogo");
        }
        if (verificacion_estado_dataList(document.getElementById("nacionalidad_input").value, document
                .getElementById("nacionalidad")) == false) {
            camposFaltantes.push(
                "La nacionalidad ingresada no corresponde al catalogo");
        }
        if (verificacion_estado_dataList(document.getElementById("pais_1").value, document.getElementById(
                "pais")) == false) {
            camposFaltantes.push(
                "El Pais Ingresado no corresponde al catalogo");
        }
        if (verificacion_estado_dataList(document.getElementById("pais_fiscal_input").value, document
                .getElementById("pais_fiscal")) == false) {
            camposFaltantes.push(
                "El Pais Ingresado no corresponde al catalogo");
        }

        if (persona == 'fisica') {
            if (!nombre) camposFaltantes.push("Nombre");
            if (!apellidoPaterno) camposFaltantes.push("Apellido Paterno");
            if (!apellidoMaterno) camposFaltantes.push("Apellido Materno");
            if (!curp) camposFaltantes.push("CURP");
            if (!fecha_nac) camposFaltantes.push("Fecha de Nacimiento");

            if (civil == "Casado" && num_doc_id_emicion == "") camposFaltantes.push(
                "Numero de Identificacion conyuge");
            if (civil == "Casado" && nombre_conyugue == "") camposFaltantes.push("Nombre conyugue");
            if (civil == "Casado" && autoridad_emisora == "") camposFaltantes.push(
                "Autoridad Emisora conyuge");
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
    <script>
    window.addEventListener("beforeunload", function() {
        sessionStorage.clear(); // Borra datos de la sesión
        localStorage.clear(); // Borra datos almacenados localmente
    });

    function convertir_mayusculas() {
        let inputs3 = document.querySelectorAll('input');

        inputs3.forEach(function(element) {
            element.value = element.value.toUpperCase();
        });

        // Optional: You can add additional logic here if you need to handle specific fields differently
    }
    </script>

    <script defer src="assets/js/main_nuevo.js"></script>

    <script defer src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js" type="text/javascript">
    </script>

    <script defer src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"></script>


    <script type="text/javascript" src="assets/js/script_ocr.js" defer></script>
    <!--    
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js"></script>
    <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>-->
    <!-- <script defer src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script defer src="https://code.jquery.com/jquery-1.12.4.min.js"
        integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>  -->
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.min.js"></script>
    <link defer rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link defer rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <script src="./assets/js/jqry.js"></script>
    <script src="./assets/js/manual.js"></script>
</body>

</html>
</body>

</html>