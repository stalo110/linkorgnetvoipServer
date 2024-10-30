import mongoose, { Document, Schema } from "mongoose";

export interface IDeliveryAddress extends Document {
  user: mongoose.Types.ObjectId; 
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean; 
}

const deliveryAddressSchema: Schema<IDeliveryAddress> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const DeliveryAddress = mongoose.model<IDeliveryAddress>("DeliveryAddress", deliveryAddressSchema);
export default DeliveryAddress;
