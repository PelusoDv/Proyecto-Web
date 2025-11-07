import mongoose from "mongoose";

const dbName = "tienda_cafe";

export const conectarDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
            // opciones de conexión recomendadas
        });
        console.log("✅ Conectado a MongoDB correctamente");
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
        process.exit(1); // Detiene el servidor si la conexión falla
    }
};