const productos = []
const URL = "js/productos.json"

const container = document.querySelector('div.container')

   retornarCardHtml = (producto) => {
    return `<div class="card">
                <div class="card-image">${producto.imagen}</div>
                <div class="card-name">${producto.nombre}</div>
                <div class="card-price">${producto.precio}</div>
                <div class="card-button">
                    <button class="button button-outline button-add" id="${producto.id}" title="Clic para agregar al carrito">+</button>
                </div>
            </div>`

}

const activarClickEnBotones= () => {
    const botonesAgregar = document.querySelectorAll('button.button-outline.button-add')
    if(botonesAgregar !== null){
        botonesAgregar.forEach((button) =>{
            button.addEventListener('click', (e)=> {
            agregarAlCarrito(e.target.id)
            })
        })
    }
}



const cargarProductos = (array) => {
    if(array.length > 0){
        array.forEach(producto => {
            container.innerHTML += retornarCardHtml(producto)
        });
        activarClickEnBotones()
    }
}

const obtenerProductos = () => {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            productos.push(...data)
            cargarProductos(productos)
        })
        .catch((error) => {
            console.error('Error al cargar productos:', error)
            document.querySelector('.card-error').classList.remove('ocultar')
        })
}

//cargarProductos(productos);

obtenerProductos()

// Actualizar contador del carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito()
})