
// Función para agregar un producto nuevo al archivo JSON local
const fs = require('fs').promises;
async function agregarProductoAlArchivo(nuevoProducto, nombreArchivo = 'productosLimitados.json') {
  try {
    // Leer archivo
    const datos = await fs.readFile(nombreArchivo, 'utf-8');
    const productos = JSON.parse(datos);

    // Agregar nuevo producto
    productos.push(nuevoProducto);

    // Guardar archivo actualizado
    await fs.writeFile(nombreArchivo, JSON.stringify(productos, null, 2), 'utf-8');
    console.log('Producto agregado al archivo local correctamente.');
  } catch (error) {
    console.error('Error al agregar producto al archivo:', error);
  }
}

// Función para eliminar productos con precio mayor a un valor dado del archivo JSON local
async function eliminarProductosPorPrecio(maxPrecio, nombreArchivo = 'productosLimitados.json') {
  try {
    // Leer archivo
    const datos = await fs.readFile(nombreArchivo, 'utf-8');
    let productos = JSON.parse(datos);

    // Filtrar productos cuyo precio sea menor o igual a maxPrecio
    productos = productos.filter(producto => producto.price <= maxPrecio);

    // Guardar archivo actualizado
    await fs.writeFile(nombreArchivo, JSON.stringify(productos, null, 2), 'utf-8');
    console.log(`Productos con precio mayor a ${maxPrecio} pesos eliminados del archivo local.`);
  } catch (error) {
    console.error('Error al eliminar productos por precio:', error);
  }
}

// Ejemplo:

// Producto a agregar
const productoNuevoArchivo = {
  id: 999,
  title: "Producto agregado localmente",
  price: 20,
  description: "Este producto se agregó solo al archivo JSON",
  image: "https://i.pravatar.cc",
  category: "varios"
};

async function manejarArchivoLocal() {
  // 1) Agregar producto nuevo al archivo JSON
  await agregarProductoAlArchivo(productoNuevoArchivo);

  // 2) Eliminar productos con precio mayor a 60
  await eliminarProductosPorPrecio(60);

  console.log('Operaciones sobre archivo local completadas.');
}

// Llamar la función para ejecutar las operaciones sobre el archivo JSON local
manejarArchivoLocal();
