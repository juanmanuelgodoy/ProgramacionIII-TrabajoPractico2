async function obtenerProductos() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("No se puede crear el listado de productos");
        const productos = await response.json();

        console.log("Listado de productos:", productos);
    } catch (error) {
        console.error("Error al obtener el listados de productos:", error);
    }
}

async function obtenerProductosSeleccionados() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("No se puede crear el listado de productos seleccionados");

        const productos = await response.json();

        const seleccionados = productos.filter(p => p.category === "women's clothing");

        console.log("Listado de productos seleccionados:", seleccionados);

        return seleccionados

    } catch (error) {
        console.error("Error al obtener el listado de productos seleccionados:", error);
    }
}

async function guardarSeleccionados() {
        try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("No se puede crear el listado de productos seleccionados");

        const productos = await response.json();

        const seleccionados = productos.filter(p => p.category === "women's clothing");

        const prodSeleccionados = JSON.stringify(seleccionados, null, 2);

        console.log("Listado de productos seleccionados (json) es: ", prodSeleccionados);

    } catch (error) {
        console.error("Error al obtener el listado de productos seleccionados:", error);
    }
}

async function agregarProducto() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("No se puede crear el listado de productos");

        let productos = await response.json();

        const nuevoProducto = {
            id: 21,
            title: "Nuevo producto agregado por POST",
            price: 199.99,
            description: '95%Cotton,5%Spandex, Features: Casual',
            category: "women's clothing",
            image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png', 
            rating: { rate: 3.6, count: 145 }
        };

        const postResponse = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            body: JSON.stringify(nuevoProducto),
            headers: { "Content-Type": "application/json" }
        });

        const productoAgregado = await postResponse.json();

        console.log("Producto agregado: ", productoAgregado);

        productos.push(productoAgregado);

        console.log("Listado de  nuevos productos: ", productos);

    } catch (error) {
        console.error("Error al agregar el producto", error);
    }
}

async function productoPorId() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("No se puede crear el listado de productos seleccionados");

        const productos = await response.json();

        let buscado = productos.find((iden) => {
            return iden.id === 3;
        });

        console.log("El producto con el id: 3 es :", buscado);

    } catch (error) {
        console.error("Error al obtener el producto buscado: ", error);
    }
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();
        console.log("Producto eliminado:", data);

    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
}

async function actualizarProducto(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: "Producto actualizado",
                price: 250.99,
                description: "Nueva descripción",
                category: "men's clothing",
                image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png",
                rating: { rate: 3.6, count: 145 } // la API lo va a ignorar
            }),
            headers: { "Content-Type": "application/json" }
        });

        const productoActualizado = await response.json();
        console.log("El producto modificado es:", productoActualizado);

        const respTodos = await fetch("https://fakestoreapi.com/products");
        const productosFinales = await respTodos.json();
        console.log("El listado de productos finales es:", productosFinales);

    } catch (error) {
        console.error("Error al actualizar el producto:", error);
    }
}

//obtenerProductos();
//obtenerProductosSeleccionados()
//guardarSeleccionados()
//agregarProducto();
//productoPorId()
//eliminarProducto(3);
//actualizarProducto(3);
