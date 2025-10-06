// Obtener el total de la URL
const urlParams = new URLSearchParams(window.location.search);
const totalParam = urlParams.get('total');
const total = totalParam ? parseFloat(totalParam) : 0;

// Elementos del DOM
const cuerpoTabla = document.getElementById('cuerpoTabla');
const totalCompra = document.getElementById('totalCompra');
const btnPagar = document.getElementById('btnPagar');
const modalPago = document.getElementById('modalPago');
const btnConfirmarPago = document.getElementById('btnConfirmarPago');
const opcionesPago = document.querySelectorAll('.opcion-pago');
const radioButtons = document.querySelectorAll('input[name="metodoPago"]');

// Recuperar el carrito del localStorage
const carritoFrutas = JSON.parse(localStorage.getItem('carritoFrutas')) || [];

// Función para contar la cantidad de cada producto
const contarProductos = (carrito) => {
    const conteo = {};
    carrito.forEach(producto => {
        if (conteo[producto.id]) {
            conteo[producto.id].cantidad++;
        } else {
            conteo[producto.id] = {
                ...producto,
                cantidad: 1
            };
        }
    });
    return Object.values(conteo);
};

// Función para generar la fila de la tabla
const generarFilaTabla = (producto) => {
    const subtotal = producto.precio * producto.cantidad;
    return `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.imagen} ${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio}</td>
            <td>$${subtotal}</td>
        </tr>
    `;
};

// Función para cargar la tabla de resumen
const cargarTablaResumen = () => {
    if (carritoFrutas.length === 0) {
        cuerpoTabla.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px;">
                    <h3>No hay productos en el carrito</h3>
                    <p>¡Ve a la tienda y selecciona algunas frutas deliciosas!</p>
                    <a href="index.html" class="button">Ir a la tienda</a>
                </td>
            </tr>
        `;
        btnPagar.style.display = 'none';
        return;
    }

    const productosConCantidad = contarProductos(carritoFrutas);
    let totalCalculado = 0;

    productosConCantidad.forEach(producto => {
        cuerpoTabla.innerHTML += generarFilaTabla(producto);
        totalCalculado += producto.precio * producto.cantidad;
    });

    totalCompra.innerHTML = `<strong>$${totalCalculado}</strong>`;
};

// Función para mostrar el modal de pago
const mostrarModalPago = () => {
    modalPago.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
};

// Función para cerrar el modal
const cerrarModal = () => {
    modalPago.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
};

// Función para manejar la selección de método de pago
const manejarSeleccionPago = () => {
    opcionesPago.forEach(opcion => {
        opcion.addEventListener('click', () => {
            // Remover selección anterior
            opcionesPago.forEach(o => o.classList.remove('selected'));
            // Agregar selección actual
            opcion.classList.add('selected');
            // Habilitar botón de confirmar
            btnConfirmarPago.disabled = false;
        });
    });
};

// Función para procesar el pago
const procesarPago = () => {
    const metodoSeleccionado = document.querySelector('input[name="metodoPago"]:checked');
    
    if (!metodoSeleccionado) {
        Swal.fire({
            icon: 'warning',
            title: 'Selecciona un método de pago',
            text: 'Por favor, elige cómo deseas pagar tu compra.'
        });
        return;
    }

    const metodo = metodoSeleccionado.value;
    const total = totalCompra.textContent.replace('$', '');
    
    // Simular procesamiento del pago
    Swal.fire({
        title: 'Procesando pago...',
        text: 'Por favor espera mientras procesamos tu compra',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // Simular delay del procesamiento
    setTimeout(() => {
        let mensaje = '';
        let icono = 'success';
        
        switch(metodo) {
            case 'transferencia':
                mensaje = `¡Pago procesado!<br>Total: $${total}<br><br>📧 Te enviaremos los datos de transferencia por email.`;
                break;
            case 'efectivo':
                mensaje = `¡Compra confirmada!<br>Total: $${total}<br><br>💵 Pago contra entrega. Te contactaremos para coordinar la entrega.`;
                break;
            case 'tarjetaDebito':
                mensaje = `¡Pago exitoso!<br>Total: $${total}<br><br>💳 Tu tarjeta de débito ha sido procesada correctamente.`;
                break;
            case 'tarjetaCredito':
                mensaje = `¡Pago aprobado!<br>Total: $${total}<br><br>💳 Tu tarjeta de crédito ha sido procesada correctamente.`;
                break;
        }

        Swal.fire({
            icon: icono,
            title: '¡Compra realizada con éxito!',
            html: mensaje,
            confirmButtonText: '¡Genial!',
            allowOutsideClick: false
        }).then(() => {
            // Limpiar carrito y redirigir
            localStorage.removeItem('carritoFrutas');
            window.location.href = 'index.html';
        });
    }, 2000);
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarTablaResumen();
    manejarSeleccionPago();
});

// Botón de pagar
btnPagar.addEventListener('click', mostrarModalPago);

// Botón de confirmar pago
btnConfirmarPago.addEventListener('click', procesarPago);

// Cerrar modal al hacer clic en la X
document.querySelector('.close').addEventListener('click', cerrarModal);

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === modalPago) {
        cerrarModal();
    }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalPago.style.display === 'block') {
        cerrarModal();
    }
});

// Manejar radio buttons directamente
radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        opcionesPago.forEach(opcion => opcion.classList.remove('selected'));
        radio.closest('.opcion-pago').classList.add('selected');
        btnConfirmarPago.disabled = false;
    });
});
