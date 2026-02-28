import mongoose from "mongoose";
import { Usuario } from "./models/Usuario";

const dbName = "tienda_cafe";

export const conectarDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
            // opciones de conexión recomendadas
        });
        await crearUsuariosPorDefecto();
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
                name: "Nico",
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