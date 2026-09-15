const form = document.getElementById("formContacto");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const comentario = document.getElementById("comentario");

const errorNombre = document.getElementById("errorNombre");
const errorCorreo = document.getElementById("errorCorreo");
const errorComentario = document.getElementById("errorComentario");

nombre.addEventListener("input", function() {
    let valor = nombre.value.trim();
    if (valor === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
    } else if (valor.length > 100) {
        errorNombre.textContent = "Máximo 100 caracteres.";
    } else {
        errorNombre.textContent = "";
    }
});

correo.addEventListener("input", function() {
    let valor = correo.value.trim().toLowerCase();
    if (valor === "") {
        errorCorreo.textContent = "El correo es obligatorio.";
    } else if (valor.length > 100) {
        errorCorreo.textContent = "Máximo 100 caracteres.";
    } else if (!valor.endsWith("@gmail.com")) {
        errorCorreo.textContent = "Solo correos @gmail.com.";
    } else {
        errorCorreo.textContent = "";
    }
});

comentario.addEventListener("input", function() {
    let valor = comentario.value.trim();
    if (valor === "") {
        errorComentario.textContent = "El comentario es obligatorio.";
    } else if (valor.length > 500) {
        errorComentario.textContent = "Máximo 500 caracteres.";
    } else {
        errorComentario.textContent = "";
    }
});

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let hayError = false;

    if (nombre.value.trim() === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        hayError = true;
    }

    let c = correo.value.trim().toLowerCase();
    if (c === "" || (!c.endsWith("@gmail.com"))) {
        errorCorreo.textContent = "Correo inválido.";
        hayError = true;
    }

    if (comentario.value.trim() === "") {
        errorComentario.textContent = "El comentario es obligatorio.";
        hayError = true;
    }

    if (hayError) {
        alert("Por favor revise los campos.");
        return;
    }

    let mensaje = {
        nombre: nombre.value.trim(),
        correo: correo.value.trim(),
        comentario: comentario.value.trim()
    };

    let mensajesGuardados = localStorage.getItem("mensajesContacto");
    let listaMensajes = [];
    if (mensajesGuardados) {
        listaMensajes = JSON.parse(mensajesGuardados);
    }

    listaMensajes.push(mensaje);
    localStorage.setItem("mensajesContacto", JSON.stringify(listaMensajes));

    alert("Mensaje enviado con éxito.");
    form.reset();
});