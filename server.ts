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

// Ruta POST para login de usuarios
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const usuario = await Usuario.findOne({
            $or: [
                { name: username },
                { email: username }
            ]
        });

        if (!usuario) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }
        if (usuario.password !== password) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // IMPORTANTE: no recuperar password en la respuesta, solo los datos necesarios para la sesión
        const usuarioSeguro = {
            id: usuario._id,
            name: usuario.name,
            email: usuario.email
        };

        res.json(usuarioSeguro);

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

// Servir HTML principal
app.get("/", async (req, res) => {
    res.sendFile(path.join(publicPath, "TiendaCafe.html"));
});

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));