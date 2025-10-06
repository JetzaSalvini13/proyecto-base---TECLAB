const tbody = document.querySelector("tbody");
const btnComprar = document.querySelector("button#btnComprar");

const retornarTablaHTML = (producto) => {
    return ` <tr>
                  <th id="tablehead">${producto.imagen}</th>
                  <th id="tablehead">${producto.nombre}</th>
                  <th id="tablehead">$${producto.precio}</th>
                  <th id="tablehead"><button class="button button-small button-delete" onclick="quitarDelCarrito(${producto.id})">Quitar</button></th>
             </tr>`;
};


// Función para quitar productos del carrito
const quitarDelCarrito = (productoId) => {
    const indice = carritoFrutas.findIndex(producto => producto.id === productoId);
    if (indice > -1) {
        carritoFrutas.splice(indice, 1);
        localStorage.setItem('carritoFrutas', JSON.stringify(carritoFrutas));
        actualizarTabla();
    }
};

// Función para actualizar la tabla
const actualizarTabla = () => {
    if(carritoFrutas.length > 0) {
        tbody.innerHTML = "";
        carritoFrutas.forEach(
            (producto)=> (tbody.innerHTML += retornarTablaHTML(producto))
        );
    } else {
        tbody.innerHTML = "<tr><td colspan='4' style='text-align: center;'>No hay productos en el carrito</td></tr>";
    }
};

// Inicializar la tabla
actualizarTabla();

btnComprar.addEventListener("click", ()=> {
    if(carritoFrutas.length === 0) {
        alert("No hay productos en el carrito");
        return;
    }
    
    const total = carritoFrutas.reduce((sum, producto) => sum + producto.precio, 0);
    window.location.href = `page.html?total=${total}`;
    // alert(`¡Gracias por su compra! Total: $${total}. ¡Vuelva pronto!`);
    localStorage.removeItem("carritoFrutas");
    carritoFrutas.length = 0; // Limpiar el array
    actualizarTabla();
});