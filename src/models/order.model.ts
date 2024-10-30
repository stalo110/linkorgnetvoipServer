import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    cart: mongoose.Types.ObjectId;
    payment: mongoose.Types.ObjectId;
    status: "pending" | "shipped" | "delivered" | "cancelled";
    deliveryAddress: mongoose.Types.ObjectId; 
    deliveryDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  const orderSchema: Schema<IOrder> = new Schema(
    {
      user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
      },
      cart: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Cart",
      },
      payment: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Payment",
      },
      status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending",
      },
      deliveryAddress: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "DeliveryAddress",
      },
      deliveryDate: {
        type: Date,
        default: null,
      },
    },
    { timestamps: true }
  );
  

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
