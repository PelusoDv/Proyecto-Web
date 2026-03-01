import mongoose, { Schema, Document } from "mongoose";

export interface IProducto extends Document {
    name: string;
    imageUrl: string;
    hoverImageUrl: string;
    linkUrl: string;
}

const ProductoSchema = new Schema<IProducto>({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    hoverImageUrl: { type: String, required: true },
    linkUrl: { type: String, required: true }
});

export const Producto = mongoose.model<IProducto>("Producto", ProductoSchema);