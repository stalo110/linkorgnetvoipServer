import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem extends Document {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalPrice: number;
  status: "active" | "ordered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema: Schema<ICartItem> = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId, // Corrected to use Schema.Types.ObjectId
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema: Schema<ICart> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Corrected to use Schema.Types.ObjectId
      required: true,
      ref: "User",
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "ordered", "cancelled"],
      default: "active",
    },
  },
  { timestamps: true }
);


cartSchema.methods.calculateTotalPrice = function (): void {
  this.totalPrice = this.items.reduce(
    (total: number, item: ICartItem) => total + item.price * item.quantity,
    0
  );
};

const Cart = mongoose.model<ICart>("Cart", cartSchema);
export default Cart;
