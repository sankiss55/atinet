<?php
//include ('/home3/atinet65/notariosatinet.com.mx/utilerias_appliweb/conexion.php');
include("conexion.php");
ini_set('display_errors', 0); // Desactiva la visualización de errores
ini_set('log_errors', 1); // Activa el registro de errores
error_reporting(E_ALL); // Especifica el nivel de reporte de errores (en este caso, todos los errores)

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
date_default_timezone_set("America/Mexico_City");

$fecha_actual = date("Y-m-d"); // Formato: Año-Mes-Día
//recibir los datos y almacenarlos en variables
$dia = $_POST['dia'];
$persona = $_POST['persona'];
$nombre = $_POST['nombre'];
$apellidopat = $_POST['apellidopat'];
$apellidomat = $_POST['apellidomat'];
$edo_civil = $_POST['civil'];
$conyuge = $_POST['regimen'];
$paisnac = $_POST['paisnac'];
$e_nac = $_POST['e_nac'];
$c_nac = $_POST['c_nac'];
$m_nac = $_POST['m_nac'];
$nacionalidad = $_POST['nacionalidad'];
$ocupacion = $_POST['ocupacion'];
$calle = $_POST['calle'];
$no_exterior = $_POST['ext'];
$no_interior = $_POST['int'];
$manzana = $_POST['manzana'];
$lote = $_POST['lote'];
$cp = $_POST['cp'];
$colonia = $_POST['colonia'];
$municipio = $_POST['municipio'];
$estado = $_POST['estado'];
$ciudad = $_POST['ciudad'];
$pais = $_POST['pais'];
$rfc = $_POST['rfc'];
$curp = $_POST['curp'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];
$documento = $_POST['identificacion'];
$no_identificacion = $_POST['noidentificacion'];
$ocr=$_POST['ocr'];
$idmex=$_POST['idmex'];
$telefono_oficina = $_POST['telefono_oficina'];
$telefono_movil = $_POST['telefono_movil'];
$alias = $_POST['alias'];
$calle_fiscal = $_POST['calle_fiscal'];
$no_interior_fiscal     = $_POST['int_fiscal'];
$no_exterior_fiscal = $_POST['ext_fiscal'];
$manzana_fiscal = $_POST['manzana_fiscal'];
$lote_fiscal = $_POST['lote_fiscal'];
$cp_fiscal = $_POST['cp_fiscal'];
$colonia_fiscal = $_POST['colonia_fiscal'];
$municipio_fiscal = $_POST['municipio_fiscal'];
$estado_fiscal = $_POST['estado_fiscal'];
$ciudad_fiscal = $_POST['ciudad_fiscal'];
$pais_fiscal = $_POST['pais_fiscal'];
$nombre_conyuge = $_POST['nombre_conyugue'];
$Apellido_paterno_conyuge = $_POST['apellidopat_conyugue'];
$Apellido_materno_conyuge = $_POST['apellidomat_conyugue'];
$regimen = $_POST['regimen'];
$doc_Identificacion = $_POST['doc_id'];
$num_doc_identificacion    = $_POST['num_doc_id'];
$Autoridad_emisora = $_POST['autoridad_emisora'];
$regimen_fiscal_opciones_usuario = $_POST['regimen_fiscal_opciones'];
$input_usuario_true=$_POST['id_escondido_registro'];
$registro_exitoso = false;

$regimen_fiscal="";
if($regimen_fiscal_opciones_usuario!=""){
    $regimen_fiscal = "SELECT CLAVE FROM catregimenfiscal WHERE DESCRIPCION LIKE '%$regimen_fiscal_opciones_usuario%'";
    
$result = $conexion2->query($regimen_fiscal);
// Verificar y procesar resultados
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $regimen_fiscal =  $row['CLAVE'];
    }
} else {
    echo "No se encontraron resultados.";
}
}

$AutoridadEmisora2 = $_POST['AutoridadEmisora2'];
$vigencia_de_ine = $_POST['vigencia_de_ine'];
$correo2 = $_POST['correo2'];

$genero = $_POST['genero'];

// Obtén la URL actual
$url = $_SERVER['REQUEST_URI'];

$partes = explode('/', $url);
$resultado="";
$fragmento = $partes[1];
$ocr_idmex_noidentificacion=$no_identificacion."|".$idmex."|".$ocr;

