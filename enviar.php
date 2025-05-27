<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST["nombre"]);
    $correo = htmlspecialchars($_POST["correo"]);
    $mensaje = htmlspecialchars($_POST["mensaje"]);

    $destinatario = "felipealvarezpiriz44@gmail.com"; // Tu mail
    $asunto = "Nuevo mensaje de contacto desde Alvarez Solutions";

    $contenido = "Nombre: $nombre\n";
    $contenido .= "Correo: $correo\n\n";
    $contenido .= "Mensaje:\n$mensaje";

    $cabeceras = "From: $correo";

    if (mail($destinatario, $asunto, $contenido, $cabeceras)) {
        echo "<script>alert('Mensaje enviado correctamente'); window.location.href='contacto.html';</script>";
    } else {
        echo "<script>alert('Hubo un error al enviar el mensaje'); window.location.href='contacto.html';</script>";
    }
}
?>
