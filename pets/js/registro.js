const regionesYComunas = [
    {
        region: "Región Metropolitana de Santiago",
        comunas: ["Santiago", "Providencia", "Las Condes", "Ñuñoa", "Maipú", "La Granja", "Puente Alto"]
    },
    {
        region: "Región de Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón"]
    },
    {
        region: "Región de La Araucanía",
        comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol"]
    },
    {
        region: "Región de Ñuble",
        comunas: ["Chillán", "Chillán Viejo", "San Carlos", "Bulnes"]
    },
    {
        region: "Región del Maule",
        comunas: ["Talca", "Linares", "Curicó", "Longaví"]
    },
    {
        region: "Región del Biobío",
        comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante"]
    }
];

const form = document.getElementById("formRegistro");
const run = document.getElementById("run");
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const correo = document.getElementById("correo");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const direccion = document.getElementById("direccion");
const region = document.getElementById("region");
const comuna = document.getElementById("comuna");

const errorRun = document.getElementById("errorRun");
const errorNombre = document.getElementById("errorNombre");
const errorApellidos = document.getElementById("errorApellidos");
const errorCorreo = document.getElementById("errorCorreo");
const errorPassword = document.getElementById("errorPassword");
const errorConfirmPassword = document.getElementById("errorConfirmPassword");
const errorDireccion = document.getElementById("errorDireccion");
const errorRegion = document.getElementById("errorRegion");
const errorComuna = document.getElementById("errorComuna");

for (let i = 0; i < regionesYComunas.length; i++) {
    let opt = document.createElement("option");
    opt.value = regionesYComunas[i].region;
    opt.textContent = regionesYComunas[i].region;
    region.appendChild(opt);
}

region.addEventListener("change", function() {
    comuna.innerHTML = '<option value="">-- Seleccione una comuna --</option>';
    
    if (region.value === "") {
        comuna.disabled = true;
        errorRegion.textContent = "Seleccione una región.";
        return;
    }
    
    errorRegion.textContent = "";
    comuna.disabled = false;

    for (let i = 0; i < regionesYComunas.length; i++) {
        if (regionesYComunas[i].region === region.value) {
            let lista = regionesYComunas[i].comunas;
            for (let j = 0; j < lista.length; j++) {
                let opt = document.createElement("option");
                opt.value = lista[j];
                opt.textContent = lista[j];
                comuna.appendChild(opt);
            }
            break;
        }
    }
});

comuna.addEventListener("change", function() {
    if (comuna.value === "") {
        errorComuna.textContent = "Seleccione una comuna.";
    } else {
        errorComuna.textContent = "";
    }
});

run.addEventListener("input", function() {
    let valor = run.value.trim();
    if (valor === "") {
        errorRun.textContent = "El RUN es obligatorio.";
    } else if (valor.length < 7 || valor.length > 9) {
        errorRun.textContent = "El RUN debe tener entre 7 y 9 caracteres.";
    } else {
        errorRun.textContent = "";
    }
});

nombre.addEventListener("input", function() {
    let valor = nombre.value.trim();
    if (valor === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
    } else if (valor.length > 50) {
        errorNombre.textContent = "Máximo 50 caracteres.";
    } else {
        errorNombre.textContent = "";
    }
});

apellidos.addEventListener("input", function() {
    let valor = apellidos.value.trim();
    if (valor === "") {
        errorApellidos.textContent = "Los apellidos son obligatorios.";
    } else if (valor.length > 100) {
        errorApellidos.textContent = "Máximo 100 caracteres.";
    } else {
        errorApellidos.textContent = "";
    }
});

correo.addEventListener("input", function() {
    let valor = correo.value.trim().toLowerCase();
    if (valor === "") {
        errorCorreo.textContent = "El correo es obligatorio.";
    } else if (valor.length > 100) {
        errorCorreo.textContent = "Máximo 100 caracteres.";
    } else if (!valor.endsWith("@duoc.cl") && !valor.endsWith("@profesor.duoc.cl") && !valor.endsWith("@gmail.com")) {
        errorCorreo.textContent = "Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
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

confirmPassword.addEventListener("input", function() {
    if (confirmPassword.value === "") {
        errorConfirmPassword.textContent = "Confirme la contraseña.";
    } else if (confirmPassword.value !== password.value) {
        errorConfirmPassword.textContent = "Las contraseñas no coinciden.";
    } else {
        errorConfirmPassword.textContent = "";
    }
});

direccion.addEventListener("input", function() {
    let valor = direccion.value.trim();
    if (valor === "") {
        errorDireccion.textContent = "La dirección es obligatoria.";
    } else if (valor.length > 300) {
        errorDireccion.textContent = "Máximo 300 caracteres.";
    } else {
        errorDireccion.textContent = "";
    }
});

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let hayError = false;

    if (run.value.trim().length < 7 || run.value.trim().length > 9) {
        errorRun.textContent = "El RUN debe tener entre 7 y 9 caracteres.";
        hayError = true;
    }
    if (nombre.value.trim() === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        hayError = true;
    }
    if (apellidos.value.trim() === "") {
        errorApellidos.textContent = "Los apellidos son obligatorios.";
        hayError = true;
    }

    let c = correo.value.trim().toLowerCase();
    if (c === "" || (!c.endsWith("@duoc.cl") && !c.endsWith("@profesor.duoc.cl") && !c.endsWith("@gmail.com"))) {
        errorCorreo.textContent = "Correo inválido.";
        hayError = true;
    }

    if (password.value.length < 4 || password.value.length > 10) {
        errorPassword.textContent = "Entre 4 y 10 caracteres.";
        hayError = true;
    }

    if (confirmPassword.value !== password.value || confirmPassword.value === "") {
        errorConfirmPassword.textContent = "Las contraseñas no coinciden.";
        hayError = true;
    }

    if (direccion.value.trim() === "") {
        errorDireccion.textContent = "La dirección es obligatoria.";
        hayError = true;
    }

    if (region.value === "") {
        errorRegion.textContent = "Seleccione una región.";
        hayError = true;
    }

    if (comuna.value === "") {
        errorComuna.textContent = "Seleccione una comuna.";
        hayError = true;
    }

    if (hayError) {
        alert("Faltan campos por completar correctamente.");
        return;
    }

    let usuariosGuardados = localStorage.getItem("usuarios");
    let listaUsuarios = [];
    if (usuariosGuardados) {
        listaUsuarios = JSON.parse(usuariosGuardados);
    }

    let usuarioNuevo = {
        run: run.value.trim(),
        nombre: nombre.value.trim(),
        apellidos: apellidos.value.trim(),
        correo: correo.value.trim(),
        password: password.value,
        telefono: document.getElementById("telefono").value.trim(),
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        direccion: direccion.value.trim(),
        region: region.value,
        comuna: comuna.value,
        rol: "Cliente"
    };

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].run === usuarioNuevo.run || listaUsuarios[i].correo === usuarioNuevo.correo) {
            alert("El usuario ya existe.");
            return;
        }
    }

    listaUsuarios.push(usuarioNuevo);
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

    alert("Usuario registrado con éxito.");
    window.location.href = "sesion.html";
});