if($input_usuario_true!=''){
// Actualizar 
if($input_usuario_true!='Moral'){

    $update = "UPDATE registro 
    SET 
        dia = '$dia', 
        Persona = '$persona', 
        nombre = '$nombre', 
        apellidopat = '$apellidopat', 
        apellidomat = '$apellidomat', 
        edo_civil = '$edo_civil', 
        conyuge = '$conyuge', 
        paisnac = '$paisnac', 
        estado_nac = '$e_nac', 
        ciudad_nac = '$c_nac',
        municipio_nac = '$m_nac', 
        nacionalidad = '$nacionalidad', 
        ocupacion = '$ocupacion', 
        calle = '$calle', 
        no_exterior = '$no_exterior', 
        no_interior = '$no_interior', 
        manzana = '$manzana', 
        lote = '$lote', 
        cp = '$cp', 
        colonia = '$colonia', 
        municipio = '$municipio', 
        estado = '$estado', 
        ciudad = '$ciudad', 
        pais = '$pais', 
        rfc = '$rfc', 
        curp = '$curp', 
        telefono = '$telefono', 
        correo = '$correo', 
        documento = '$documento', 
        no_identificacion = '$ocr_idmex_noidentificacion', 
        telefono_oficina = '$telefono_oficina', 
        telefono_movil = '$telefono_movil', 
        alias = '$alias', 
        calle_fiscal = '$calle_fiscal', 
        no_interior_fiscal = '$no_interior_fiscal', 
        no_exterior_fiscal = '$no_exterior_fiscal', 
        manzana_fiscal = '$manzana_fiscal', 
        lote_fiscal = '$lote_fiscal', 
        cp_fiscal = '$cp_fiscal', 
        colonia_fiscal = '$colonia_fiscal', 
        municipio_fiscal = '$municipio_fiscal', 
        estado_fiscal = '$estado_fiscal', 
        ciudad_fiscal = '$ciudad_fiscal', 
        pais_fiscal = '$pais_fiscal', 
        dia_registro = '$fecha_actual', 
        notaria = '$fragmento', 
        nombre_conyuge = '$nombre_conyuge', 
        Apellido_paterno_conyuge = '$Apellido_paterno_conyuge', 
        Apellido_materno_conyuge = '$Apellido_materno_conyuge', 
        doc_Identificacion = '$doc_Identificacion', 
        num_doc_identificacion = '$num_doc_identificacion', 
        Autoridad_emisora = '$Autoridad_emisora', 
        genero = '$genero', 
        regimen_fiscal = '$regimen_fiscal', 
        Gmail2 = '$correo2', 
        vigiencia_de_ine = '$vigencia_de_ine', 
        autoridad_emisora_usuario = '$AutoridadEmisora2'
    WHERE curp = '$curp'";
}else if($input_usuario_true==' '){

    $update = "UPDATE registro 
    SET 
        dia = '$dia', 
        Persona = '$persona', 
        nombre = '$nombre', 
        apellidopat = '$apellidopat', 
        apellidomat = '$apellidomat', 
        edo_civil = '$edo_civil', 
        conyuge = '$conyuge', 
        paisnac = '$paisnac', 
        estado_nac = '$e_nac', 
        ciudad_nac = '$c_nac',
        municipio_nac = '$m_nac', 
        nacionalidad = '$nacionalidad', 
        ocupacion = '$ocupacion', 
        calle = '$calle', 
        no_exterior = '$no_exterior', 
        no_interior = '$no_interior', 
        manzana = '$manzana', 
        lote = '$lote', 
        cp = '$cp', 
        colonia = '$colonia', 
        municipio = '$municipio', 
        estado = '$estado', 
        ciudad = '$ciudad', 
        pais = '$pais', 
        rfc = '$rfc', 
        curp = '$curp', 
        telefono = '$telefono', 
        correo = '$correo', 
        documento = '$documento', 
        no_identificacion = '$ocr_idmex_noidentificacion', 
        telefono_oficina = '$telefono_oficina', 
        telefono_movil = '$telefono_movil', 
        alias = '$alias', 
        calle_fiscal = '$calle_fiscal', 
        no_interior_fiscal = '$no_interior_fiscal', 
        no_exterior_fiscal = '$no_exterior_fiscal', 
        manzana_fiscal = '$manzana_fiscal', 
        lote_fiscal = '$lote_fiscal', 
        cp_fiscal = '$cp_fiscal', 
        colonia_fiscal = '$colonia_fiscal', 
        municipio_fiscal = '$municipio_fiscal', 
        estado_fiscal = '$estado_fiscal', 
        ciudad_fiscal = '$ciudad_fiscal', 
        pais_fiscal = '$pais_fiscal', 
        dia_registro = '$fecha_actual', 
        notaria = '$fragmento', 
        nombre_conyuge = '$nombre_conyuge', 
        Apellido_paterno_conyuge = '$Apellido_paterno_conyuge', 
        Apellido_materno_conyuge = '$Apellido_materno_conyuge', 
        doc_Identificacion = '$doc_Identificacion', 
        num_doc_identificacion = '$num_doc_identificacion', 
        Autoridad_emisora = '$Autoridad_emisora', 
        genero = '$genero', 
        regimen_fiscal = '$regimen_fiscal', 
        Gmail2 = '$correo2', 
        vigiencia_de_ine = '$vigencia_de_ine', 
        autoridad_emisora_usuario = '$AutoridadEmisora2'
    WHERE rfc = '$rfc'";
}

// Ejecutar
$resultado = mysqli_query($conexion, $update);

}
// else if($input_usuario_true=='false'){
// // Actualizar solo los campos en blanco
// $update = "UPDATE registro 
// SET 
//     dia = IF(dia = '' OR dia IS NULL, '$dia', dia),
//     Persona = IF(Persona = '' OR Persona IS NULL, '$persona', Persona),
//     nombre = IF(nombre = '' OR nombre IS NULL, '$nombre', nombre),
//     apellidopat = IF(apellidopat = '' OR apellidopat IS NULL, '$apellidopat', apellidopat),
//     apellidomat = IF(apellidomat = '' OR apellidomat IS NULL, '$apellidomat', apellidomat),
//     edo_civil = IF(edo_civil = '' OR edo_civil IS NULL, '$edo_civil', edo_civil),
//     conyuge = IF(conyuge = '' OR conyuge IS NULL, '$conyuge', conyuge),
//     paisnac = IF(paisnac = '' OR paisnac IS NULL, '$paisnac', paisnac),
//     estado_nac = IF(estado_nac = '' OR estado_nac IS NULL, '$e_nac', estado_nac),
//     ciudad_nac = IF(ciudad_nac = '' OR ciudad_nac IS NULL, '$c_nac', ciudad_nac),
//     municipio_nac = IF(municipio_nac = '' OR municipio_nac IS NULL, '$m_nac', municipio_nac),
//     nacionalidad = IF(nacionalidad = '' OR nacionalidad IS NULL, '$nacionalidad', nacionalidad),
//     ocupacion = IF(ocupacion = '' OR ocupacion IS NULL, '$ocupacion', ocupacion),
//     calle = IF(calle = '' OR calle IS NULL, '$calle', calle),
//     no_exterior = IF(no_exterior = '' OR no_exterior IS NULL, '$no_exterior', no_exterior),
//     no_interior = IF(no_interior = '' OR no_interior IS NULL, '$no_interior', no_interior),
//     manzana = IF(manzana = '' OR manzana IS NULL, '$manzana', manzana),
//     lote = IF(lote = '' OR lote IS NULL, '$lote', lote),
//     cp = IF(cp = '' OR cp IS NULL, '$cp', cp),
//     colonia = IF(colonia = '' OR colonia IS NULL, '$colonia', colonia),
//     municipio = IF(municipio = '' OR municipio IS NULL, '$municipio', municipio),
//     estado = IF(estado = '' OR estado IS NULL, '$estado', estado),
//     ciudad = IF(ciudad = '' OR ciudad IS NULL, '$ciudad', ciudad),
//     pais = IF(pais = '' OR pais IS NULL, '$pais', pais),
//     rfc = IF(rfc = '' OR rfc IS NULL, '$rfc', rfc),
//     curp = IF(curp = '' OR curp IS NULL, '$curp', curp),
//     telefono = IF(telefono = '' OR telefono IS NULL, '$telefono', telefono),
//     correo = IF(correo = '' OR correo IS NULL, '$correo', correo),
//     documento = IF(documento = '' OR documento IS NULL, '$documento', documento),
//     no_identificacion = IF(no_identificacion = '' OR no_identificacion IS NULL, '$ocr_idmex_noidentificacion', no_identificacion),
//     telefono_oficina = IF(telefono_oficina = '' OR telefono_oficina IS NULL, '$telefono_oficina', telefono_oficina),
//     telefono_movil = IF(telefono_movil = '' OR telefono_movil IS NULL, '$telefono_movil', telefono_movil),
//     alias = IF(alias = '' OR alias IS NULL, '$alias', alias),
//     calle_fiscal = IF(calle_fiscal = '' OR calle_fiscal IS NULL, '$calle_fiscal', calle_fiscal),
//     no_interior_fiscal = IF(no_interior_fiscal = '' OR no_interior_fiscal IS NULL, '$no_interior_fiscal', no_interior_fiscal),
//     no_exterior_fiscal = IF(no_exterior_fiscal = '' OR no_exterior_fiscal IS NULL, '$no_exterior_fiscal', no_exterior_fiscal),
//     manzana_fiscal = IF(manzana_fiscal = '' OR manzana_fiscal IS NULL, '$manzana_fiscal', manzana_fiscal),
//     lote_fiscal = IF(lote_fiscal = '' OR lote_fiscal IS NULL, '$lote_fiscal', lote_fiscal),
//     cp_fiscal = IF(cp_fiscal = '' OR cp_fiscal IS NULL, '$cp_fiscal', cp_fiscal),
//     colonia_fiscal = IF(colonia_fiscal = '' OR colonia_fiscal IS NULL, '$colonia_fiscal', colonia_fiscal),
//     municipio_fiscal = IF(municipio_fiscal = '' OR municipio_fiscal IS NULL, '$municipio_fiscal', municipio_fiscal),
//     estado_fiscal = IF(estado_fiscal = '' OR estado_fiscal IS NULL, '$estado_fiscal', estado_fiscal),
//     ciudad_fiscal = IF(ciudad_fiscal = '' OR ciudad_fiscal IS NULL, '$ciudad_fiscal', ciudad_fiscal),
//     pais_fiscal = IF(pais_fiscal = '' OR pais_fiscal IS NULL, '$pais_fiscal', pais_fiscal),
//     dia_registro = IF(dia_registro = '' OR dia_registro IS NULL, '$fecha_actual', dia_registro),
//     notaria = IF(notaria = '' OR notaria IS NULL, '$fragmento', notaria),
//     nombre_conyuge = IF(nombre_conyuge = '' OR nombre_conyuge IS NULL, '$nombre_conyuge', nombre_conyuge),
//     Apellido_paterno_conyuge = IF(Apellido_paterno_conyuge = '' OR Apellido_paterno_conyuge IS NULL, '$Apellido_paterno_conyuge', Apellido_paterno_conyuge),
//     Apellido_materno_conyuge = IF(Apellido_materno_conyuge = '' OR Apellido_materno_conyuge IS NULL, '$Apellido_materno_conyuge', Apellido_materno_conyuge),
//     doc_Identificacion = IF(doc_Identificacion = '' OR doc_Identificacion IS NULL, '$doc_Identificacion', doc_Identificacion),
//     num_doc_identificacion = IF(num_doc_identificacion = '' OR num_doc_identificacion IS NULL, '$num_doc_identificacion', num_doc_identificacion),
//     Autoridad_emisora = IF(Autoridad_emisora = '' OR Autoridad_emisora IS NULL, '$Autoridad_emisora', Autoridad_emisora),
//     genero = IF(genero = '' OR genero IS NULL, '$genero', genero),
//     regimen_fiscal = IF(regimen_fiscal = '' OR regimen_fiscal IS NULL, '$regimen_fiscal', regimen_fiscal),
//     Gmail2 = IF(Gmail2 = '' OR Gmail2 IS NULL, '$correo2', Gmail2),
//     vigiencia_de_ine = IF(vigiencia_de_ine = '' OR vigiencia_de_ine IS NULL, '$vigencia_de_ine', vigiencia_de_ine),
//     autoridad_emisora_usuario = IF(autoridad_emisora_usuario = '' OR autoridad_emisora_usuario IS NULL, '$AutoridadEmisora2', autoridad_emisora_usuario)
// WHERE curp = '$curp';";

