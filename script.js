//1-ENTREGA JS 

// Objeto que almacena los datos 
const datos = {
    usuario: "admin", // Nombre del administrador
    contrasenia: "1234", // Contraseña del admin
    ingreso: false, // Estado de inicio de sesión (false = no ha iniciado sesión)
    productos: [] // Lista vacía donde se guardarán los turnos
}

// LOGIN
function login(intentos, maximaCantidadIntentos) {
    alert(`Tiene ${maximaCantidadIntentos} intentos posibles de ingresar, este es su intento ${intentos + 1}`);
    
    // Solicita al usuario ingresar su nombre y contraseña
    let usuarioIngresado = prompt("Ingrese su nombre");
    let usuarioLower = usuarioIngresado.toLowerCase(); 
    let contraseniaIngresada = prompt("Ingrese la contraseña");
    
    // Verifica si el usuario y contraseña coinciden con los datos almacenados
    if ((datos.usuario === usuarioLower) && (datos.contrasenia === contraseniaIngresada)) {
        alert("Bienvenido");
        datos.ingreso = true; // Cambia el estado de ingreso a verdadero
        return true; // Retorna verdadero si el login es exitoso
    } else {
        alert(`Le quedan ${maximaCantidadIntentos - (intentos + 1)} intentos`);
    }
}

// LOGIN INTENTOS
function loginLoop(intentos, maximaCantidadIntentos) {
    do {
        if (login(intentos, maximaCantidadIntentos)) {
            break; // Sale del bucle si el usuario ingresa correctamente
        }
        intentos++;
    } while (intentos < maximaCantidadIntentos);
}

// FUNCION PARA AGREGAR PRODUCTOS 
function agregarProductos() {
    let agregarProducto = true;
    
    while (agregarProducto) {
        let nombreProducto = prompt("Ingrese el nombre del producto");
        let precioProducto = Number(prompt(`Ingrese el precio del producto ${nombreProducto}`));
        
        // Validación de precio
        while (isNaN(precioProducto) || precioProducto <= 0) {
            precioProducto = Number(prompt("Por favor ingrese un precio válido para el producto"));
        }
        
        let cantidadProducto = Number(prompt(`Ingrese la cantidad disponible de ${nombreProducto}`));
        
        // Validación de cantidad
        while (isNaN(cantidadProducto) || cantidadProducto < 0) {
            cantidadProducto = Number(prompt("Por favor ingrese una cantidad válida"));
        }
        
        // Se crea un objeto producto
        const producto = {
            nombre: nombreProducto,
            precio: precioProducto,
            cantidad: cantidadProducto
        };
        
        // Se agrega el producto al array de productos
        datos.productos.push(producto);
        
        agregarProducto = confirm("¿Desea agregar otro producto?");
    }
}

// MOSTRAR PRODUCTOS DISPONIBLES 
function mostrarProductos() {
    let textoListaProductos = `Hay un total de ${datos.productos.length} productos disponibles:`;
    
    for (let i = 0; i < datos.productos.length; i++) {
        textoListaProductos += `\n ${i + 1} - ${datos.productos[i].nombre} | Precio: $${datos.productos[i].precio} | Cantidad: ${datos.productos[i].cantidad}`;
    }
    
    alert(textoListaProductos);
}

// MODIFICAR PRODUCTO
function modificarProducto() {
    // Muestra la lista de productos antes de que el usuario elija cuál modificar
    mostrarProductos();
    
    let idProducto = Number(prompt("Ingrese el número del producto que desea modificar"));
    let producto = datos.productos[idProducto - 1];
    
    if (producto) {
        let nuevoPrecio = Number(prompt(`Ingrese el nuevo precio para ${producto.nombre}`));
        let nuevaCantidad = Number(prompt(`Ingrese la nueva cantidad disponible para ${producto.nombre}`));
        
        producto.precio = nuevoPrecio;
        producto.cantidad = nuevaCantidad;
        
        alert(`Producto ${producto.nombre} actualizado: Precio - $${producto.precio}, Cantidad - ${producto.cantidad}`);
    } else {
        alert("Producto no encontrado");
    }
}


// ELIMINAR PRODUCTO 
function eliminarProducto() {
    let idProducto = Number(prompt("Ingrese el número del producto que desea eliminar"));
    if (idProducto > 0 && idProducto <= datos.productos.length) {
        datos.productos.splice(idProducto - 1, 1);
        alert("Producto eliminado");
    } else {
        alert("Producto no encontrado");
    }
}

// MENU
const preguntaSeleccion = () => {
    let eleccion = prompt("¿Qué desea hacer?\n 1 - Mostrar productos\n 2 - Agregar productos\n 3 - Modificar producto\n 4 - Eliminar producto\n Ingrese el número de su elección.");
    return parseInt(eleccion);
};

const selector = (eleccion) => {
    switch (eleccion) {
        case 1:
            mostrarProductos();
            break;
        case 2:
            agregarProductos();
            break;
        case 3:
            modificarProducto();
            break;
        case 4:
            eliminarProducto();
            break;
        default:
            alert("Ingreso un valor inválido");
    }
};

// Función que inicia el sistema
const inicializar = () => {
    let intentos = 0;
    const maximaCantidadDeIntentos = 3;
    loginLoop(intentos, maximaCantidadDeIntentos);
    if (datos.ingreso) {
        do {
            selector(preguntaSeleccion());
        } while (confirm("¿Desea continuar?"));
    }
};

inicializar();