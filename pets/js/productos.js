const productos = [
    {
        id: 1,
        nombre: "PEDIGREE CACHORRO",
        precio: 25000,
        descripcion: "Alimento completo y balanceado para cachorros.",
        imagen: "img/comida_perro.png"
    },
    {
        id: 2,
        nombre: "PURINA CAT CHOW",
        precio: 25000,
        descripcion: "Nutrición especializada para gatos adultos.",
        imagen: "img/comida_gato.png"
    },
    {
        id: 3,
        nombre: "SNACK DENTAL PERRO",
        precio: 6000,
        descripcion: "Snack para cuidado oral diario de tu mascota.",
        imagen: "img/bienvenida.png"
    },
    {
        id: 4,
        nombre: "ARENA SANITARIA GATO",
        precio: 10000,
        descripcion: "Arena aglomerante de alta absorción y control de olor.",
        imagen: "img/bienvenida.png"
    }
];

const contenedor = document.getElementById("contenedorProductos");
const contadorNav = document.getElementById("contadorCarrito");

function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalCantidad = 0;
    for (let i = 0; i < carrito.length; i++) {
        totalCantidad += carrito[i].cantidad;
    }
    if (contadorNav) {
        contadorNav.textContent = "Carrito (" + totalCantidad + ")";
    }
}

function renderizarProductos() {
    contenedor.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        let p = productos[i];

        let div = document.createElement("div");
        div.className = "cardItems";

        div.innerHTML = 
            '<div class="textoItem">' +
                '<h3>' + p.nombre + '</h3>' +
                '<p>' + p.descripcion + '</p>' +
                '<p class="precio"><strong>PRECIO: $' + p.precio + ' CLP</strong></p>' +
                '<button type="button" class="comprarBoton" onclick="agregarAlCarrito(' + p.id + ')">Añadir al carrito</button>' +
            '</div>' +
            '<img class="imgItem" src="' + p.imagen + '" alt="' + p.nombre + '" width="200">';

        contenedor.appendChild(div);
    }
}

function agregarAlCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let productoSeleccionado = null;

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === idProducto) {
            productoSeleccionado = productos[i];
            break;
        }
    }

    if (!productoSeleccionado) return;

    let encontrado = false;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            carrito[i].cantidad++;
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        carrito.push({
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            precio: productoSeleccionado.precio,
            imagen: productoSeleccionado.imagen,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
    alert("Producto añadido al carrito.");
}

renderizarProductos();
actualizarContador();