// // Ejecutar
// $resultado = mysqli_query($conexion, $update);

// }
else{

//insertar 
$insertar = "INSERT INTO registro(dia, Persona, nombre,apellidopat,apellidomat,edo_civil,conyuge,paisnac,estado_nac,ciudad_nac
,municipio_nac,nacionalidad,ocupacion,calle,no_exterior,no_interior,manzana,lote,cp,colonia,municipio,estado,ciudad,
pais,rfc,curp,telefono,correo,documento,no_identificacion,telefono_oficina,telefono_movil,alias,calle_fiscal,no_interior_fiscal,
no_exterior_fiscal,manzana_fiscal,lote_fiscal,cp_fiscal,colonia_fiscal,municipio_fiscal,estado_fiscal,ciudad_fiscal,pais_fiscal,dia_registro,notaria,
nombre_conyuge,Apellido_paterno_conyuge,Apellido_materno_conyuge,doc_Identificacion,num_doc_identificacion,	Autoridad_emisora, genero, regimen_fiscal, Gmail2, vigiencia_de_ine,autoridad_emisora_usuario) 
values ('$dia', '$persona', '$nombre','$apellidopat','$apellidomat','$edo_civil','$conyuge','$paisnac','$e_nac','$c_nac'
,'$m_nac','$nacionalidad','$ocupacion','$calle','$no_exterior','$no_interior','$manzana','$lote','$cp','$colonia'
,'$municipio','$estado','$ciudad','$pais','$rfc','$curp','$telefono', '$correo','$documento','$ocr_idmex_noidentificacion'
,'$telefono_oficina','$telefono_movil','$alias','$calle_fiscal','$no_interior_fiscal','$no_exterior_fiscal',
'$manzana_fiscal','$lote_fiscal','$cp_fiscal','$colonia_fiscal','$municipio_fiscal','$estado_fiscal',
'$ciudad_fiscal','$pais_fiscal','$fecha_actual','$fragmento','$nombre_conyuge','$Apellido_paterno_conyuge','$Apellido_materno_conyuge',
'$doc_Identificacion','$num_doc_identificacion','$Autoridad_emisora', '$genero', '$regimen_fiscal', '$correo2','$vigencia_de_ine','$AutoridadEmisora2')";
//ejecutar
$resultado = mysqli_query($conexion, $insertar);
}

