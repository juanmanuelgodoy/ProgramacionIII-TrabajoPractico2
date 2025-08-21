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

        if (!response.ok) throw new Error(`Error al eliminar producto con id ${id}`);

        const productoEliminado = await response.json();
        console.log("Producto eliminado:", productoEliminado);

    } catch (error) {
        console.error("Error al obtener el producto buscado: ", error);
    }
}

async function actualizarProducto(id) {
    const productoActualizado = {
        title: "Producto actualizado con Update",
        price: 39.99,
        description: "Descripción actualizada",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png"
    };

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productoActualizado)
        });

        if (!response.ok) throw new Error(`Error al actualizar producto con id ${id}`);

        const productoAct = await response.json();
        console.log("El producto actualizado es: ", productoAct);

        const todosLosProductos = await fetch("https://fakestoreapi.com/products");
        const productos = await todosLosProductos.json();
        console.log("El listado final de los productos es: ", productos);

    } catch (error) {
        console.error("Error al obtener el producto buscado: ", error);
    }
}

obtenerProductos();
//obtenerProductosSeleccionados()
//guardarSeleccionados()
//agregarProducto();
//productoPorId()
//eliminarProducto(3);
//actualizarProducto(3);
