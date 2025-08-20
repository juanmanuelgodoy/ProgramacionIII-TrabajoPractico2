const url = 'https://fakestoreapi.com/products';

// Punto 1 - Recuperar la información de todos los productos (GET)
async function obtenerTodosLosProductos() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const productos = await response.json();

    productos.forEach(producto => {
      console.log(`ID: ${producto.id} - Producto: ${producto.title} - Precio: $${producto.price}`);
    });

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

obtenerTodosLosProductos();

// Punto 2 - Recuperar un número limitado de productos (GET)
async function obtenerProductosLimitados(cantidad) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const productos = await response.json();

    // Mostrar solo los primeros 'cantidad' productos
    productos.slice(0, cantidad).forEach(producto => {
      console.log(`ID: ${producto.id} - Producto: ${producto.title} - Precio: $${producto.price}`);
    });

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

obtenerProductosLimitados(5);
// Punto 3 -  Persistir los datos de la consulta anterior en un archivo local JSON.
const fs = require('fs').promises;  // Importá fs para escribir archivos

async function guardarProductosEnArchivo(productos, nombreArchivo) {
  try {
    await fs.writeFile(nombreArchivo, JSON.stringify(productos, null, 2), 'utf-8');
    console.log(`Archivo ${nombreArchivo} guardado correctamente.`);
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
  }
}

async function obtenerYGuardarProductosLimitados(cantidad) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error ${response.status}`);

    const productos = await response.json();

    const productosLimitados = productos.slice(0, cantidad);

    productosLimitados.forEach(producto => {
      console.log(`ID: ${producto.id} - Producto: ${producto.title} - Precio: $${producto.price}`);
    });

    // Guardar en archivo JSON local
    await guardarProductosEnArchivo(productosLimitados, 'productosLimitados.json');

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Llamá la función para probar:
obtenerYGuardarProductosLimitados(5);
// Punto 4 Agregar un nuevo producto (POST).
async function crearProducto(producto) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // El cuerpo de la solicitud es JSON
      },
      body: JSON.stringify(producto), // Convertimos el objeto JS a JSON
    });

    if (!response.ok) {
      throw new Error('Error ' + response.status);
    }

    const datos = await response.json();
    console.log('Producto creado:', datos);

  } catch (error) {
    console.log('Error:', error.message);
  }
}

// Producto de prueba a enviar
const producto = {
  title: 'Producto creado de prueba',
  price: 13.5,
  description: 'Descripción del producto de prueba',
  image: 'https://i.pravatar.cc',
  category: 'electronica'
};

// Llamada a la función para crear el producto
crearProducto(producto);

// Punto 5 Buscar la información de un determinado producto, utilizando un “id” como parámetro (GET).
async function buscarPorId(id) {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const datos = await response.json();
    console.log(datos);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

buscarPorId(5);

// Punto 6 Eliminar un producto por ID (DELETE)
async function eliminarProducto(id) {
  try {
    const response = await fetch(`${url}${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const datos = await response.json();
    console.log(`Producto con ID ${id} eliminado:`, datos);

  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error.message);
  }
}

// Llamada de ejemplo para eliminar un producto
eliminarProducto(6);

// Punto 7 Modificar los datos de un producto (PUT)
async function actualizarProducto(id, nuevosDatos) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Indicamos que el cuerpo es JSON
      },
      body: JSON.stringify(nuevosDatos), // Convertimos los nuevos datos a JSON
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const datos = await response.json();
    console.log(`Producto con ID ${id} actualizado:`, datos);

  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id}:`, error.message);
  }
}

// Ejemplo de uso para actualizar un producto
const nuevosDatos = {
  title: 'Producto modificado',
  price: 99.99,
  description: 'Descripción actualizada del producto',
  image: 'https://i.pravatar.cc',
  category: 'nueva-categoria'
};

actualizarProducto(21, nuevosDatos); // Asegurate de que el ID 21 exista (por ejemplo, un producto que creaste con POST)
