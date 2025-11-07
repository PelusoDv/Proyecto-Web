import mongoose, { Schema, Document } from "mongoose";

export interface IContacto extends Document {
    name: string;
    email: string;
}

const ContactoSchema = new Schema<IContacto>({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

export const Contacto = mongoose.model<IContacto>("Contacto", ContactoSchema);