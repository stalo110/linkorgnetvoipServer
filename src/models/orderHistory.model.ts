import mongoose, { Document, Schema } from "mongoose";

export interface IOrderHistory extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    orderId: mongoose.Types.ObjectId;
    status: string; 
    createdAt: Date; 
    updatedAt: Date;
}

const orderHistorySchema: Schema<IOrderHistory> = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User", 
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Order", 
        },
        status: {
            type: String,
            required: true,
            enum: ["Completed", "Cancelled", "Refunded"],
            default: "Completed",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const OrderHistory = mongoose.model<IOrderHistory>("OrderHistory", orderHistorySchema);
export default OrderHistory;
