<?php
header('Content-Type: application/json');

$inputJSON = file_get_contents('php://input');
$inputData = json_decode($inputJSON, true);

if ($inputData && is_array($inputData)) {
    $fasiFilePath = 'fasi.json';

    if (file_put_contents($fasiFilePath, json_encode($inputData, JSON_PRETTY_PRINT))) {
        http_response_code(200);
        echo json_encode(['message' => 'fasi updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Error updating fasi.json']);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid data']);
}
?>
