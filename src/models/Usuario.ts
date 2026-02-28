import mongoose, { Schema, Document } from "mongoose";

export interface IUsuario extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
}

const UsuarioSchema = new Schema<IUsuario>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "user"] }
});

export const Usuario = mongoose.model<IUsuario>("Usuario", UsuarioSchema);