<?php
header('Content-Type: application/json');

// Ruta del archivo donde se guardan las visitas
$archivo = 'visitas.json';

// Obtener la fecha actual
$fecha_actual = date("Y-m-d");

// Si el archivo no existe, crearlo con valores iniciales
if (!file_exists($archivo)) {
    $datos = [
        "total" => 0,
        "dia" => 0,
        "fecha" => $fecha_actual
    ];
    file_put_contents($archivo, json_encode($datos));
}

// Leer los datos actuales del archivo
$datos = json_decode(file_get_contents($archivo), true);

// Si cambió el día, reiniciar el contador diario
if ($datos["fecha"] !== $fecha_actual) {
    $datos["dia"] = 0;
    $datos["fecha"] = $fecha_actual;
}

// Incrementar las visitas
$datos["total"] += 1;
$datos["dia"] += 1;

// Guardar los nuevos valores en el archivo
file_put_contents($archivo, json_encode($datos));

// Devolver los datos en formato JSON
echo json_encode($datos);
?>
