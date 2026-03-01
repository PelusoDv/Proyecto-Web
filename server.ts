import express from "express";
import cors from "cors";
import path from "path";
import { conectarDB } from "./src/database";
import { Contacto } from "./src/models/Contacto";
import { Usuario } from "./src/models/Usuario";
import { Producto } from "./src/models/Producto";

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
            email: usuario.email,
            role: usuario.role
        };

        res.json(usuarioSeguro);

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

app.get("/productos", async (req, res) => {
    try {
        // Buscar todos los productos en la base de datos
        const producto = await Producto.find();
        // Enviar los productos como respuesta JSON
        res.json(producto);
    } catch (error) {
        console.error("❌ Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

app.get("/producto/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }  
        res.json(producto);
    } catch (error) {
        console.error("❌ Error al obtener producto:", error);
        res.status(500).json({ error: "Error al obtener producto" });
    }
});

app.post("/add-producto", async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.send("Producto guardado correctamente en MongoDB ✅");
    } catch (error) {
        console.error("Error al guardar producto:", error);
        res.status(500).send("Error al guardar el producto ❌");
    }
});

app.delete("/eliminar-producto/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Producto.findByIdAndDelete(id);
        res.send("Producto eliminado correctamente de MongoDB ✅");
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).send("Error al eliminar el producto ❌");
    }  
});

app.put("/editar-producto/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!productoActualizado) {
            return res.status(404).send("Producto no encontrado ❌");
        }
        res.send("Producto editado correctamente en MongoDB ✅");
    } catch (error) {
        console.error("Error al editar producto:", error);
        res.status(500).send("Error al editar el producto ❌");
    }
});

// Servir HTML principal
app.get("/", async (req, res) => {
    res.sendFile(path.join(publicPath, "TiendaCafe.html"));
});

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));