import mongoose from "mongoose";
import { Usuario } from "./models/Usuario";
import { Producto } from "./models/Producto";

const dbName = "tienda_cafe";

export const conectarDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
            // opciones de conexión recomendadas
        });
        await crearUsuariosPorDefecto();
        await crearProductoPorDefecto();
        console.log("✅ Conectado a MongoDB correctamente");
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
        process.exit(1); // Detiene el servidor si la conexión falla
    }
};

async function crearUsuariosPorDefecto() {
    try {
        await Usuario.deleteMany({}); // Eliminar usuarios existentes para evitar duplicados
        await Usuario.insertMany([
            {
                name: "admin",
                email: "admin@admin.com",
                password: "admin123",
                role: "admin"
            },
            {
                name: "NicoDK",
                email: "nico@usuario.com",
                password: "usuario123",
                role: "user"
            }
        ]);
        console.log("🟢 Usuarios creados por defecto");

    } catch (error) {
        console.error("❌ Error al crear usuarios por defecto:", error);
    }
}

async function crearProductoPorDefecto() {
    try {
        if (await Producto.countDocuments() === 0) {
            await Producto.insertMany([
                {
                    name: "Café Scegliere",
                    imageUrl: "https://tiendadecafe.com.ar/wp-content/uploads/2021/03/Productos_cafe_packs_SCEGLIERE_frente.jpg",
                    hoverImageUrl: "https://tiendadecafe.com.ar/wp-content/uploads/2021/03/Productos_cafe_packs_SCEGLIERE2_frente_prueba.jpg",
                    linkUrl: "https://tiendadecafe.com.ar/producto/cafe-en-grano-molido-scegliere/"
                },
                {
                    name: "Café Barista",
                    imageUrl: "https://tiendadecafe.com.ar/wp-content/uploads/2021/03/Productos_cafe_packs_BARISTA_frente.jpg",
                    hoverImageUrl: "https://tiendadecafe.com.ar/wp-content/uploads/2021/03/Productos_cafe_packs_BARISTA_frente_prueba.jpg",
                    linkUrl: "https://tiendadecafe.com.ar/producto/cafe-en-grano-molido-barista/"
                },
                {
                    name: "Café Minka",
                    imageUrl: "https://tiendadecafe.com.ar/wp-content/uploads/2021/03/Productos_cafe_packs_MINKA_frente.jpg",
                    hoverImageUrl: "https://tiendadecafe.com.ar/wp-content/uploads/2021/03/Productos_cafe_packs_minka_frente_prueba-768x768.jpg",
                    linkUrl: "https://tiendadecafe.com.ar/producto/cafe-en-grano-molido-minka/"
                },
                {
                    name: "Café Colombia",
                    imageUrl: "https://tiendadecafe.com.ar/wp-content/uploads/2021/03/Productos_cafe_packs_COLOMBIA_frente.jpg",
                    hoverImageUrl: "https://tiendadecafe.com.ar/wp-content/uploads/2021/03/Productos_cafe_packs_COLOMBIA_frente_prueba-768x768.jpg",
                    linkUrl: "https://tiendadecafe.com.ar/producto/cafe-en-grano-molido-colombia/"
                },
                {
                    name: "Café Brasil",
                    imageUrl: "https://tiendadecafe.com.ar/wp-content/uploads/2021/03/Productos_cafe_packs_BRASIL_frente.jpg",
                    hoverImageUrl: "https://tiendadecafe.com.ar/wp-content/uploads/2021/03/Productos_cafe_packs_BRASIL_frente_prueba-768x768.jpg",
                    linkUrl: "https://tiendadecafe.com.ar/producto/cafe-en-grano-molido-brasil/"
                },
                {
                    name: "Café Descafeinado",
                    imageUrl: "https://tiendadecafe.com.ar/wp-content/uploads/2021/03/Productos_cafe_packs_descaf_frente.jpg",
                    hoverImageUrl: "https://tiendadecafe.com.ar/wp-content/uploads/2021/03/Productos_cafe_packs_DESCAFEINADO_frente_prueba-768x768.jpg",
                    linkUrl: "https://tiendadecafe.com.ar/producto/cafe-en-grano-molido-descafeinado/"
                }
            ]);
            console.log("🟢 Productos creados por defecto");
        }
    } catch (error) {
        console.error("❌ Error al crear productos:", error);
    }
}