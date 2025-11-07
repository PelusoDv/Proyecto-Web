import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.post("/guardar", (req, res) => {
    const nuevoDato = req.body;

    const filePath = path.join(publicPath, "datos.json");

    // Si el archivo no existe, crearlo vacío
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]", "utf8");
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    data.push(nuevoDato);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

    res.send("Dato guardado correctamente ✅");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "TiendaCafe.html"));
});

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));