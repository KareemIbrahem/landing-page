<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['Name'];
    $phone = $_POST['phone'];

    // Specify the path to your CSV file
    $filePath = 'data.csv';

    // Write data to the CSV file
    $file = fopen($filePath, 'a'); // 'a' for append
    fputcsv($file, [$name, $phone]);
    fclose($file);

    echo json_encode(['success' => true, 'message' => 'Data saved successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
