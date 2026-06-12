// 1. Aquí guardas la lista de toda la ropa. Puedes agregar todas las que quieras siguiendo el formato.
const baseDeDatosRopa = [
    {
        nombre: "Pantalones Angelicales",
        id: "1050012",
        imagen: "angelical.png" // Nombre del archivo de imagen que subas
    },
    {
        nombre: "Chaqueta Criminal Rojo",
        id: "1020045",
        imagen: "criminal.png"
    },
    {
        nombre: "Máscara Sakura",
        id: "1080023",
        imagen: "sakura.png"
    }
];

const contenedor = document.getElementById("listaRopa");

// 2. Función para mostrar la ropa en la pantalla
function mostrarCatalogo(lista) {
    contenedor.innerHTML = ""; // Limpiar pantalla
    
    if(lista.length === 0) {
        contenedor.innerHTML = "<p>No se encontró ninguna skin con ese nombre.</p>";
        return;
    }

    lista.forEach(item => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        
        tarjeta.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='https://via.placeholder.com/100?text=Sin+Icono'">
            <h3>${item.nombre}</h3>
            <div class="id-texto">ID: ${item.id}</div>
        `;
        
        contenedor.appendChild(tarjeta);
    });
}

// 3. Función para que el buscador funcione en tiempo real al escribir
function filtrarRopa() {
    const textoBusqueda = document.getElementById("buscador").value.toLowerCase();
    const ropaFiltrada = baseDeDatosRopa.filter(item => 
        item.nombre.toLowerCase().includes(textoBusqueda)
    );
    mostrarCatalogo(ropaFiltrada);
}

// Ejecutar al cargar la página por primera vez
mostrarCatalogo(baseDeDatosRopa);
