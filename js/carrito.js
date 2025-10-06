const agregarAlCarrito = (frutaId)=>{
  if(frutaId > 0){
    let productoEncontrado = productos.find((producto) => producto.id === parseInt (frutaId))
    if (productoEncontrado !== undefined){
      carritoFrutas.push(productoEncontrado)
      almacenarCarrito()
      actualizarContadorCarrito()
      mostrarMensajeAgregado(productoEncontrado.nombre)
    }
  }
}

const actualizarContadorCarrito = () => {
  const contador = document.querySelector('.contador-carrito')
  if (contador) {
    contador.textContent = carritoFrutas.length
    contador.style.display = carritoFrutas.length > 0 ? 'block' : 'none'
  }
}

const mostrarMensajeAgregado = (nombreProducto) => {
  // Crear un mensaje temporal
  const mensaje = document.createElement('div')
  mensaje.textContent = `¡${nombreProducto} agregado al carrito!`
  mensaje.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 1000;
    font-weight: bold;
  `
  document.body.appendChild(mensaje)
  
  // Remover el mensaje después de 2 segundos
  setTimeout(() => {
    document.body.removeChild(mensaje)
  }, 2000)
}


const almacenarCarrito = () => {
  if(carritoFrutas.length > 0) {
    localStorage.setItem('carritoFrutas', JSON.stringify(carritoFrutas))
  }
}

const recuperarCarrito = () => {
  return JSON.parse(localStorage.getItem('carritoFrutas')) || []
}


const carritoFrutas = recuperarCarrito()