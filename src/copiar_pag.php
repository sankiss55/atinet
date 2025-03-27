<?php
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['url']) && !empty($data['url'])) {
    try {
        // Initialize cURL
        $ch = curl_init();

        // Configure cURL to fetch the page content
        curl_setopt($ch, CURLOPT_URL, $data['url']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Execute the request
        $response = curl_exec($ch);

        // Check for cURL errors
        if ($response === false) {
            throw new Exception('cURL error: ' . curl_error($ch));
        }

        // Close cURL
        curl_close($ch);

        // Load HTML into DOMDocument
        $dom = new DOMDocument;
        libxml_use_internal_errors(true); // Suppress errors for malformed HTML
        $loaded = $dom->loadHTML($response);
        libxml_clear_errors();

        // Check if HTML was loaded successfully
        if (!$loaded) {
            throw new Exception('Failed to load HTML.');
        }

        // Extract <td> elements using XPath
        $xpath = new DOMXPath($dom);
        $tdNodes = $xpath->query("//td");
        $tdArray = [];

        // Iterate over <td> elements and store their values
        foreach ($tdNodes as $index => $node) {
            if ($index % 2 == 0) {
                $tdArray[] = $node->nodeValue;
            }
        }

        // Extract <ul> elements using XPath
        $ulNodes = $xpath->query("//ul");
        $tdArray2 = [];

        // Iterate over <ul> elements and store their values
        foreach ($ulNodes as $index => $node) {
            if ($index % 2 == 0) {
                $tdArray2[] = $node->nodeValue;
            }
        }

        // Push the first element of $tdArray2 to $tdArray if available
        if (!empty($tdArray2)) {
            array_push($tdArray, $tdArray2[0]);
        }

        // Return data as JSON
        echo json_encode($tdArray);
    } catch (Exception $e) {
        // Handle exceptions
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'URL not provided or empty']);
}
?>
