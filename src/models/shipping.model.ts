import mongoose, { Document, Schema } from "mongoose";

export interface IShipping extends Document {
    _id: mongoose.Types.ObjectId;
    method: string; 
    cost: number;
    estimatedDelivery: string;
}

const shippingSchema: Schema<IShipping> = new Schema(
    {
        method: {
            type: String,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        },
        estimatedDelivery: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Shipping = mongoose.model<IShipping>("Shipping", shippingSchema);
export default Shipping;
