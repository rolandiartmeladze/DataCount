<?php
$inputJSON = file_get_contents('php://input');
$inputData = json_decode($inputJSON, true);

if ($inputData && is_array($inputData)) {
    if (file_put_contents('users.json', json_encode($inputData, JSON_PRETTY_PRINT))) {
        http_response_code(200);
        echo json_encode(['message' => 'Users updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Error updating users']);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid data']);
}
?>
