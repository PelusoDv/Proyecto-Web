import express from "express";
import cors from "cors";
import path from "path";
import { conectarDB } from "./src/database";
import { Contacto } from "./src/models/Contacto";
import { Usuario } from "./src/models/Usuario";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
conectarDB();

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

// Ruta POST para guardar contacto
app.post("/guardar", async (req, res) => {
    try {
        const nuevoContacto = new Contacto(req.body);
        await nuevoContacto.save();
        res.send("Dato guardado correctamente en MongoDB ✅");
    } catch (error) {
        console.error("Error al guardar en MongoDB:", error);
        res.status(500).send("Error al guardar el dato ❌");
    }
});

// Ruta GET para el usuario principal
app.get("/usuarios", async (req, res) => {
    try {
        // Buscar todos los usuarios
        const usuarios = await Usuario.find();

        // Si no hay ninguno, crear uno por defecto
        if (usuarios.length === 0) {
            const nuevoUsuario = new Usuario({
                name: "NicoDK",
                email: "admin@admin.com",
                password: "admin123"
            });

            await nuevoUsuario.save();

            console.log("🟢 Nuevo usuarios creado por defecto");

            return res.json([nuevoUsuario]); // enviamos lista con el único usuario creado
        }

        // Si había usuarios, enviarlos
        res.json(usuarios);

    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

// Servir HTML principal
app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "TiendaCafe.html"));
});

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));