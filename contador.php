<?php
header('Content-Type: application/json');

// Ruta del archivo donde se guardan las visitas
$archivo = 'visitas.json';

// Obtener la fecha actual en formato YYYY-MM-DD
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
$contenido = file_get_contents($archivo);
$datos = json_decode($contenido, true);

// Si hay un error en la lectura del archivo, inicializar valores
if (!is_array($datos)) {
    $datos = [
        "total" => 0,
        "dia" => 0,
        "fecha" => $fecha_actual
    ];
}

// Si cambió el día, reiniciar el contador diario
if ($datos["fecha"] !== $fecha_actual) {
    $datos["dia"] = 0;
    $datos["fecha"] = $fecha_actual;
}

// Incrementar las visitas
$datos["total"] += 1;
$datos["dia"] += 1;

// Guardar los nuevos valores en el archivo (asegurar escritura correcta)
file_put_contents($archivo, json_encode($datos, JSON_PRETTY_PRINT));

// Devolver los datos en formato JSON
echo json_encode($datos);
?>
