const form = document.getElementById("formLogin");
const correo = document.getElementById("correo");
const password = document.getElementById("password");

const errorCorreo = document.getElementById("errorCorreo");
const errorPassword = document.getElementById("errorPassword");

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

password.addEventListener("input", function() {
    let valor = password.value;
    if (valor === "") {
        errorPassword.textContent = "La contraseña es obligatoria.";
    } else if (valor.length < 4 || valor.length > 10) {
        errorPassword.textContent = "Debe tener entre 4 y 10 caracteres.";
    } else {
        errorPassword.textContent = "";
    }
});

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let c = correo.value.trim().toLowerCase();
    let p = password.value;
    let hayError = false;

    if (c === "" || (!c.endsWith("@gmail.com"))) {
        errorCorreo.textContent = "Correo inválido.";
        hayError = true;
    }

    if (p.length < 4 || p.length > 10) {
        errorPassword.textContent = "Entre 4 y 10 caracteres.";
        hayError = true;
    }

    if (hayError) {
        alert("Complete los campos correctamente.");
        return;
    }

    let usuariosGuardados = localStorage.getItem("usuarios");
    let listaUsuarios = [];
    if (usuariosGuardados) {
        listaUsuarios = JSON.parse(usuariosGuardados);
    }

    let usuarioEncontrado = null;
    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].correo.toLowerCase() === c && listaUsuarios[i].password === p) {
            usuarioEncontrado = listaUsuarios[i];
            break;
        }
    }

    if (usuarioEncontrado) {
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
        alert("Bienvenido " + usuarioEncontrado.nombre);
        window.location.href = "index.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});