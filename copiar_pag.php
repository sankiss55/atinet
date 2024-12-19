<?php
// Verifica si "url" está presente en $_POST
$data = json_decode(file_get_contents("php://input"),true);

if (isset($data['url']) && !empty($data['url'])) {
    // Inicializa cURL
    $ch = curl_init();

    // Configura cURL para obtener el contenido de la página
    curl_setopt($ch, CURLOPT_URL, $data['url']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Ejecuta la solicitud
    $response = curl_exec($ch);
    // Cierra cURL
    curl_close($ch);

    // Cargar el HTML en DOMDocument
    $dom = new DOMDocument;
    libxml_use_internal_errors(true); // Evitar errores por HTML mal formado
    $dom->loadHTML($response);
    libxml_clear_errors();

    // Usar XPath para extraer todos los elementos <td>
    $xpath = new DOMXPath($dom);
    $tdNodes = $xpath->query("//td");
    // Crear un arreglo para almacenar los datos de los <td>
    $tdArray = [];
    $contador = 0;
    $tdArray2 = [];
    // Recorrer los elementos <td> y guardarlos en el arreglo
    foreach ($tdNodes as $index => $node) {
        if ($index % 2 == 0) {
            $tdArray[$contador] = $node->nodeValue;
            $contador++;
        }
    }
    
    $contador = 0;
    $tdNodes = $xpath->query("//ul");
    foreach ($tdNodes as $index => $node) {
        if ($index % 2 == 0) {
             $tdArray2 [$contador] = $node->nodeValue;
            $contador++;
        }
    }
    array_push($tdArray,$tdArray2[0]);
    // Devolver los datos como JSON
    echo json_encode($tdArray);
} else {
    echo json_encode(['error' => 'URL no proporcionada o vacía']);
}
?>
