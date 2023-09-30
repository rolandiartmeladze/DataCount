<?php
$request_body = file_get_contents('php://input');

$data = json_decode($request_body, true);

if ($data === null) {
    $response = array('message' => 'Invalid JSON data');
    http_response_code(400); // Bad Request
} else {
    $encoded_data = json_encode($data);

    if (file_put_contents('updateOneDay.json', $encoded_data)) {
        $response = array('message' => 'Data updated successfully');
        http_response_code(200); // OK
    } else {
        $response = array('message' => 'Error updating data');
        http_response_code(500); // Internal Server Error
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>
