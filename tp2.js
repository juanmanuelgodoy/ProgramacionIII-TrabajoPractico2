/* Utilizando el API https://fakestoreapi.com/ realizar las siguientes tareas:
◦Recuperar la información de todos los productos (GET). */

const url = "https://fakestoreapi.com/products";

async function recuperar() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ` + response.status);
    }
    const productos = await response.json();
    console.log(productos);
  } catch (error) {
    console.log(`Error`, error);
  }
}
recuperar();

/* ◦Recuperar la información de un número limitado de productos (GET). */

async function recuperarLimitado(cant) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ` + response.status);
    }
    const productos = await response.json();
    const productosLimitados = [];
    if (cant <= productos.length && cant !== 0) {
      for (i = 0; i < cant; i++) {
        console.log(productos[i]);
        productosLimitados.push(productos[i]);
      }
    }
    return productosLimitados;
  } catch (error) {
    console.log(`Error`, error);
  }
}

/* ◦Persistir los datos de la consulta anterior en un archivo local JSON. */

const fs = require(`fs`).promises;

const persistir = async () => {
  const limitado = await recuperarLimitado(5);
  if (limitado) {
    try {
      const datosJson = JSON.stringify(limitado);
      await fs.writeFile(`./datos.json`, datosJson);
    } catch (error) {
      console.log(error);
    }
  }
};
persistir();

/* ◦Agregar un nuevo producto (POST). */

async function nuevoProducto(nuevo) {
  try {
    const response = await fetch(url, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevo),
    });
    if (!response) {
      throw new Error(`Error ` + response.status);
    }
    const datos = await response.json();
    console.log(datos);
  } catch (error) {
    console.log("error ", error);
  }
}

const nuevo = {
  id: 21,
  title: "Regla Pizzini",
  price: 3000,
  description: "Regla de 30 cm con marca cada 1mm",
  category: "Libreria",
  image: "http://example.com",
};

nuevoProducto(nuevo);

/* ◦Buscar la información de un determinado producto, utilizando un “id” como parámetro (GET). */
async function bucarProducto(id) {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error(`Error ` + response.status);
    }
    const productos = await response.json();
    console.log(productos);
  } catch (error) {
    console.log(`Error`, error);
  }
}
bucarProducto(12);

/* ◦Eliminar un producto (DELETE). */

async function eliminarProducto(id) {
  const urlEliminada = `${url}/${id}`;
  try {
    const response = await fetch(urlEliminada, {
      method: `DELETE`,
    });
    if (!response) {
      throw new Error(`Error ` + response.status);
    }
    const datos = await response.json();
    console.log(datos);
  } catch (error) {
    console.log("error ", error);
  }
}

eliminarProducto(3);

/* ◦Modificar los datos de un producto (UPDATE). */

async function actualizarProducto(actualizar, id) {
  const urlActualizada = `${url}/${id}`;
  try {
    const response = await fetch(urlActualizada, {
      method: `PUT`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actualizar),
    });
    if (!response) {
      throw new Error(`Error ` + response.status);
    }
    const datos = await response.json();
    console.log(datos);
  } catch (error) {
    console.log("error ", error);
  }
}

const id = 20;
const actualizar = {
  id: 21,
  title: "Regla Pizzini",
  price: 3000,
  description: "Regla de 30 cm con marca cada 1mm",
  category: "Libreria",
  image: "http://example.com",
};

actualizarProducto(actualizar, id);

/* •Utilizando el archivo creado en el punto anterior:
◦Agregar producto al archivo local. */

const actualizarDatos = async () => {
  try {
    const datos = await fs.readFile(`./datos.json`, `utf-8`);
    const datosParse = JSON.parse(datos);
    datosParse.push(actualizar);
    const datosStri = JSON.stringify(datosParse);
    await fs.writeFile(`./datos.json`, datosStri);
  } catch (error) {
    console.log(error);
  }
};
actualizarDatos();

/* ◦Eliminar los productos superiores a un determinado valor. */
const eliminarDatos = async () => {
  try {
    const datos = await fs.readFile(`./datos.json`, `utf-8`);
    const datosParse = JSON.parse(datos);
    const precioBajo = datosParse.filter((precio) => {
      return precio.price < 100;
    });
    const nuevodatos = JSON.stringify(precioBajo);
    await fs.writeFile(`./datos.json`, nuevodatos);
  } catch (error) {
    console.log(error);
  }
};
eliminarDatos();
