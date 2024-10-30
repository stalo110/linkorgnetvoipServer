import mongoose, { Document, Schema } from "mongoose";

export interface IDeliveryStatus extends Document {
    _id: mongoose.Types.ObjectId;
    orderId: mongoose.Types.ObjectId; 
    status: string
    updatedAt: Date;
}

const deliveryStatusSchema: Schema<IDeliveryStatus> = new Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Order", 
        },
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Shipped", "In Transit", "Delivered", "Cancelled"],
            default: "Pending",
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

const DeliveryStatus = mongoose.model<IDeliveryStatus>("DeliveryStatus", deliveryStatusSchema);
export default DeliveryStatus;
