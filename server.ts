import express from "express";
import cors from "cors";
import path from "path";
import { conectarDB } from "./src/database";
import { Contacto } from "./src/models/Contacto";

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

// Servir HTML principal
app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "TiendaCafe.html"));
});

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));