// --- BASE DE DATOS ACTUALIZADA CON DISEÑO DE TU CAPTURA ---
const baseDeDatosRopa = [
    // 👀 CATEGORÍA: OJOS / ROSTRO
    { nombre: "Ojos de Compartir (Estilo Anime)", id: "201001", icon_id: "Icon_avatar_eyes_anime_red", categoria: "ojos", descripcion: "Ojos rojos luminosos." },
    { nombre: "Pintura de Guerra Calavera", id: "201002", icon_id: "Icon_avatar_face_calavera", categoria: "ojos", descripcion: "Pintura facial de esqueleto." },
    { nombre: "Ojos de Demonio Neón", id: "201003", icon_id: "Icon_avatar_eyes_demon_cyan", categoria: "ojos", descripcion: "Efecto de ojos cian brillantes." },

    // 🎭 CATEGORÍA: MÁSCARAS
    { nombre: "Máscara Sakura (Pase Élite S1)", id: "211000016", icon_id: "Icon_avatar_face_sakura_s1", categoria: "mascara", descripcion: "El icónico rostro Kabuki tradicional." },
    { nombre: "Máscara Criminal", id: "211000004", icon_id: "Icon_avatar_face_criminal_clown", categoria: "mascara", descripcion: "Máscara de payaso clásica." },

    // 👕 CATEGORÍA: CHAQUETAS (TORSO)
    { nombre: "Chaqueta Sakura (Pase Élite S1)", id: "203000156", icon_id: "Icon_avatar_male_top_sakura", categoria: "chaqueta", descripcion: "Chaqueta oficial con emblema en la espalda." },
    { nombre: "Chaqueta Roja Especial", id: "203000055", icon_id: "Icon_avatar_male_top_red_sport", categoria: "chaqueta", descripcion: "Chaqueta deportiva color rojo brillante." },

    // 👖 CATEGORÍA: PANTALONES (PIERNAS)
    { 
        nombre: "Bushido Bottom", 
        id: "204000092", 
        icon_id: "Icon_avatar_male_bottom_cos_japanesestyle_purple", 
        categoria: "pantalones", 
        imagen: "bushido_bottom.png", // Nombre de la imagen real
        descripcion: "No Description" 
    },
    { nombre: "Pantalones Heroico S2", id: "203000105", icon_id: "Icon_avatar_male_bottom_heroic_s2", categoria: "pantalones", descripcion: "Pantalones exclusivos rango Heroico." },

    // 🦖 CATEGORÍA: DINOS
    { nombre: "Dino 2D (Traje Plano)", id: "203033050", icon_id: "Icon_avatar_full_dino_2d", categoria: "dino", descripcion: "Skin exclusiva con aspecto plano caricaturesco." },

    // 🤛 CATEGORÍA: PUÑOS
    { nombre: "Puño Cobra", id: "907300004", icon_id: "Icon_weapon_fist_cobra", categoria: "puños", descripcion: "Efecto Cobra Rubí con destellos rojos." },
    { nombre: "Puño Evolutivo", id: "907193705", icon_id: "Icon_weapon_fist_evo", categoria: "puños", descripcion: "Efecto con partículas de energía avanzada." },
    { nombre: "Puño Booyah", id: "907103031", icon_id: "Icon_weapon_fist_booyah", categoria: "puños", descripcion: "Efectos dorados neón conmemorativos." }
];

let categoriaActual = "todos";
let itemAbiertoActualmente = null;
const contenedor = document.getElementById("listaRopa");

function mostrarCatalogo(lista) {
    contenedor.innerHTML = "";
    if(lista.length === 0) {
        contenedor.innerHTML = "<p style='color:#666; font-size: 16px; margin-top: 30px;'>No se encontró nada.</p>";
        return;
    }

    lista.forEach(item => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.onclick = function(e) {
            if(!e.target.classList.contains('id-texto')) { abrirModal(item); }
        };
        
        tarjeta.innerHTML = `
            <div class="img-wrapper">
                <img src="img/${item.imagen || 'placeholder.png'}" alt="${item.nombre}" onerror="this.src='https://via.placeholder.com/110/ff7b00/ffffff?text=FF+Skin'">
            </div>
            <h3>${item.nombre}</h3>
            <div class="id-texto" onclick="copiarID('${item.id}')">ID: ${item.id}</div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

function copiarID(idNum) {
    navigator.clipboard.writeText(idNum).then(() => {
        const toast = document.getElementById("toastNotification");
        toast.className = "toast show";
        setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
    });
}

// --- LOGICA DEL PANEL VISOR DE TU FOTO ---
function abrirModal(item) {
    const modal = document.getElementById("infoModal");

    if (itemAbiertoActualmente === item.id && modal.classList.contains("visible")) {
        cerrarModal();
        return;
    }

    itemAbiertoActualmente = item.id;

    // Colocar la información real de tu captura en las filas del modal
    document.getElementById("modalNombre").innerText = item.nombre;
    document.getElementById("modalId").innerText = item.id;
    document.getElementById("modalIconId").innerText = item.icon_id;
    document.getElementById("modalDesc").innerText = item.descripcion;
    
    // Configurar la imagen verdadera
    const imgElement = document.getElementById("modalImagen");
    imgElement.src = `img/${item.imagen || 'placeholder.png'}`;
    imgElement.onerror = function() { this.src = 'https://via.placeholder.com/150/ff7b00/ffffff?text=FF+Skin'; };
    
    // Configurar el botón de copiar interno
    document.getElementById("btnCopiarModal").onclick = function() { copiarID(item.id); };

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
    }, 250);
}

window.onclick = function(event) {
    const modal = document.getElementById("infoModal");
    if (event.target == modal) { cerrarModal(); }
}

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
mostrarCatalogo(baseDeDatosRopa);
