<?php
include ('/home3/atinet65/notariosatinet.com.mx/utilerias_appliweb/conexion.php');
//include("conexion.php");

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
$AutoridadEmisora2 = $_POST['AutoridadEmisora2'];
$vigencia_de_ine = $_POST['vigencia_de_ine'];
$correo2 = $_POST['correo2'];

$genero = $_POST['genero'];

// Obtén la URL actual
$url = $_SERVER['REQUEST_URI'];

$partes = explode('/', $url);

$fragmento = $partes[1];
$ocr_idmex_noidentificacion=$no_identificacion."|".$ocr."|".$idmex;
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
$id_utima_consulta = mysqli_insert_id($conexion);
echo "ultimo_correo" . $calle_fiscal . "<br>";
if (!$resultado) {
    echo "<script>alert('Fallo de Registro: " . mysqli_error($conexion) . "');</script>";
} else {
    //cambiar notaria DANA  a una bien 
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
            echo "<script>window.location.href = 'index.php';</script>";
        }
    }
}
// echo "<script languaje='javascript'>alert('Fallo de Registro: " . $RESULTADOS . "');</script>";
echo "<script language='javascript'>alert('Registro Exitoso');window.location.href = 'index.php';</script>";
mysqli_close($conexion);