$id_utima_consulta = mysqli_insert_id($conexion);
if (!$resultado) {
    echo "<script>alert('Fallo de Registro: " . mysqli_error($conexion) . "');</script>";
    exit;
} else {
    $registro_exitoso=true;
    $RESULTADOS = mysqli_query($conexion, "SELECT * FROM correos_notaria where nombre_notaria='$fragmento'");
    $resultado_uni = mysqli_fetch_assoc($RESULTADOS);
    if ($resultado_uni) {
        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->SMTPDebug = 0;
            $mail->Host = 'mail.atinet.com.mx';
            $mail->SMTPSecure = 'ssl';
            $mail->Port = 465;
            $mail->SMTPAuth = true;
            $email = 'correoregistro@atinet.com.mx';
            $mail->Username = $email;
            $mail->Password = "Atinet2024#";
            $mail->setFrom($email, $resultado_uni['nombre_notaria']);
            $mail->addReplyTo('correoregistro@atinet.com.mx', $resultado_uni['nombre_notaria']);
            $mail->addAddress($resultado_uni['correo_notaria'], $resultado_uni['nombre_notaria']);
            $mail->Subject = 'Se ha registrado un nuevo usuario';
            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';
            $mail->Body = '
 <html>
    <body style="background-color:rgba(12, 41, 91, 1); margin: 0; padding: 0; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #FFF; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333; text-align: center;"> ¡Nuevo usuario se registró en nuestro aplicaivo web!</h1>
            <h4>Tienes un usuario pendiente a registrar</h4>
            <p style="color: #333;">
                <strong>NOMBRE:</strong> ' . $nombre . '<br>
                <strong>Apellido Paterno:</strong> ' . $apellidopat  . '<br>
                <strong>Apellido Materno:</strong> ' . $apellidomat  . '<br>
                
            </p>
            <footer style="background-color: #DFDFDF; margin-top: 20px; text-align: center; color: #555;">
            <a href="https://atinet.com.mx/privacy-policy.html"> ATINET © 2024. Políticas de Privacidad</a>
            </footer>
        </div>
    </body>
    </html>

    ';

            $mail->send();
            $RESULTADOS = mysqli_query($conexion, "UPDATE registro set envio_de_correo=1 where idregistro='$id_utima_consulta'");
        } catch (Exception $e) {
            echo "<script>window.location.href = '../index.php';</script>";
        }
    }
}
// echo "<script languaje='javascript'>alert('Fallo de Registro: " . $RESULTADOS . "');</script>";
mysqli_close($conexion);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <script>
        <?php if ($registro_exitoso){ ?>
            Swal.fire({
                title: 'Registro Exitoso',
                icon: 'success',
                draggable: true
            }).then(function() {
                window.location.href = '../index.php';
            });
        <?php }else{ ?>
            Swal.fire({
                title: 'Error en el Registro',
                icon: 'error',
                text: 'Hubo un problema al registrar los datos.',
                draggable: true
            }).then(function() {
                window.location.href = '../index.php';
            });
        <?php } ?>
    </script>
</body>
</html>
