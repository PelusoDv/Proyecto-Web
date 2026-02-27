import mongoose, { Schema, Document } from "mongoose";

export interface IUsuario extends Document {
    name: string;
    email: string;
    password: string;
}

const UsuarioSchema = new Schema<IUsuario>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

export const Usuario = mongoose.model<IUsuario>("Usuario", UsuarioSchema);