interface Producto {
    name: string;
    imageUrl: string;
    hoverImageUrl: string;
    linkUrl: string;
}

const productForm = document.getElementById("productForm") as HTMLFormElement;

productForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const id = localStorage.getItem("productoEditando") || ""; // Para edición, si es vacío es nuevo producto
    const producto: Producto = {
        name: (document.getElementById("productName") as HTMLInputElement).value,
        imageUrl: (document.getElementById("productImageUrl") as HTMLInputElement).value,
        hoverImageUrl: (document.getElementById("productHoverImageUrl") as HTMLInputElement).value,
        linkUrl: (document.getElementById("productLinkUrl") as HTMLInputElement).value,
    };

    if (producto.name && producto.imageUrl && producto.hoverImageUrl && producto.linkUrl) {
        try {
            let response;
            if (id) {
                // ✏️ EDITAR PRODUCTO
                response = await fetch(`/editar-producto/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(producto)
                });
            } else {
                // ➕ CREAR PRODUCTO
                response = await fetch("/add-producto", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(producto)
                });
            }
            if (!response.ok) {
                throw new Error("Error al guardar el producto");
            }

            const data = await response.text();
            alert(data);

            // Limpiar estado de edición
            localStorage.removeItem("productoEditando");

            // Opcional: volver a cargar productos
            location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }
});