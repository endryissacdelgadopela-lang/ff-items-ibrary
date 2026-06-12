// --- BASE DE DATOS FILTRADA Y LIMPIA ---
const baseDeDatosRopa = [
    // 👀 CATEGORÍA: OJOS / ROSTRO
    { nombre: "Ojos de Compartir (Estilo Anime)", id: "201001", categoria: "ojos", descripcion: "Aspecto visual de ojos rojos luminosos inspirados en anime." },
    { nombre: "Pintura de Guerra Calavera", id: "201002", categoria: "ojos", descripcion: "Pintura facial de esqueleto que cubre los ojos y mejillas." },
    { nombre: "Ojos de Demonio Neón", id: "201003", categoria: "ojos", descripcion: "Efecto de ojos brillantes color cian, ideal para sets oscuros." },

    // 🎭 CATEGORÍA: MÁSCARAS
    { nombre: "Máscara Sakura (Pase Élite S1)", id: "211000016", categoria: "mascara", descripcion: "Máscara oficial perteneciente al primer Pase Élite Sakura (Temporada 1). El icónico rostro Kabuki tradicional, máximo símbolo de veteranía." },
    { nombre: "Máscara Criminal", id: "211000004", categoria: "mascara", descripcion: "Máscara de payaso clásica de la colección Criminales. Diseñada para cubrir el rostro con un estilo imponente." },

    // 👕 CATEGORÍA: CHAQUETAS (TORSO)
    { nombre: "Chaqueta Sakura (Pase Élite S1)", id: "203000156", categoria: "chaqueta", descripcion: "Chaqueta oficial del primer Pase Élite Sakura (Temporada 1). Cuenta con el icónico diseño tradicional japonés y la calavera en la espalda." },
    { nombre: "Chaqueta Roja Especial", id: "203000055", categoria: "chaqueta", descripcion: "Chaqueta de diseño deportivo color rojo brillante. Edición especial de colección." },

    // 👖 CATEGORÍA: PANTALONES (PIERNAS)
    { nombre: "Pantalones Sakura (Pase Élite S1)", id: "204000092", categoria: "pantalones", descripcion: "Pantalones oficiales pertenecientes al primer Pase Élite Sakura (Temporada 1). Diseño tradicional oriental." },
    { nombre: "Pantalones Heroico S2", id: "203000105", categoria: "pantalones", descripcion: "Pantalones exclusivos de rango Heroico de la Temporada 2. Un clásico de máxima veteranía con detalles en rojo y negro." },

    // 🦖 CATEGORÍA: DINOS
    { nombre: "Dino 2D (Traje Plano)", id: "203033050", categoria: "dino", descripcion: "Skin exclusiva con aspecto plano y caricaturesco en dos dimensiones. Uno de los trajes más llamativos y únicos de la colección." },

    // 🤛 CATEGORÍA: PUÑOS (NUEVOS INTEGRADOS)
    { nombre: "Puño Cobra", id: "907300004", categoria: "puños", descripcion: "Efecto de puños de la colección legendaria Cobra Rubí con destellos rojos imponentes." },
    { nombre: "Puño Evolutivo", id: "907193705", categoria: "puños", descripcion: "Aspecto especial evolutivo con animaciones y partículas de energía avanzadas al golpear." },
    { nombre: "Puño Booyah", id: "907103031", categoria: "puños", descripcion: "Diseño conmemorativo del evento Booyah Day con efectos dorados y de victoria neón." }
];

let categoriaActual = "todos";
let itemAbiertoActualmente = null;
const contenedor = document.getElementById("listaRopa");

// Función para imprimir las tarjetas en el diseño
function mostrarCatalogo(lista) {
    contenedor.innerHTML = "";
    
    if(lista.length === 0) {
        contenedor.innerHTML = "<p style='color:#666; font-size: 16px; margin-top: 30px;'>No se encontró nada con ese nombre.</p>";
        return;
    }

    lista.forEach(item => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        
        tarjeta.onclick = function(e) {
            if(!e.target.classList.contains('id-texto')) {
                abrirModal(item);
            }
        };
        
        tarjeta.innerHTML = `
            <div class="img-wrapper">
                <img src="img/${item.imagen}" alt="${item.nombre}" onerror="this.src='https://via.placeholder.com/110/ff7b00/ffffff?text=FF+Skin'">
            </div>
            <h3>${item.nombre}</h3>
            <div class="id-texto" onclick="copiarID('${item.id}')">ID: ${item.id}</div>
        `;
        
        contenedor.appendChild(tarjeta);
    });
}

// --- COPIAR ID AL PORTAPAPELES ---
function copiarID(idNum) {
    navigator.clipboard.writeText(idNum).then(() => {
        const toast = document.getElementById("toastNotification");
        toast.className = "toast show";
        setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
    });
}

// --- INTERRUPTOR DE VENTANA DE INFORMACIÓN ---
function abrirModal(item) {
    const modal = document.getElementById("infoModal");

    if (itemAbiertoActualmente === item.id && modal.classList.contains("visible")) {
        cerrarModal();
        return;
    }

    itemAbiertoActualmente = item.id;

    document.getElementById("modalNombre").innerText = item.nombre;
    document.getElementById("modalImagen").src = `img/${item.imagen}`;
    document.getElementById("modalImagen").onerror = function() { this.src = 'https://via.placeholder.com/150/ff7b00/ffffff?text=FF+Skin'; };
    document.getElementById("modalCategoria").innerText = item.categoria.toUpperCase();
    
    const modalIdBox = document.getElementById("modalId");
    modalIdBox.innerText = "ID: " + item.id;
    modalIdBox.onclick = function() { copiarID(item.id); };
    
    let descParrafo = document.getElementById("modalDesc");
    if(!descParrafo) {
        descParrafo = document.createElement("p");
        descParrafo.id = "modalDesc";
        descParrafo.style.color = "#8fa0ba";
        descParrafo.style.fontSize = "15px";
        descParrafo.style.margin = "15px 0";
        document.querySelector(".modal-content").insertBefore(descParrafo, document.getElementById("modalId"));
    }
    descParrafo.innerText = item.descripcion ? item.descripcion : "Artículo cosmético de la biblioteca.";

    modal.style.display = "flex";
    modal.classList.remove("desvanecer");
    setTimeout(() => { modal.classList.add("visible"); }, 10);
}

function cerrarModal() {
    const modal = document.getElementById("infoModal");
    modal.classList.remove("visible");
    modal.classList.add("desvanecer");
    setTimeout(() => {
        modal.style.display = "none";
        itemAbiertoActualmente = null;
    }, 300);
}

window.onclick = function(event) {
    const modal = document.getElementById("infoModal");
    if (event.target == modal) { cerrarModal(); }
}

// --- FILTRADO DE CONTENIDO ---
function filteredCat(categoria, boton) {
    categoriaActual = categoria;
    document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('activo'));
    boton.classList.add('activo');
    filtrarTodo();
}

function filtrarTodo() {
    const textoBusqueda = document.getElementById("buscador").value.toLowerCase();
    
    const resultadoFiltrado = baseDeDatosRopa.filter(item => {
        const coincideTexto = item.nombre.toLowerCase().includes(textoBusqueda);
        const coincideCategoria = (categoriaActual === "todos" || item.categoria === categoriaActual);
        return coincideTexto && coincideCategoria;
    });
    
    mostrarCatalogo(resultadoFiltrado);
}

document.getElementById("buscador").addEventListener("keyup", filtrarTodo);

// Ejecutar catálogo inicial
mostrarCatalogo(baseDeDatosRopa);
