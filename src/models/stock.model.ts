import mongoose, { Document, Schema } from "mongoose";

export interface IStock extends Document {
  _id: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  quantity: number;
}

const stockSchema: Schema<IStock> = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative."],
      validate: {
        validator: (quantity: number) => quantity >= 0,
        message: "Quantity must be a positive number or zero.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model<IStock>("Stock", stockSchema);
export default Stock;
