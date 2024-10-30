import mongoose, { Document, Schema } from "mongoose";

export interface IPaymentStatus extends Document {
    _id: mongoose.Types.ObjectId;
    orderId: mongoose.Types.ObjectId; 
    status: string; 
    paymentMethod: string; 
    amount: number; 
    transactionId: string; 
    createdAt: Date; 
}

const paymentStatusSchema: Schema<IPaymentStatus> = new Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Order", 
        },
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Completed", "Failed", "Refunded"],
            default: "Pending",
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
            unique: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const PaymentStatus = mongoose.model<IPaymentStatus>("PaymentStatus", paymentStatusSchema);
export default PaymentStatus;
