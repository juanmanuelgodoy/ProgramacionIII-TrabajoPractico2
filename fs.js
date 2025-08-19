const fs = require("fs");
const fetch = require("node-fetch");

const archivoProductos = "./productos.json";

async function crearArchivoDesdeAPI() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("No se puede crear el listado de productos");

        const productos = await response.json();

        fs.writeFileSync(archivoProductos, JSON.stringify(productos, null, 2), "utf-8");
        console.log("Se creó productos.json");
        mostrarProductos()

    } catch (error) {
        console.error("Error al obtener el listados de productos:", error);
    }
}

function leerProductos() {
    try {
        const data = fs.readFileSync(archivoProductos, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer el archivo:", error);
        return [];
    }
}

function guardarProductos(productos) {
    try {
        fs.writeFileSync(archivoProductos, JSON.stringify(productos, null, 2), "utf-8");
        console.log("El archivo productos.json se actualizó correctamente")
        mostrarProductos()

    } catch (error) {
        console.error("Error al guardar el archivo:", error);
    }
}

function agregarProducto(nuevoProducto) {
    const productos = leerProductos();
    productos.push(nuevoProducto);
    guardarProductos(productos);
}

function eliminarProductos(precio) {
    let productos = leerProductos();
    productos = productos.filter(p => p.price >= precio);
    guardarProductos(productos);
}

const nuevoProducto = {
    id: 21,
    title: "Producto agregado con fileSystem",
    price: 199.99,
    description: "95% Cotton, 5% Spandex",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png",
    rating: { rate: 3.6, count: 145 }
};

function mostrarProductos() {
    try {
        const data = fs.readFileSync(archivoProductos, "utf-8");
        const productos = JSON.parse(data);

        console.log("El listado actual de productos es:");
        console.log(JSON.stringify(productos, null, 2));

    } catch (error) {
        console.error("Error al mostrar productos:", error);
    }
}

crearArchivoDesdeAPI()
//agregarProducto(nuevoProducto);
//eliminarProductos(200);
