const listaCarrito = document.getElementById("listaCarrito");
const totalPagar = document.getElementById("totalPagar");
const btnPagar = document.getElementById("btnPagar");
const btnVaciar = document.getElementById("btnVaciar");
const contadorNav = document.getElementById("contadorCarrito");

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function pintarCarrito() {
    let carrito = obtenerCarrito();
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        totalPagar.textContent = "0";
        if (contadorNav) contadorNav.textContent = "Carrito (0)";
        return;
    }

    let sumaTotal = 0;
    let cantTotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i];
        let subtotal = item.precio * item.cantidad;
        sumaTotal += subtotal;
        cantTotal += item.cantidad;

        let div = document.createElement("div");
        div.className = "cardItems";
        div.innerHTML = 
            '<div>' +
                '<h4>' + item.nombre + '</h4>' +
                '<p>Precio: $' + item.precio + ' CLP</p>' +
                '<p>Subtotal: $' + subtotal + ' CLP</p>' +
                '<button type="button" onclick="cambiarCantidad(' + item.id + ', -1)"> - </button> ' +
                '<span> ' + item.cantidad + ' </span>' +
                '<button type="button" onclick="cambiarCantidad(' + item.id + ', 1)"> + </button> ' +
                '<button type="button" onclick="eliminarProducto(' + item.id + ')">Eliminar</button>' +
            '</div>';

        listaCarrito.appendChild(div);
    }

    totalPagar.textContent = sumaTotal;
    if (contadorNav) contadorNav.textContent = "Carrito (" + cantTotal + ")";
}

function cambiarCantidad(id, cambio) {
    let carrito = obtenerCarrito();
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito[i].cantidad += cambio;
            if (carrito[i].cantidad <= 0) {
                carrito.splice(i, 1);
            }
            break;
        }
    }
    guardarCarrito(carrito);
    pintarCarrito();
}

function eliminarProducto(id) {
    let carrito = obtenerCarrito();
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito.splice(i, 1);
            break;
        }
    }
    guardarCarrito(carrito);
    pintarCarrito();
}

btnVaciar.addEventListener("click", function() {
    localStorage.removeItem("carrito");
    pintarCarrito();
});

btnPagar.addEventListener("click", function() {
    let carrito = obtenerCarrito();
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    alert("¡Compra realizada con éxito!");
    localStorage.removeItem("carrito");
    pintarCarrito();
});

pintarCarrito();