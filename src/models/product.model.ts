import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    title: string;
    desc: string;
    price: number;
    brand: string;
    img: string;
    createdAt: Date; 
    updatedAt: Date; 
}

const productSchema: Schema<IProduct> = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            validate: {
                validator: (price: number) => price > 0,
                message: "Price must be a positive number.",
            },
        },
        brand: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, 
    }
);

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
