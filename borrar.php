<?php
include ('conexion.php');
date_default_timezone_set("America/Mexico_City");

// Obtener la fecha almacenada en tu base de datos (supongamos que tienes una tabla llamada 'tus_registros')
$sql = "SELECT idregistro, dia_registro FROM registro";
$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $fecha_registro = new DateTime($row["dia_registro"]); // Corregido: Usar DateTime con la columna correcta
        $fecha_actual = new DateTime();
        
        // Calcular la diferencia de días
        $diferencia_dias = $fecha_actual->diff($fecha_registro)->days;

        // Eliminar el registro si la diferencia es mayor o igual a 15 días
        if ($diferencia_dias >=45 ) {
            $id_a_eliminar = $row["idregistro"];
            $sql_eliminar = "DELETE FROM registro WHERE idregistro = $id_a_eliminar"; // Corregido: Usar el nombre correcto de la columna
            
            if ($conexion->query($sql_eliminar) === TRUE) {
                echo "Registro eliminado con éxito.";
            } else {
                echo "Error al eliminar el registro: " . $conexion->error;
            }
        }
    }
} else {
    echo "No hay registros para procesar.";
}

// Cerrar la conexión
$conexion->close(); // Corregido: Usar la variable correcta
?>
