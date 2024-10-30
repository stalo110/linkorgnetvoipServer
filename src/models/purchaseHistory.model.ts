import mongoose, { Document, Schema } from "mongoose";

export interface IPurchaseHistory extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId; 
    orderId: mongoose.Types.ObjectId; 
    quantity: number; 
    purchaseDate: Date; 
    totalAmount: number; 
}

const purchaseHistorySchema: Schema<IPurchaseHistory> = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User", 
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product", 
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Order", 
        },
        quantity: {
            type: Number,
            required: true,
            validate: {
                validator: (quantity: number) => quantity > 0,
                message: "Quantity must be a positive number.",
            },
        },
        purchaseDate: {
            type: Date,
            default: Date.now,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const PurchaseHistory = mongoose.model<IPurchaseHistory>("PurchaseHistory", purchaseHistorySchema);
export default PurchaseHistory;
