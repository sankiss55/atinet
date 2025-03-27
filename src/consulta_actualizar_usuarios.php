<?php
//include ('/home3/atinet65/notariosatinet.com.mx/utilerias_appliweb/conexion.php');

include ('conexion.php');

// Obtener los datos del JSON
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['curp'])) {
    $curp = mysqli_real_escape_string($conexion, $data['curp']);
  
    try {
        $consulta = "SELECT * FROM registro WHERE Persona='fisica' and curp = '$curp'";
        $resultados = mysqli_query($conexion, $consulta);

        if ($resultados) {
            if (mysqli_num_rows($resultados) > 0) {
                echo json_encode(mysqli_fetch_assoc($resultados));
                
            } else {
                echo json_encode(false);
            }
        } else {
            echo json_encode(false);
        }
    } catch (Exception $e) {
        echo json_encode(false);
    }
} else if(isset($data['rfc'])){
    $curp = mysqli_real_escape_string($conexion, $data['rfc']);
  
    try {
        $consulta = "SELECT * FROM registro WHERE Persona='moral' and rfc = '$curp'";
        $resultados = mysqli_query($conexion, $consulta);

        if ($resultados) {
            if (mysqli_num_rows($resultados) > 0) {
                echo json_encode(mysqli_fetch_assoc($resultados));
            } else {
                echo json_encode(false);
            }
        } else {
            echo json_encode(false);
        }
    } catch (Exception $e) {
        echo json_encode(false);
    }
   
}else{
    echo json_encode(false);
}


// Cerrar la conexión
mysqli_close($conexion);
?>